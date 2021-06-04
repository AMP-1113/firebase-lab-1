import './App.css';
import ShoutOutList from './components/ShoutOutList';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ShoutOutsForName from './components/ShoutOutsForName';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <h1>SHOUT OUTS</h1>
      <nav>
        <ul>
          <li><Link to="/user/Zee">Shout Outs to Zee</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/user/:to">
          <Link to="/">Back to all Shout Outs</Link>
          <ShoutOutsForName />
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
