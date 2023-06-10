import { useState, useCallback } from "react";
import WalletContext from "./WalletContext";

import { ProviderProps } from "../types";

const WalletProviders = (props: ProviderProps) => {
    const [address, setWalletAddress] = useState("");
    const setAddress = useCallback(
        async (addr) => {
            setWalletAddress(addr);
        },
        [address]
    );

    let wrapperValues = {
        address,
        setAddress,
    };

    console.log(address);
    return (
        <WalletContext.Provider value={wrapperValues}>
            {props.children}
        </WalletContext.Provider>
    );
};

export default WalletProviders;
