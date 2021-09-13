import { useContext } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { SessionContext } from "../../contexts/SessionContext";

import styles from "./styles.module.scss"

export default function Login(){
  let history = useHistory()
  let location = useLocation()
  const sessionContext = useContext(SessionContext)

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    sessionContext.logIn();
    history.replace(from);
  };

  return (
    <form onSubmit={login} className={styles.login}>
      <div>
        <label htmlFor="user"><b>Usuário</b></label>
        <input type="text" placeholder="Digite seu usuario" name="user" required />

        <label htmlFor="password"><b>Senha</b></label>
        <input type="password" placeholder="Digite sua senha" name="password" required />

        <button type="submit">Entrar</button>
      </div>
    </form>
  );
}
