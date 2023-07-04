import React from "react";
import style from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logOut } from "../../store/AuthSlice";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.auth);

  return (
    <nav className={`${style.myNav} navbar navbar-expand-lg navbar-dark`}>
      <div className="container-fluid">
        <Link to="" className={`${style.logo} navbar-brand`}>
          <i className="fa-regular fa-note-sticky"></i> Notes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {authUser ? (
              <li className="nav-item">
                <Link
                  to=""
                  className={`${style.navLink} nav-link`}
                  onClick={() => dispatch(logOut())}
                >
                  LogOut
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`${style.navLink} nav-link active`}
                    aria-current="page"
                    to="register"
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`${style.navLink} nav-link`} to="login">
                    LogIn
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
