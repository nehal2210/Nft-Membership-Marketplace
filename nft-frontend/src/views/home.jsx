import React from "react";
import cards from "../assets/cards.png";
import mcdonalds from "../assets/mcdonalds.png";
import airlines from "../assets/american airlines.png";
import spotify from "../assets/spotify.png";
import { Button } from "@material-tailwind/react";
import TrendingNFT from "../components/home page comp/trending";
import Partner from "../components/home page comp/partner";
import { Link } from "react-router-dom";
import '../App.css'

const Home = () => {
  return (
    <div className="flex px-10 flex-col py-4 2xl:p-48 2xl:items-center">
      {/* <div className=" bg-animated"> */}
      <div className="md:flex md:flex-row sm:flex sm:flex-col h-[80vh] bg-animated">
        <div className="md:w-2/4 px-4">
          <img src={cards} alt="cards" className="object-contain" />
          {/* <div className="object-contain w-full h-full bg-animated"></div> */}
        </div>
        <div className="flex flex-col sm:items-center md:items-start justify-center md:text-4xl md:w-2/4 md:px-6 lg:px-20 sm:text-3xl sm:my-4 md:my-0 lg:text-5xl ">
          <h1 className=" text-black dark:text-white dark:bg-black">
            We are market for
          </h1>
          <h1 className="bg-clip-text bg-gradient-to-l from-[#FF008E] to-[#00A3FF] text-transparent font-bold my-2">
            membership NFTs
          </h1>
          <p className="sm:text-sm md:text-lg md:my-8 sm:my-4 lg:my-8 text-black dark:text-white">
            Explore, create, join the community
            <br />
            and enjoy the deals offered here
          </p>
          <div className="sm:flex md:flex-row sm:flex-col sm:items-center">
            <Link to={'/explore'}>
              <Button variant="filled" className="bg-primary">
                Explore
              </Button>
            </Link>
            <div className="sm:my-2 sm:mx-0 md:my-0 md:mx-4 md:inline"></div>
            <Link to={'/create'}>
              <Button variant="outlined" className="text-black dark:text-white">
                Create
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="sm:my-0 md:my-4 flex flex-col items-center w-full ">
        <h2 className="sm:text-2xl md:text-xl lg:text-3xl font-bold text-black dark:text-white my-4">
          Partners
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 2xl:gap-8 w-full mx-auto grid-flow-row">
          <Partner
            image={mcdonalds}
            imageAlt={"McDonalds"}
            partnerName={"McDonalds"}
          />
          <Partner
            image={airlines}
            imageAlt={"American Airlines"}
            partnerName={"American Airlines"}
          />
          <Partner
            image={spotify}
            imageAlt={"Spotify"}
            partnerName={"Spotify"}
          />
          <Partner
            image={mcdonalds}
            imageAlt={"McDonalds"}
            partnerName={"McDonalds"}
          />
        </div>
      </div>
      {/* </div> */}
      <div className="flex flex-col items-center my-10 w-full">
        <h2 className="sm:text-2xl md:text-xl lg:text-3xl font-bold text-black dark:text-white my-4">
          Trending memberships
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 sm:gap-16 lg:gap-4 w-full mx-auto grid-flow-row">
          <TrendingNFT
            image={mcdonalds}
            imageAlt={"mcdonalds"}
            name={"McDonalds"}
          />
          <TrendingNFT image={spotify} imageAlt={"Spotify"} name={"Spotify"} />
          <TrendingNFT
            image={airlines}
            imageAlt={"American Airlines"}
            name={"American Airlines"}
          />
          <TrendingNFT
            image={mcdonalds}
            imageAlt={"McDonalds"}
            name={"McDonalds"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
