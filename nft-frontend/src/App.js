import "./App.css";

import CustomNavbar from "./components/navbar/navbar";
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "./routers/routes";
import { useEffect } from "react";
import Footer from "./components/footer/footer";
import '@rainbow-me/rainbowkit/styles.css';
// import Cookies from 'universal-cookie';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { authenticate, signMessage, validateToken } from "./helperFunctions/sxt";


const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Grandeur',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})



function App() {


const getSxtToken=async ()=>{

  signMessage()
  // const token = await authenticate()
  // console.log(token)
}

  useEffect(() => {

    getSxtToken()
    // const cookies = new Cookies();
    // let authValidateToken = validateToken();
    // console.log('authValidateToken', authValidateToken);
    // cookies.set('myCat', 'Pacman', { path: '/' });
    // console.log(cookies.get('myCat'));

    localStorage.setItem("theme", "light");
    let theme = localStorage.getItem("theme");
    console.log("theme: " + theme);
    const prefer = window.matchMedia("(prefers-color-scheme)");
    console.log("prefer: " + prefer);
    if (
      theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Whenever the user explicitly chooses light mode
    theme = "light";

    // Whenever the user explicitly chooses dark mode
    theme = "dark";

    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");
  }, []);
  return (
    <Router>
          <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
      <CustomNavbar />
      <MyRoutes />
      <Footer />
      </RainbowKitProvider>
      </WagmiConfig>
    </Router>
  );
}

export default App;
