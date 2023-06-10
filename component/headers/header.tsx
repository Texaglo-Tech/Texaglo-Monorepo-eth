import styles from "../../styles/page/texaglo.header.module.scss";
import Image from "next/image";
import Texaglo from "../../asset/Texaglo_White.png";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from 'next/dynamic';
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { requestAirdrop } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WalletConnect from "../modals/wallet_connect";

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

require('@solana/wallet-adapter-react-ui/styles.css');
toast.configure();

const header_biz = () => {

  return (
    <>
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a className="__logo">
            <Image src={Texaglo} />
          </a>
        </Link>
      </div>
      <div className={`${styles.headeroption} __desktop_nav`}>
        <NavLinks />
      </div>

      <div className="__mobile_nav">
        <MobileNav />
      </div>
    </div>
    
    
    </>
  );
};

export default header_biz;

const NavLinks = ({ onClick = () => {} }) => {
  const router = useRouter();
  const wallet = useWallet();
  const { connection } = useConnection();

  const [showWallectConnect, setShowWallectConnect] = useState(false);
  const handleClose = () => setShowWallectConnect(false);

  return (
    <>
      <span>
        <a
          className={styles.register}
          onClick={() => {
            onClick();
            router.push("/");
          }}
        >
          Home
        </a>
      </span>
      <span>
        <a
          className={styles.register}
          onClick={() => {
            onClick();
            router.push("/sdns/search");
          }}
        >
          Community
        </a>
      </span>
    
       <span>
        <a
          className={styles.register}
          onClick={() => {
            onClick();
            router.push("https://daofolk.texaglo.com");
          }}
        >
          Join
        </a>
        </span>
      <span>  
        
      </span>
      <span>
          <button onClick={() => setShowWallectConnect(true)}>Connect wallet</button>
      </span>
      {
      showWallectConnect && (<WalletConnect 
        ShowWallectConnect={setShowWallectConnect} 
        />)
      }    
    </>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const overlayClickHandler = (e: any) => {
    if (e.target.id === "mobileMenuOverlay") {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        style={{
          outline: "none",
          background: "none",
          border: "none",
          color: "#fff",
        }}
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon sx={{ width: "30px", height: "30px" }} />
      </button>

      <div
        onClick={overlayClickHandler}
        id="mobileMenuOverlay"
        style={
          isOpen
            ? {
                opacity: 1,
                transition: "0.2s ease",
              }
            : {
                opacity: 0,
                pointerEvents: "none",
                transition: "0.2s ease",
                transitionDelay: "0.4s",
              }
        }
        className={styles.mobile_menu_overlay}
      >
        <div
          style={
            isOpen
              ? {
                  transform: "translateX(0)",
                }
              : { transform: "translateX(-100%)" }
          }
          className={styles.mobile_menu_content_box}
        >
          <NavLinks onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
};
