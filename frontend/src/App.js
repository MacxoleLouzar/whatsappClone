import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";

function App() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/message/sync")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMessage(data);
      });
  }, []);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat message={message} />
      </div>
    </div>
  );
}

export default App;
