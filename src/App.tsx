import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./page/Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGlobalState } from "./context/GlobalProvider";

function App() {
  const { loading } = useGlobalState();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div
        className="loading-background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          backdropFilter: "blur(2px)",
          transition: "opacity 0.3s ease-in-out",
          opacity: loading ? 1 : 0, // Hidden by default
          pointerEvents: "none", // Doesn't block interaction when hidden
        }}
      >
        <div
          className="spinner"
          style={{
            width: "50px",
            height: "50px",
            border: "5px solid #f3f3f3",
            borderTop: "5px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
