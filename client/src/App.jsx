import Footer from "./components/Footer"
import NavBar from "./components/Navbar"
import Home from "./pages/Home"


const App = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <NavBar />

      <div className="grow bg-green-400x ">

        <Home />
      </div>

      <Footer />
    </div>
  )
}

export default App
