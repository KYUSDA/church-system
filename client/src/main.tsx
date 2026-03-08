import ReactDOM from "react-dom/client";
import "../index.css";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ProviderFunction from "./context/authContext";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ProviderFunction>
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
          </ProviderFunction>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
