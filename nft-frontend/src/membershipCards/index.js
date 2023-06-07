

function getFoodBase64Svg(companyName,companyLogo){
    let svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="248">
  <rect width="380" height="248" fill="#FFF" rx="12" ry="12" filter="url(#shadow)"/>
  
 <g transform="translate(10, 10)">
    <g class="cart-header">
      <g class="header-inner">
        <image class="w-23"  href="https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png" width="23" height="23" />
        <text class="ml-1" x="30" y="16">GRANDEUR</text>
      </g>
      <g class="header-inner">
        <image class="w-23"  x="220" id="companyLogo" href='${companyLogo}' width="23" height="23" />
        <text class="ml-1" x="250" y="16" id="companyName">${companyName}</text>
      </g>
    </g>
    
  </g>
<!--   body  -->
  <g class="card-body">
      <g class="card-logo">
        <circle cx="195" cy="120" r="65" fill="#fff" stroke="blue" stroke-width="4"/>
        <image class="card-img" x= "160" y="80"  href="https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg" width="80" height="80"/>
      </g>
<!--     bottom part -->
      <g class="bottom-line">
        <rect x="0" y="200" width="380" height="48" rx="8.8" ry="8.8" fill="#ff008e"/>
        <text class="bottom-line-text" x="190" y="230" text-anchor="middle" fill="#fff" id="ownerAddress">Your ENS or Wallet Address</text>
        <g class="bottom-line-end" transform="translate(166, 23)">
          <circle cx="180" cy="202" r="16" fill="black"/>
          <text x="180" y="208" text-anchor="middle" fill="#FFF" id="usedCount" >0</text>
        </g>
      </g>
    </g>

</svg>
`

return btoa(svg)
}

const extractMetadata = (svg, id) => {
    const classRegex = new RegExp(`<.*?id="${id}".*?>(.*?)<\/.*?>`);
    const match = svg.match(classRegex);
  
    if (match) {
      const metadata = match[1];
      return metadata
    } else {
      console.log(`No matching id "${id}" found.`);
      return null
    }
  };

function updateSvg(base64Svg,nameOfOwner){


    const svg = atob(base64Svg.btoa().split("base64,")[1])
    if(extractMetadata(svg, "ownerAddress") !==null){

        const newSvgBase64 = svg.replace(extractMetadata(svg, "ownerAddress"),nameOfOwner)
        return newSvgBase64
    }
return null}



export {
    getFoodBase64Svg
  }