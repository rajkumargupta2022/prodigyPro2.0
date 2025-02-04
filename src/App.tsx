import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import "./assets/css/style.css"

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
       <Login/>
    </>
  );
}

export default App;
