import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <p className="font-bold text-lg">Trivia Game</p>
      <ul className="flex items-center gap-4">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/game">Game</NavLink>
        </li>
        <li>
          <NavLink to="/review">Review</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
