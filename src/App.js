import './App.css';
import PrivateRoute from './components/PrivateRoute';

import { HashRouter as Router, Switch, Route } from "react-router-dom"

import { SessionContextProvider } from "./contexts/SessionContext";

import Login from "./pages/Login"
import DragonsIndex from './pages/Dragons/Index'

function App() {
  return (
    <SessionContextProvider>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>

          <PrivateRoute path="/">
            <DragonsIndex />
          </PrivateRoute>
        </Switch>
      </Router>
    </SessionContextProvider>
  );
}

export default App;
