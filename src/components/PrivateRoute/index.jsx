import { useContext } from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom"

import { SessionContext } from '../../contexts/SessionContext'

export default function PrivateRoute({children, ...otherProps}) {
  const sessionContext = useContext(SessionContext)

  return (
    sessionContext.authenticated
    ? <Route {...otherProps}>{children}</Route>
    : <Redirect
      to={{ pathname: '/login', state: { from: otherProps.location } }}
    />
    )
}

