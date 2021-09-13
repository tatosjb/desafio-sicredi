import './App.css';
import PrivateRoute from './components/PrivateRoute';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom"

import { SessionContextProvider } from "./contexts/SessionContext";

import Header from "./components/Header"
import Login from "./pages/Login"
import DragonsIndex from './pages/Dragons/Index'

function App() {
  return (
    <SessionContextProvider>
      <Router>
        {/* <Link to="/dragons">List Dragons</Link>
        <Link to="/dragon/1">Look Dragon</Link>
        <Link to="/dragon/1/edit">Edit Dragon</Link> */}

        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>

          <PrivateRoute path="/dragons" exact>
            <div>Listing dragons</div>
          </PrivateRoute>
          <PrivateRoute path="/dragon/:id" exact>
            <ShowDragon />
          </PrivateRoute>
          <PrivateRoute path="/dragon/:id/edit" exact>
            <EditDragon />
          </PrivateRoute>
          <PrivateRoute path="/">
            <DragonsIndex />
          </PrivateRoute>
        </Switch>
      </Router>
    </SessionContextProvider>
  );
}

export default App;


function ShowDragon(){
  let { id } = useParams()

  return (
    <>
      <Header />
      <div>Showing dragon {id}</div>
    </>
  )
}

function EditDragon(){
  let { id } = useParams()

  return (
    <>
      <Header />
      <div>Editing dragon {id}</div>
    </>
  )
}


