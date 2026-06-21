import { useState, useEffect } from "react";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("isLoggedIn");
    if (isLogged === "true") {
      setLoggedIn(true);
    }
  }, []);

  function handleLoginSuccess() {
    localStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  }

  return (
    <div className="app-wrapper">
      {loggedIn ? (
        <Welcome onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
