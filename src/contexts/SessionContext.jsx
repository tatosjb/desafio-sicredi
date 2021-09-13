import { createContext, useState } from "react"

export const SessionContext = createContext()

export function SessionContextProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)

  const initState = {
    authenticated: authenticated,
    logIn: () => setAuthenticated(true),
    logOut: () => setAuthenticated(false),
  }

  return (
    <SessionContext.Provider value={initState}>
      {children}
    </SessionContext.Provider>
  );
}
