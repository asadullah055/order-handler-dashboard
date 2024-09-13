import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./app/store.js";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback="Loading">
          <App />
          <Toaster
            toastOptions={{
              position: "top-right",
              style: {
                background: "#283046",
                color: "white",
              },
            }}
          />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
