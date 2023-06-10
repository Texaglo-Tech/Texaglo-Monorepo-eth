import styles from "../../styles/page/footer.header.module.scss";
import Image from "next/image";
import DiscordIcon from "../../asset/discord.svg";
import DiscordCloseIcon from "../../asset/discord_close.svg";
import { useState } from "react";

const footer = () => {
  const [discord, setDiscord] = useState(true);
  const changeDiscord = async (index: any) => {
    setDiscord(!discord);
  };
  return (
    <div style={{ padding: 0, margin: "0" }} className={styles.footer2}>
      <button
        className={discord ? styles.discord : styles.discordClose}
        onClick={changeDiscord}
        style={{ zIndex: "999" }}
      >
        {discord ? (
          <Image src={DiscordIcon} width={60} height={60}></Image>
        ) : (
          <Image src={DiscordCloseIcon} width={30} height={30}></Image>
        )}
      </button>
      {!discord ? (
        <iframe
          src="https://e.widgetbot.io/channels/879817009917993030/953397237021564978"
          width="350"
          height="500"
          style={{ position: "fixed", right: "20px", bottom: "20px" }}
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default footer;
