import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../views/home";
import About from "../views/about/about";
import Explore from "../views/marketplace/explore";
import CreateNFT from "../views/create NFT/createNFT";
import DashBoard from "../views/dashboard/dashboard";
import CardDetails from "../views/card-details/card-details";
import MyCardDetail from "../views/my-card-detail/my-card-detail";

const MyRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route path="/about" Component={About} />
      <Route path="/explore" Component={Explore} />
      <Route path="/create" Component={CreateNFT} />
      <Route path="/dashboard" Component={DashBoard} />
      <Route path="/card-detail" Component={CardDetails} />
      <Route path="/my-card-detail" Component={MyCardDetail} />
    </Routes>
  );
};

export default MyRoutes;
