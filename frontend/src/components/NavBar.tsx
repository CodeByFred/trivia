import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <h1 className="text-xl font-bold">Trivia Game</h1>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="text-xl">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="text-xl">
            <NavLink to="/game">Game</NavLink>
          </li>
          <li className="text-xl">
            <NavLink to="/review">Review</NavLink>
          </li>
          <li className="text-xl">
            <NavLink to="/retry">Retry</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
