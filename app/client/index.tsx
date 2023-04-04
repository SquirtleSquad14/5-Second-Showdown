import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <GoogleOAuthProvider clientId="989642913892-e87ohs6m5ikq34638391hhc9qoolgnjv.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);


