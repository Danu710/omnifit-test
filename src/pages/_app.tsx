import "@/styles/globals.css";
import { AppProps } from "next/app";
import firebase from "firebase/app";
import "firebase/firestore";
import { ChakraProvider } from "@chakra-ui/react";

// const firebaseConfig = {
//   apiKey: "AIzaSyD2PQfT5KozSIfV0f9W-uSRmVPIBjCL8NY",
//   authDomain: "my-project-754a5.firebaseapp.com",
//   // Add other Firebase config properties
// };

// if (typeof window !== "undefined" && !firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
