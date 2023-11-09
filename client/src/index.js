import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authcontext";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <AuthContextProvider> */}
    <Provider store={store}>
      <PersistGate loading="null" persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
    {/* </AuthContextProvider> */}
  </BrowserRouter>
);
reportWebVitals();
