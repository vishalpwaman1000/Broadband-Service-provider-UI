import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignUp from './components/authentication/SignUp';
import AdminDashboard from './components/admin/AdminDashboard';
import CustomerDashboard from './components/customer/CustomerDashboard';
import TechnicianDashboard from './components/technician/TechnicianDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/AdminDashboard" component={AdminDashboard} /> 
          <Route exact path="/CustomerDashboard" component={CustomerDashboard} />
          <Route exact path="/TechnicianDashboard" component={TechnicianDashboard} />
          {/* <Auth Role="Admin" path="/AdminDashboard" component={AdminDashboard}/>
          <Auth Role="Customer" path="/UserDashboard" component={UserDashboard}/> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
