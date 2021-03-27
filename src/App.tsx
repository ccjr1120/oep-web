import { BrowserRouter as Router, Route } from "react-router-dom";
import AppLayout from "./AppLayout/index";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <Route path="/" component={AppLayout}></Route>
    </Router>
  );
};

export default App;
