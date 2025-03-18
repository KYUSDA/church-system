import ReactDOM from "react-dom/client";
import "../index.css";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ProviderFunction from "./context/authContext";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ProviderFunction>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* Configure the Toaster with global settings */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              duration: 5000, // 5 seconds
              style: {
                fontSize: "16px",
                borderRadius: "8px",
              },
            }}
          />
          <Home />
        </PersistGate>
      </Provider>
    </ProviderFunction>
  </BrowserRouter>
);


