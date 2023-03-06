import { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./app.css";

 export default function App() {
  
  const [apiInfo, setApiInfo] = useState(null);

  useEffect(() => {
    fetch("/api/v1")
      .then((data) => data.json())
      .then((data) => setApiInfo(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Hi Honeybadger Team </p>
        <p>
        </p>
        <p>
          Edit <code>app.jsx</code> and save to test HMR updates.
        </p>
        {apiInfo && (
          <ul>
            {Object.keys(apiInfo).map((key) => (
              <li key={key}>
                {key.toUpperCase()}: {apiInfo[key]}
              </li>
            ))}
          </ul>
        )}
        <p>
         Enter the form details on this page to send to web endpoint. 
        </p>
      </header>
    </div>
  );
}

