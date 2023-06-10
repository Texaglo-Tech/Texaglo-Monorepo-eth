import styles from "../../styles/page/landing.page.module.scss";
import { useState } from "react";
import Modal from "../../component/modals/modal";
import Modal2 from "../../component/modals/modal2";
import Modal3 from "../../component/modals/modal3";

const form1 = () => {
    const [project, setProject] = useState();
    // this function will be called when a radio button is checked
    const handleChange = (e) => {
        setProject(e.target.value);
    };

    return (
        <div id="contact" className={styles.content_container}>
            <div className={styles.row}>
                <div className={styles.left}>
                    <div className={styles.container}>
                        <div className={styles.centered}>
                            <span className={styles.spanleft}>
                                DEVELOP A PROJECT
                            </span>
                            <br />
                            <span>
                                Texaglo seeks to bridge the gap between
                                creatives, SME’s, Corporations and Web3 using
                                blochains such as Solana and Cloud computing
                                infrastructre from Amazon
                            </span>
                            <div id="modal-root">
                                <Modal>learn more</Modal>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.middle}>
                    <div className={styles.container1}>
                        <div className={styles.centered}>
                            <span className={styles.spanleft}>Get Trained</span>
                            <br />
                            <span>
                                Texaglo Is here to provide training for those
                                who would like to learn more about web
                                technologies
                            </span>
                            <div id="modal-root">
                                <Modal2>learn more</Modal2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.container2}>
                        <div className={styles.centered}>
                            <span className={styles.spanleft}>
                                Work on a Project
                            </span>
                            <br />
                            <span>
                                Texaglo Technologies Is here to provide training
                                for those who would like to learn more about web
                                technologies
                            </span>
                            <div id="modal-root">
                                <Modal3>learn more</Modal3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default form1;
