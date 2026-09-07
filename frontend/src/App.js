import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Landing from "@/pages/Landing";
import Workspace from "@/pages/Workspace";

export default function App() {
  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspace/:workId" element={<Workspace />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" position="top-right" />
    </div>
  );
}
