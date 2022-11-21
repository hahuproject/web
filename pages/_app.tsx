import { FunctionComponent } from "react";
import { AuthProvider } from "../lib/providers/auth/AuthProvider";
import "../sass/main.scss";

type Props = {
  Component: FunctionComponent;
  pageProps: any;
};

const App: FunctionComponent<Props> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
