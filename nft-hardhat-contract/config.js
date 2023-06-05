const oracleAddress = "0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4";
const MembershipMarketAddress = "0x4a4FAAaD2b57B26C2c42b734522BFfafd919cbe6"
const  AggregatorV3Address = "0x877C5D8841A0AB14fd4034fCd5f664e86Ec49e26";
// const NftAddress = "0xBf225a5F0F63C0f5E1b043f8bE7ec5014c62EFdc"
const SubscriptionId =  "1580"
const OracleContractAbi =  [
    {
      "inputs": [],
      "name": "AlreadySet",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CannotSelfTransfer",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptyBillingRegistry",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptyPublicKey",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptyRequestData",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptySendersList",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InconsistentReportData",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotAllowedToSetSenders",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotProposedOwner",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OnlyCallableByOwner",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OwnerMustBeSet",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReportInvalid",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UnauthorizedPublicKeyChange",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UnauthorizedSender",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "AuthorizedSendersActive",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "senders",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "changedBy",
          "type": "address"
        }
      ],
      "name": "AuthorizedSendersChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "AuthorizedSendersDeactive",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "previousConfigBlockNumber",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "configDigest",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "configCount",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "signers",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "transmitters",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "f",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "onchainConfig",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "offchainConfigVersion",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "offchainConfig",
          "type": "bytes"
        }
      ],
      "name": "ConfigSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "version",
          "type": "uint8"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        }
      ],
      "name": "InvalidRequestID",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "requestingContract",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "requestInitiator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "subscriptionId",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "subscriptionOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "OracleRequest",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        }
      ],
      "name": "OracleResponse",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "configDigest",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "epoch",
          "type": "uint32"
        }
      ],
      "name": "Transmitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "reason",
          "type": "string"
        }
      ],
      "name": "UserCallbackError",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "lowLevelData",
          "type": "bytes"
        }
      ],
      "name": "UserCallbackRawError",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "activateAuthorizedReceiver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "senders",
          "type": "address[]"
        }
      ],
      "name": "addAuthorizedSenders",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "authorizedReceiverActive",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deactivateAuthorizedReceiver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "node",
          "type": "address"
        }
      ],
      "name": "deleteNodePublicKey",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "subscriptionId",
          "type": "uint64"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        },
        {
          "internalType": "uint32",
          "name": "gasLimit",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "gasPrice",
          "type": "uint256"
        }
      ],
      "name": "estimateCost",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllNodePublicKeys",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        },
        {
          "internalType": "bytes[]",
          "name": "",
          "type": "bytes[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAuthorizedSenders",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDONPublicKey",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRegistry",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        },
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "subscriptionId",
              "type": "uint64"
            },
            {
              "internalType": "address",
              "name": "client",
              "type": "address"
            },
            {
              "internalType": "uint32",
              "name": "gasLimit",
              "type": "uint32"
            },
            {
              "internalType": "uint256",
              "name": "gasPrice",
              "type": "uint256"
            }
          ],
          "internalType": "struct FunctionsBillingRegistryInterface.RequestBilling",
          "name": "",
          "type": "tuple"
        }
      ],
      "name": "getRequiredFee",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "isAuthorizedSender",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "latestConfigDetails",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "configCount",
          "type": "uint32"
        },
        {
          "internalType": "uint32",
          "name": "blockNumber",
          "type": "uint32"
        },
        {
          "internalType": "bytes32",
          "name": "configDigest",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "latestConfigDigestAndEpoch",
      "outputs": [
        {
          "internalType": "bool",
          "name": "scanLogs",
          "type": "bool"
        },
        {
          "internalType": "bytes32",
          "name": "configDigest",
          "type": "bytes32"
        },
        {
          "internalType": "uint32",
          "name": "epoch",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "senders",
          "type": "address[]"
        }
      ],
      "name": "removeAuthorizedSenders",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "subscriptionId",
          "type": "uint64"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        },
        {
          "internalType": "uint32",
          "name": "gasLimit",
          "type": "uint32"
        }
      ],
      "name": "sendRequest",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_signers",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "_transmitters",
          "type": "address[]"
        },
        {
          "internalType": "uint8",
          "name": "_f",
          "type": "uint8"
        },
        {
          "internalType": "bytes",
          "name": "_onchainConfig",
          "type": "bytes"
        },
        {
          "internalType": "uint64",
          "name": "_offchainConfigVersion",
          "type": "uint64"
        },
        {
          "internalType": "bytes",
          "name": "_offchainConfig",
          "type": "bytes"
        }
      ],
      "name": "setConfig",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "donPublicKey",
          "type": "bytes"
        }
      ],
      "name": "setDONPublicKey",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "node",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "publicKey",
          "type": "bytes"
        }
      ],
      "name": "setNodePublicKey",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "registryAddress",
          "type": "address"
        }
      ],
      "name": "setRegistry",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[3]",
          "name": "reportContext",
          "type": "bytes32[3]"
        },
        {
          "internalType": "bytes",
          "name": "report",
          "type": "bytes"
        },
        {
          "internalType": "bytes32[]",
          "name": "rs",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "ss",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32",
          "name": "rawVs",
          "type": "bytes32"
        }
      ],
      "name": "transmit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "transmitters",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "typeAndVersion",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ]
