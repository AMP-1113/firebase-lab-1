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
      <Switch>
        <Route path="/user/:to">
          <Link to="/">Back to all Shout Outs</Link>
          <ShoutOutsForName />
        </Route>
        <Route path="/">
        <nav>
          <ul>
            <li><Link to="/user/Zee">Shout Outs to Zee</Link></li>
          </ul>
        </nav>
          <ShoutOutList />
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
