import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/Navbar"
import Home from "./pages/Home"
import Manager from "./pages/Manager"


const App = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <BrowserRouter>
      <NavBar />

      <div className="grow bg-green-400x ">
        <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<Manager/>} />
        
        </Routes>
      </div>

      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
