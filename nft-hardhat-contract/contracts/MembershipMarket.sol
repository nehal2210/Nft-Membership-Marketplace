// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;


import "./NFT.sol";
import "./INFT.sol";
import "./library/PriceConverter.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {Functions, FunctionsClient} from "./dev/functions/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract MembershipMarket is  FunctionsClient, ConfirmedOwner  {
    using Functions for Functions.Request;


    bytes32 public latestRequestId;
    string public latestResponse;
    bytes public latestError;
    uint256 private precentageEarnedPerNFTSelling = 10;

    

    // IERC20 immutable USDC;
    AggregatorV3Interface immutable priceFeed;


    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        address payable companyProvider;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    //the event emitted when a token is successfully listed
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed
    );
    
    enum nftCategory{ Food, Transport, Sport }


    event NFTCreadted(string indexed name, string  symbol, address indexed nft , address indexed provider , uint256 _supplyLimit, uint256 priceOfNft, bool _isTransferable, bool _isExpireable, uint256 expiration, nftCategory _category);
    
    event NftPurchasedWithNative(address indexed to, address indexed nft, string  tokenUri);

    event SaleExcecuted(address indexed nft,address indexed to, uint256 indexed tokenId);

    event NftListedForSale(address indexed nft, address indexed seller, uint256 indexed tokenId,uint256 _price,bool reSale);    

    event NftUsed(address _nft, uint256 tokenID);

    event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);


    mapping(address  => mapping(uint256 => ListedToken)) private nftToTokenIdToListedTokenInfo;
    // right now we are supposing provider can only create NFt once, because if he create seconnd time the fist one address will replace
    mapping(address=>NFT) private ProviderToNft;
    mapping(address=>address) private NftToProvider;
    mapping(address=>uint) private NftToPrice;
    mapping(address=>bool) private ProviderToIsWhitelist;
    mapping(bytes32=>address) private responseIdToNftAddress;
    mapping(bytes32=>uint256) private responseIdToTokenId;

    mapping(address=>uint256)  private nftToExpiration;
    mapping(address=>nftCategory) private nftToCategory;
    mapping(nftCategory=>string) private categoryToFunctionScript;




    modifier isWhiteListed(){
        require(ProviderToIsWhitelist[msg.sender],"not in White list");
        _;
    }


    // constructor(IERC20 _usdc, AggregatorV3Interface _priceFeed){
    constructor( AggregatorV3Interface _priceFeed, address oracle)  FunctionsClient(oracle) ConfirmedOwner(msg.sender){
 
      
        priceFeed = _priceFeed;

    }


    
    function createNFT(string memory name, string memory symbol,uint256 _supplyLimit,uint256 priceOfNft,bool _isTransferable,bool _isExpireable, uint256 expiration, nftCategory _category) public returns(address){

            NFT nft =  new NFT(name,symbol,_supplyLimit,_isTransferable,_isExpireable);

            ProviderToNft[msg.sender] = nft;
            NftToProvider[address(nft)] = msg.sender; 
            NftToPrice[address(nft)] = priceOfNft;


            nftToExpiration[address(nft)] = expiration; // if not expire put 0
            nftToCategory[address(nft)] = _category;

            emit NFTCreadted( name,   symbol,  address(nft) , msg.sender,  _supplyLimit,  priceOfNft,  _isTransferable,  _isExpireable, expiration, _category);
           return  address(nft);

    }


    function getNftPrice(address _nft) external view returns(uint256) {
      return NftToPrice[_nft];
    }


    function getNft(address _provider) internal view returns(NFT){
        return  ProviderToNft[_provider];

    }



    function getNftAddress(address _provider) external view returns(address){
        return  address(ProviderToNft[_provider]);
    }


  function getBalance() external view returns(uint256){
  return address(this).balance;
}


  function buyNftWithNative(address to, address _nft, string memory tokenUri) external payable {

        
        // uint priceInUsd = PriceConverter.getConversionRate(msg.value, priceFeed);
        require(msg.value >= NftToPrice[_nft] && msg.value > 0 ,"amount not correct"); // found vulnerability if we not put amount > 0

        uint revenue = msg.value * precentageEarnedPerNFTSelling / 100;

        
        (bool sent,bytes memory data) = NftToProvider[_nft].call{value:msg.value - revenue}("");
        require(sent,"Tx Failed");
        

        NFT nft = ProviderToNft[NftToProvider[_nft]];
        nft.safeMint(to, block.timestamp + nftToExpiration[_nft],  tokenUri);

        emit NftPurchasedWithNative(to,  _nft, tokenUri);

    }

    // function buyNftWithUsd(address to,address _nft,uint256 amount) external {s
    //     // right now I am sending whole amount of purchase to user

    //     require(amount >= NftToPrice[_nft] && amount > 0 ,"amount not correct" ); // found vulnerability if we not put amount > 0
        
    //     uint revenue = amount * 10 / 100;
        
    //     require(USDC.transferFrom(msg.sender,address(this), revenue), "tx failed");

    //     require(USDC.transferFrom(msg.sender,NftToProvider[_nft], amount - revenue), "tx failed");
        
    //     NFT nft = ProviderToNft[NftToProvider[_nft]];
    //     nft.safeMint(to,nftToExpiration[_nft]);


    // }

    function WhiteListProvider(address _provider) external onlyOwner {
        ProviderToIsWhitelist[_provider] = true;
    }


    function excecuteSale(address _nft,address to, uint256 tokenId) external payable {

    uint priceInUsd = PriceConverter.getConversionRate(msg.value, priceFeed);
    ListedToken memory tokenInfo = nftToTokenIdToListedTokenInfo[_nft][tokenId];
    require(tokenInfo.currentlyListed,"token not listed");
    require( priceInUsd >= tokenInfo.price, "low price");

    uint256 revenue = msg.value * 10 / 100;
    (bool sentToSeller,bytes memory data) = tokenInfo.seller.call{value:msg.value - revenue}("");
    (bool sentToProvider,bytes memory _data) = tokenInfo.companyProvider.call{value:revenue/2}("");

    require(sentToProvider && sentToSeller,"Tx Failed");

    nftToTokenIdToListedTokenInfo[_nft][tokenId].seller = payable(to);
    nftToTokenIdToListedTokenInfo[_nft][tokenId].price = priceInUsd;

    nftToTokenIdToListedTokenInfo[_nft][tokenId].currentlyListed = false;
    ProviderToNft[NftToProvider[_nft]].transferFrom(msg.sender,to, tokenId);

    emit SaleExcecuted(_nft, to, tokenId);

    }

    // user apna Nft list krne jaa rha he
    function SaleNft(address _nft, address seller, uint256 tokenId,uint256 _price,bool reSale) external  {

        require(ProviderToNft[NftToProvider[_nft]].ownerOf(tokenId) == seller,"you are not an owner");
        uint priceInUsd = PriceConverter.getConversionRate(_price, priceFeed);
        nftToTokenIdToListedTokenInfo[_nft][tokenId] = ListedToken(tokenId,payable(NftToProvider[_nft]),payable(seller),_price,reSale);
        ProviderToNft[NftToProvider[_nft]].approve(address(this), tokenId);

        emit NftListedForSale( _nft, seller, tokenId, _price, reSale);
    }



    function getMatictoUSD(uint256 matic) public  view returns(uint256){
        uint256 priceInUsd = PriceConverter.getConversionRate(matic, priceFeed);
        return priceInUsd;
    }
    

    function useNft(string calldata source, bytes calldata secrets,
     string[] calldata args, uint64 subscriptionId, uint32 gasLimit, address _nft, uint256 tokenID) external {

    require(IERC721(_nft).ownerOf(tokenID) == msg.sender);

        // send token URI
        // from token URI we get json
        // we change things in json -> parameter
        // we pin the new json on pinata
        // we send back the URI to Smart contract
        // set the token URI with Token Identifier
 
   bytes32 reqId =  executeRequest(
     source,
     secrets,
     args,
     subscriptionId,
     gasLimit);
       
    responseIdToNftAddress[reqId] = _nft;
    responseIdToTokenId[reqId] = tokenID;
    emit NftUsed(_nft, tokenID);

    
    }



