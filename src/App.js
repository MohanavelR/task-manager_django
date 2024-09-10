import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import { Login_page } from "./components/index/Login_page";
import Register from "./components/index/Register/Register";
import { Forget_password } from "./components/index/Forget_password";
import NotFound from './components/NotFound.jsx';
import Company from './components/index/Register/Company.jsx';
import Customer from './components/index/Register/Customer.jsx';
import Agent from './components/index/Register/Agent.jsx';
import Branch from './components/index/Register/Branch.jsx';
import Company_Home from './components/Home/Company/Company_Home.jsx'
import Customer_Home from './components/Home/Customer/Customer_Home.jsx'
import Agent_Home from './components/Home/Agent/Agent_Home.jsx'
import Branch_Home from './components/Home/Branch/Branch_Home.jsx'
function App() {

  return (
    <>
    <Router>
     <Routes>
        <Route path="/" element={<Login_page/>} />
        <Route path='*' element={<NotFound/>}/>
        <Route path="/register" element={<Register/>}>
        <Route path='company' element={<Company/>}/>
        <Route path='customer' element={<Customer/>}/>
        <Route path='agent' element={<Agent/>}/>
        <Route path='branch' element={<Branch/>}/>
        </Route>
        <Route path="/forget" element={<Forget_password/>}>
        </Route>
        <Route path='/company-home' element={<Company_Home/>}>
        </Route>
        <Route path='/customer-home' element={<Customer_Home/>}>
        </Route>
        <Route path='/agent-home' element={<Agent_Home/>}>
        </Route>      
        <Route path='/branch-home' element={<Branch_Home/>}>
        </Route>
       </Routes>
    </Router>
    </>
  );
}

export default App;
