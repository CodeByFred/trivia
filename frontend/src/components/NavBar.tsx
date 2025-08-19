const NavBar = () => {
  return (
    <nav className="flex items-center justify-center p-4 bg-gray-100">
      <ul className="flex items-center gap-4">
        <li>
          <a href="/" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="/game" className="hover:underline">
            Game
          </a>
        </li>
        <li>
          <a href="/review" className="hover:underline">
            Review
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
