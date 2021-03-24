import { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import "./App.scss";

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => {
  let { url } = useRouteMatch();
  return (
    <div>
      <h2>
        About12312
        <Switch>
          <Route path={`${url}/a`} exact component={Home}></Route>
        </Switch>
      </h2>
    </div>
  );
};

const Product = () => (
  <div>
    <h2>Product</h2>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/About">About</Link>
          <Link to="/Product">Product</Link>
          <hr />
          <Switch>
            <Route path="/about"  component={About}></Route>
            <Route path="/product" component={Product}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
