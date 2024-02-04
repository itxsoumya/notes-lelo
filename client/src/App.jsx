import Footer from "./components/Footer"
import NavBar from "./components/Navbar"
import Home from "./pages/Home"


const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Home />
      <Footer/>
    </div>
  )
}

export default App
