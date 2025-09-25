import { Toaster, toast } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage.jsx";
import Notfound from "./pages/Notfound.jsx";
import { Home } from "lucide-react";
function App() {
  return (
    <>
      <Toaster richColors />
      <Homepage />
    </>
  );
}

export default App;
