import { useContext } from "react";
import styles from "./styles.module.scss";

import { SessionContext } from "../../contexts/SessionContext";

export default function Header() {
  const sessionContext = useContext(SessionContext)
  return (
    <div className={styles.navbar}>
      <a href="#" onClick={sessionContext.logOut}>Log out</a>
    </div>
  )
}
