import { useState } from "react";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import ScrollToTop from "./routes/ScrollToTop";

function App() {
  return (
    <div>
      <ScrollToTop/>
      <AllRoutes />
    </div>
  );
}
export default App;
