import logo from '../images/header__logo.svg';
import {CurrentUserContext} from "../contexts/currentUser";
import {useContext} from "react";

function Header() {

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место Россия"/>
      {currentUser && <p className="header__user">{currentUser?.email}</p>}
      <button className="header__button">Выйти</button>
    </header>
  )
}

export default Header
