
import './App.css'
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Register from "./components/Register"
import {Route,Routes} from "react-router-dom"

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element = {<Register/>}></Route>
      <Route path="/register" element = {<Register/>}></Route>
      <Route path='login' element = {<Login/>}></Route>
      <Route path="/dashboard" element ={<Dashboard/>}/>
    </Routes>
  
      
    </>
  )
}

export default App
