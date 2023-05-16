import Layout from "@/Components/layout/layout";
import "@/styles/globals.css";
import { NotificationContextProvider } from "@/store/NotificationCtx";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
      <Component {...pageProps} />
    </Layout>
    </NotificationContextProvider>
    
  );
}
