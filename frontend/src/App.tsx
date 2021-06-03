import './App.css';
import ShoutOutList from './components/ShoutOutList';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import UserRoute from './components/UserRoute';


function App() {
  return (
    <div className="App">
      <Router>
      <h1>SHOUT OUTS</h1>
      <nav>
        <Link to="/user/Zee">Shout Outs to Zee</Link>
      </nav>
      <Switch>
        <Route path="/user/:name">
          <Link to="/">Back to all Shout Outs</Link>
          <UserRoute />
        </Route>
        <Route path="/">
          <ShoutOutList />
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
