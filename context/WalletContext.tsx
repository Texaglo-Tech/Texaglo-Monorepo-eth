import { createContext } from 'react';

const WalletContext = createContext({
    address: '',
    setAddress: (addr:any) => {},
});

export default WalletContext;
