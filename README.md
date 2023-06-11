## Inspiration
Upon observing that physical businesses faced challenges in attracting **pre-revenue** and attention through membership cards, due to limited **traceability** and **monitoring**, we sought to address this issue. We aimed to generalize the concept of creating NFTs for **membership cards**, allowing trusted brands and companies to generate pre-revenue and scale their business. Meanwhile, consumers would benefit from **exclusive discounts** and offers as members.

## What it does
We have developed a platform called Grandeur that enables both physical and digital companies to create their own membership NFTs. Users can purchase these NFTs and utilize them through our platform. To assist companies in tracking the progress of their NFT memberships, we provide an interactive dashboard that offers insights such as total revenue earned and the number of NFTs purchased.

All NFTs are **dynamic** in nature. When a user purchases an NFT, their ENS or wallet address is displayed on the image card. Additionally, certain fields of the base metadata, such as the mint date, expiry date, and user address, are updated based on the company's generated metadata.

Similarly, when a buyer consumes the services associated with their membership, the brand or company will notify the buyer of the amount consumed. The buyer must then approve the transaction. Once approved, a small **Use NFT** transaction occurs, updating the NFT's metadata. This allows the platform to track the buyer's activities, including the amount spent. The update takes place through mutual agreement between the consumer and the brand or company.

The platform emphasizes that neither the consumer nor the brand can update the value of essential metadata fields, such as discounts and expiry dates, which are determined by the company before the launch. We strive to create a robust system in which brands cannot fail to fulfill their promises, and users cannot misuse the services.

To enforce this, we apply the concept of a maximum purchase limit. For instance, if a brand sets a maximum purchase limit of $1,000 per day with a 50% discount, users can avail the 50% discount only within the limit of $1,000. This limit is automatically renewed every day.

Furthermore, we prioritize brands setting short expiry dates, such as one year, to ensure they can fulfill their promises. We only list trustworthy brands and companies on our platform, which are decided by DAO (a future plan, not yet implemented).

## How we built it
We utilized various technologies to build our platform:

**Chainlink Functions:**  We leveraged Chainlink Functions technology to create dynamic and functional NFTs. When a person uses their membership NFT, the smart contract requests Chainlink Functions to update the metadata based on its usage. The following steps are performed by our script inside the Chainlink Functions DON:

* Retrieve metadata from IPFS.
* Update metadata based on user's usage, with mutual confirmation from the brand and company.
* Post new metadata to IPFS and obtain the CID.
* Update the Space & Time table.
* Send the new metadata URL back to the contract.
* Fulfill the request by setting the Token ID with the new metadata URL.

**Space & Time:**  All data, except for images, is securely stored in a decentralized database called Space and Time. Currently in the beta phase, it does not have its own contract indexing service. Therefore, we created our own table to store contract data and integrated it with Chainlink Functions. When our contracts send requests to Chainlink Functions to update metadata, the Space and Time table is also updated for easy retrieval on the dapp. Once the indexing service is available, we plan to directly retrieve our emitted smart contract data, further enhancing trust.

**Pinata:** We utilize Pinata to store brand and company logos, service category images, and metadata on IPFS.

**Chainlink Keepers:** Keepers will update certain metadata fields, such as expiry date, amount, and renewal, by calling Chainlink Functions. This aspect is currently not implemented due to time constraints, but it remains a part of our architecture.

**Push Protocol:** The NFT provider sends notifications to consumers when they consume a service through the push protocol. This feature has not been integrated in the MVP.

**Polygon:** Our contracts are deployed on Polygon, as it provides cost-effective and scalable usability for NFTs. Additionally, Polygon is known for its clean-energy blockchain, aligning with our project's mission and technology decisions.

**Hardhat:** We used Hardhat to compile, deploy, and test our contract scripts.

**React, JavaScript, Tailwind CSS, Ant Design:** Our dapp is built using React, with Tailwind CSS for component styling. Some components are sourced from Ant Design.

## Challenges we encountered
Our project involved technologies that are still in the beta phase, which presented challenges in integration within our time constraints.

Initially, we planned to represent our NFTs using SVGs. However, when attempting to update SVGs in Chainlink Functions, we encountered an error related to byte size exceeding the limit. Upon reading the limitations page of Chainlink Functions, we discovered several constraints, such as request and response sizes, and the number of API calls allowed. To overcome this, we decided to eliminate the image part from our metadata and use React components instead. We now include the metadata within the component, resulting in more efficient and visually appealing NFTs.

We faced difficulties integrating Chainlink Functions into our React dapp. Additionally, integrating Space and Time proved challenging due to its strong security measures.

## Accomplishments that we're proud of
We take great pride in developing a platform with significant use cases that encourage big brands to adopt blockchain technology. We firmly believe that through our platform, we can make a substantial impact in the membership market. Our ambition drives us to work tirelessly towards this goal.

## What we learned
Throughout this project, we gained valuable knowledge on effectively utilizing Chainlink Functions, Space and Time, and other essential technologies required for building a DApp. The key learnings from this hackathon experience include:

* Time management.
* Consistency and perseverance leading to achievements.
* The importance of patience and finding solutions when facing challenges.
* We consider the knowledge gained during this hackathon to be remarkable and believe it will benefit us throughout our lives.

## What's next for Grandeur
Our future plans for Grandeur include:

* Integrating DAO (Decentralized Autonomous Organization) into our platform to make informed decisions about which company's NFTs should be listed. This verification process is crucial to prevent scams and ensure scrutiny in the creation of membership cards.
* Implementing a business-to-business model where companies can utilize our APIs to automate the process of providing yearly gifts to their employees in the form of brand memberships.
* Collaborating with Space and Time to ensure smooth data flow.
* Stabilizing the Use NFT functionality through Chainlink Functions.
* Exploring the integration of the Push Protocol to enable NFT providers to send notifications to consumers when they consume services.
* Continuing to leverage Polygon for its cost-effectiveness and scalability.
* Leveraging Hardhat for efficient contract compilation, deployment, and testing.
* Utilizing React, JavaScript, Tailwind CSS, and Ant Design to further enhance and refine our dapp.
With these plans in mind, the possibilities for Grandeur are endless.

## Architecture
![Architecture of Grandeur](https://github.com/nehal2210/Nft-Membership-Marketplace/blob/main/MembershipMarket.png)