const  MembershipContractAbi = [
    {
      "inputs": [
        {
          "internalType": "contract AggregatorV3Interface",
          "name": "_priceFeed",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "oracle",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "EmptyArgs",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptySecrets",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptySource",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NoInlineSecrets",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "RequestIsAlreadyPending",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "RequestIsNotPending",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "SenderIsNotRegistry",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "result",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "err",
          "type": "bytes"
        }
      ],
      "name": "OCRResponse",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        }
      ],
      "name": "RequestFulfilled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        }
      ],
      "name": "RequestSent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "currentlyListed",
          "type": "bool"
        }
      ],
      "name": "TokenListedSuccess",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nft",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "reSale",
          "type": "bool"
        }
      ],
      "name": "SaleNft",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        }
      ],
      "name": "WhiteListProvider",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "oracleAddress",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        }
      ],
      "name": "addSimulatedRequestId",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_nft",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "tokenUri",
          "type": "string"
        }
      ],
      "name": "buyNftWithNative",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_supplyLimit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "priceOfNft",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_isTransferable",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "_isExpireable",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "expiration",
          "type": "uint256"
        },
        {
          "internalType": "enum MembershipMarket.nftCategory",
          "name": "_category",
          "type": "uint8"
        }
      ],
      "name": "createNFT",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "enum Functions.Location",
              "name": "codeLocation",
              "type": "uint8"
            },
            {
              "internalType": "enum Functions.Location",
              "name": "secretsLocation",
              "type": "uint8"
            },
            {
              "internalType": "enum Functions.CodeLanguage",
              "name": "language",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "source",
              "type": "string"
            },
            {
              "internalType": "bytes",
              "name": "secrets",
              "type": "bytes"
            },
            {
              "internalType": "string[]",
              "name": "args",
              "type": "string[]"
            }
          ],
          "internalType": "struct Functions.Request",
          "name": "req",
          "type": "tuple"
        },
        {
          "internalType": "uint64",
          "name": "subscriptionId",
          "type": "uint64"
        },
        {
          "internalType": "uint32",
          "name": "gasLimit",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "gasPrice",
          "type": "uint256"
        }
      ],
      "name": "estimateCost",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nft",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "excecuteSale",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDONPublicKey",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "matic",
          "type": "uint256"
        }
      ],
      "name": "getMatictoUSD",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nft",
          "type": "address"
        }
      ],
      "name": "getNFTCategory",
      "outputs": [
        {
          "internalType": "enum MembershipMarket.nftCategory",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        }
      ],
      "name": "getNftAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "response",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "err",
          "type": "bytes"
        }
      ],
      "name": "handleOracleFulfillment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "latestError",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "latestRequestId",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "latestResponse",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        },
        {
          "internalType": "enum MembershipMarket.nftCategory",
          "name": "_category",
          "type": "uint8"
        }
      ],
      "name": "setCategoryFunctionScripts",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "oracle",
          "type": "address"
        }
      ],
      "name": "updateOracleAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "source",
          "type": "string"
        },
        {
          "internalType": "bytes",
          "name": "secrets",
          "type": "bytes"
        },
        {
          "internalType": "string[]",
          "name": "args",
          "type": "string[]"
        },
        {
          "internalType": "uint64",
          "name": "subscriptionId",
          "type": "uint64"
        },
        {
          "internalType": "uint32",
          "name": "gasLimit",
          "type": "uint32"
        },
        {
          "internalType": "address",
          "name": "_nft",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenID",
          "type": "uint256"
        }
      ],
      "name": "useNft",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]


module.exports = {
    MembershipMarketAddress,
    AggregatorV3Address,
    oracleAddress,
    // NftAddress,
    SubscriptionId,
    MembershipContractAbi,
    OracleContractAbi
}