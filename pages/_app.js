import { DataProvider } from "/context/authContext";
import "../styles/globals.css";
import "../styles/Sidebar.scss"

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  )
}

export default MyApp;
