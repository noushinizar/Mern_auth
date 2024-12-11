
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import MusicPage from "./pages/Musicpage";

function App() {
  

  return (
    <>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/musicpage" element={<MusicPage/>}/>
     {/* <Login/> */}
     {/* <Signup/> */}
     {/* <Home/> */}

    </Routes>
    </>
  )
}

export default App

