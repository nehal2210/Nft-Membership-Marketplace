import { useState, useEffect } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Link } from "react-router-dom";
import logo from '../../assets/g-logo.png'

export default function CustomNavbar() {
  const [openNav, setOpenNav] = useState(false);
  // dark mode config
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
    console.log(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.removeItem("darkMode");
    }
  };
  // dark mode config end

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:gap-6 text-black dark:text-white">
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/explore" className="flex items-center justify-center">
          Explore
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/create" className="flex items-center justify-center">
          Create
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal lg:mr-6">
        <Link to="/dashboard" className="flex items-center justify-center">
          Dashboard
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky py-2 px-4 lg:px-8 lg:py-4 dark:bg-black dark:border-gray-dark">
      <div className="container mx-auto flex items-center justify-end text-blue-gray-900 dark:text-white">
        <Typography
          as="a"
          href="/"
          className="cursor-pointer py-1.5 font-extrabold mr-auto sm:text-xl md:text-2xl lg:text-3xl flex flex-row items-center"
        >
          <img className="w-[11%]" src={logo} />
          randeur
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={30}
          className="lg:mr-6"
        />
  
  <ConnectButton/>
  
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2 bg-primary"
          >
            <span>Connect Wallet</span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
