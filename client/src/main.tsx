import ReactDOM from "react-dom/client";
import "../index.css";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ProviderFunction from "./context/authContext";
import SessionProvider from "./context/sessionProvider";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProviderFunction>
          <SessionProvider>
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                duration: 5000,
                style: {
                  fontSize: "16px",
                  borderRadius: "8px",
                },
              }}
            />
            <Home />
          </SessionProvider>
        </ProviderFunction>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
