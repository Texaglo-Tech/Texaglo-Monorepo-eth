import React from "react";
import "./Sidebar.css";
import navbarItems from "../NavbarItems";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { requestAirdrop } from "./../../api";
import { ToastContainer, toast } from "react-toastify";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";

const Sidebar = ({ isopen, toggle }) => {
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  
  let opacityClasses = ["sidebar-container"];
  if (isopen) {
    opacityClasses.push("opacity-on");
  } else {
    opacityClasses.push("opacity-off");
  }
  
  const handleAirdrop = async() => {
    const id = toast.loading("Getting faucet...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    const res = await requestAirdrop(connection, wallet)
    if(res == "success"){
      toast.update(id, {
        render: "You got the 0.2 SOL Successfully!",
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });
    }else{
      toast.update(id, {
        render: "You got error, please try again!",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
    }
  }

  return (
    <div
      className={opacityClasses.join(" ")}
      isopen={isopen.toString()}
      onClick={toggle}
    >
      <div className="icon">
        <FaTimes className="close-icon" onClick={toggle} />
      </div>
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
            <button onClick={()=>{window.open("https://www.Yourdomain.com/sdns", "_blank")}} className="sidebar-links">
              Dashboard
            </button>
            <button onClick={handleAirdrop} className="sidebar-links">
              Get Faucet
            </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
