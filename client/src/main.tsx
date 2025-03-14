
import ReactDOM from "react-dom/client";
import "../index.css";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
          <Home />
        </PersistGate>
      </Provider>
  </BrowserRouter>
);

