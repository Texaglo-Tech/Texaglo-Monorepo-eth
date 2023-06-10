import React, { useState } from "react";
import Navbar from "./../components/Navbar/Navbars";
import Sidebar from "./../components/Sidebar/Sidebar";
import nftImg from "./../demoData/nftImg";
import femaleBody from "./../demoData/femaleBody";
import clothingFemale from "./../demoData/clothingFemale";
import backgrounds from "./../demoData/backgrounds";
import femaleHair from "./../demoData/femaleHair";
import halos from "./../demoData/halos";
import maleBodys from "./../demoData/maleBody";
import maleHairs from "./../demoData/maleHair";
import clothingMale from "./../demoData/clothingMale";
import maleFacePaints from "./../demoData/maleFacePaint";
import femaleFacePaints from "./../demoData/femaleFacePaint";

import Body_Aliyah from "./../imgPath/Aliyah/Body_Aliyah";
import MintingPage from "./Random";
import Random from "./Random";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [gender, setGender] = useState("male");
  const [option, setOption] = useState("random");

  const [isopen, setisopen] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [subdomain, setSubDomain] = useState("");
  const [email, setEmail] = useState("");
  const [leaseMonth, handleLeaseMonth] = useState(0);

  const [page, setPage] = useState(0);

  const toggle = () => {
    setisopen(!isopen);
  };

  const pageHandle = () => {
    setPage(0);
  };

  const handleRegister = () => {
    if (subdomain == "") {
      toast.info("Please name your character!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (email == "") {
      toast.info("Please set the email!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (leaseMonth == 0) {
      toast.info("Please set the portal lease time!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    setPage(1);
  };

  return (
    <div>
      <Navbar toggle={toggle} />
      <Sidebar isopen={isopen} toggle={toggle} />

      {/* ===============Art-customization===================== */}

      <div className="Home_section">
        {page == 0 ? (
          <div style={{ width: "50%" }}>
            <span className={"nrmlTxt"}>Name your charater</span>
            <input
              className={"customItem"}
              placeholder="Name your character"
              onChange={(e) => {
                setSubDomain(e.target.value);
              }}
            />
            <span className={"nrmlTxt"}>Provide Email Address</span>
            <input
              className={"customItem"}
              placeholder="techonoking@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <span className={"nrmlTxt"}>Portal lease time</span>
            <input
              type="number"
              min="0"
              className="customItem"
              placeholder="Lease Month in Year"
              onChange={(e) => handleLeaseMonth(parseInt(e.target.value))}
            />
            <button
              type="button"
              className="large-border"
              style={{ height: "50px", fontSize: "16px" }}
              onClick={() => {
                handleRegister();
              }}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="Home_nft_box">
            {option === "random" ? <Random clicked = {clicked} subdomain={subdomain} email={email} leaseMonth={leaseMonth} pageHandle={pageHandle}/> : <MintingPage subdomain={subdomain} email={email} leaseMonth={leaseMonth} pageHandle={pageHandle}/>}
            <div className="mint_option_btn">
              <button
                type="button"
                className="large-border"
                style={{ height: "50px", fontSize: "16px" }}
                onClick={() => {
                  setOption("random");
                  const tmp = clicked + 1;
                  setClicked(tmp);
                }}
              >
                Randomize character
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
