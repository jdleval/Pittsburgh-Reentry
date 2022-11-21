import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//styles
import './App.css';

// pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Admin from './pages/admin/Admin';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Resume from './pages/resume/Resume';
import JobSearch from './pages/jobSearch/JobSearch';
import FindHousing from './pages/paths/FindHousing';
import FindSupportGroups from './pages/paths/FindSupportGroups';
import CheckIntoTreatment from './pages/paths/CheckIntoTreatment';
import OnlineUsers from './components/OnlineUsers';

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Dashboard />}
              </Route>
              <Route path="/create">
                {!user && <Redirect to="/login" />}
                {user && <Create />}
              </Route>
              <Route path="/projects/:id">
                {!user && <Redirect to="/login" />}
                {user && <Project />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </Route>
              <Route path="/admin">
                {!user && <Redirect to="/login" />}
                {user && <Admin />}
              </Route>
              <Route path="/resume">
                {!user && <Redirect to="/login" />}
                {user && <Resume />}
              </Route>
              <Route path="/jobsearch">
                {!user && <Redirect to="/login" />}
                {user && <JobSearch />}
              </Route>
              <Route path="/housing">
                {!user && <Redirect to="/login" />}
                {user && <FindHousing />}
              </Route>
              <Route path="/support">
                {!user && <Redirect to="/login" />}
                {user && <FindSupportGroups />}
              </Route>
              <Route path="/treatment">
                {!user && <Redirect to="/login" />}
                {user && <CheckIntoTreatment />}
              </Route>
            </Switch>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
