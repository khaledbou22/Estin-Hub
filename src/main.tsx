import { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppLoader } from "./components/AppLoader.tsx";
import "./index.css";

function Root() {
  const [ready, setReady] = useState(false);
  return (
    <>
      {!ready && <AppLoader onDone={() => setReady(true)} />}
      <App />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
