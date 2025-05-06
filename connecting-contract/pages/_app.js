import "../styles/globals.css";

import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";
import { ThemeProvider } from '../Context/ThemeContext'

const MyApp = ({ Component, pageProps }) => (
    <div>
        <ThemeProvider>
            <NFTMarketplaceProvider>
                <NavBar />
                <Component {...pageProps} />
                <Footer />
            </NFTMarketplaceProvider>
        </ThemeProvider>
    </div>
);

export default MyApp;