// function getNFTScript(address _nft ) external returns(string memory) {
//     return categoryToFunctionScript[nftToCategory[_nft]];
// }

function getNFTCategory(address _nft) external returns(nftCategory) {
    return nftToCategory[_nft];
}

function  getPercentagePerNFTPrice() external view returns(uint256){

   return precentageEarnedPerNFTSelling;
}

// function setCategoryFunctionScripts(string memory _cid,nftCategory _category) external {

//     categoryToFunctionScript[_category] = _cid;

// } 


 /**
   * @notice Send a simple request
   *
   * @param source JavaScript source code
   * @param secrets Encrypted secrets payload
   * @param args List of arguments accessible from within the source code
   * @param subscriptionId Funtions billing subscription ID
   * @param gasLimit Maximum amount of gas used to call the client contract's `handleOracleFulfillment` function
   * @return Functions request ID
   */
  function executeRequest(
    string calldata source,
    bytes calldata secrets,
    string[] calldata args,
    uint64 subscriptionId,
    uint32 gasLimit
  ) internal  returns (bytes32) {
    Functions.Request memory req;
    
    req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, source);
    if (secrets.length > 0) {
      req.addRemoteSecrets(secrets);
    }
    if (args.length > 0) req.addArgs(args);

    bytes32 assignedReqID = sendRequest(req, subscriptionId, gasLimit);
    latestRequestId = assignedReqID;

    return assignedReqID;
  }

  /**
   * @notice Callback that is invoked once the DON has resolved the request or hit an error
   *
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    
    latestResponse = string(response);
    latestError = err;
    

    // set tokenURI of specific nft to specific tokenId
    ProviderToNft[NftToProvider[responseIdToNftAddress[requestId]]].setTokenURI(responseIdToTokenId[requestId], latestResponse);
    emit OCRResponse(requestId, response, err);
  }

  /**
   * @notice Allows the Functions oracle address to be updated
   *
   * @param oracle New oracle address
   */
  function updateOracleAddress(address oracle) public onlyOwner {
    setOracle(oracle);
  }

  function addSimulatedRequestId(address oracleAddress, bytes32 requestId) public onlyOwner {
    addExternalRequest(oracleAddress, requestId);
  }

function  setPercentagePerNFTPrice(uint256 percentage) external onlyOwner(){

   precentageEarnedPerNFTSelling  = percentage;
}





}



