import { Component } from "react";
import { Link } from "react-router-dom";

export interface INavbarProps {}

export interface INavbarState {}

class Navbar extends Component<INavbarProps, INavbarState> {
  state: INavbarState = {};

  render() {
    return (
      <nav className="navbar navbar-expand bg-light mb-4">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Serwis GSM
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Zadania
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add" className="nav-link">
                  Dodaj
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/archive" className="nav-link">
                  Archiwum
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
