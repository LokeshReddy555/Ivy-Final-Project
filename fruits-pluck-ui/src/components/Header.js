import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import avocado from "../resources/avocado.gif";
import apple from "../resources/apple.gif";
import strawberry from "../resources/strawberry.gif";

function Header() {
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className='topnav'>
        <Link to={"/"} className="navbar-brand">
          <img src="https://image.winudf.com/v2/image1/Y29tLm5ld2dhbWVzLmp1aWN5ZnJ1aXQuZnJ1aXRtYW5pYV9pY29uXzE1NDc1NzMxNDRfMDE3/icon.png?w=&fakeurl=1"
            className="rounded-circle"
            alt="app-logo" />

          <b id="gamename">fruit pluck</b>
          {/* 3 fruits */}
          <img src={apple} className="apple" alt="apple-logo" />
          <img src={avocado} className="avocado" alt="avocado-logo" />
          <img src={strawberry} className="strawberry" alt="orange-logo" />

        </Link>
        <b id="title"> Fruit Pluck Game</b>

        {/* 3 fruits */}
        <Link to={"/"} className="navbar-brand">
          <img src={apple} className="appleRight" alt="apple-logo" />
          <img src={avocado} className="avocadoRight" alt="avocado-logo" />
          <img src={strawberry} className="strawberryRight" alt="orange-logo" />
        </Link>

        <span className='topnav-right'>
          {!currentUser && (
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          )}

          {currentUser && (
            <Link to={"/user"} className="nav-link">
              Profile
            </Link>
          )}

          {currentUser ? (
            <li>
              <Link to={"/start-game"} className="nav-link">
                StartGame
              </Link>
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          ) : (<li>
            <Link to={"/login"} className="nav-link">
              Login
              </Link>
            <Link to={"/register"} className="nav-link">
              Register
              </Link>
          </li>
            )}
        </span>
      </nav>
    </div>
  )
}

export default Header
