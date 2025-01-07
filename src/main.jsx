import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import CookieConsent from "react-cookie-consent";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <CookieConsent
      location="bottom"
      buttonText="J'accepte"
      declineButtonText="Je refuse"
      cookieName="mistoufles-cookies"
      enableDeclineButton
      containerClasses="cookie-consent-container"
      buttonClasses="cookie-consent-button"
      declineButtonClasses="cookie-consent-decline-button"
      style={{
        background: "#2B373B",
        position: "fixed",
        right: "20px",
        bottom: "20px",
        left: "auto",
        maxWidth: "300px",
        margin: "0",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 999999,
        fontSize: "12px",
      }}
      buttonStyle={{
        background: "#4CAF50",
        color: "white",
        fontSize: "13px",
        padding: "8px 15px",
        borderRadius: "5px",
        fontWeight: "bold",
        marginTop: "8px",
        cursor: "pointer"
      }}
      declineButtonStyle={{
        background: "#f44336",
        color: "white",
        fontSize: "13px",
        padding: "8px 15px",
        borderRadius: "5px",
        fontWeight: "bold",
        marginTop: "8px",
        marginRight: "10px",
        cursor: "pointer"
      }}
      expires={150}
      onAccept={() => {
        console.log("Cookie accepté!");
        localStorage.setItem("mistoufles-cookies", "true");
      }}
      onDecline={() => {
        console.log("Cookie refusé!");
        localStorage.setItem("mistoufles-cookies", "false");
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        Ce site utilise des cookies pour améliorer votre expérience. En continuant à utiliser ce site, vous acceptez leur utilisation.
      </div>
    </CookieConsent>
  </React.StrictMode>
);
