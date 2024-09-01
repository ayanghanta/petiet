export default function NavBar() {
  return (
    <div className="navbar">
      <div className="logo">Petiet</div>
      <ul className="nav_links">
        <li className="nav_link">
          <a href="/">About us</a>
        </li>
        <li className="nav_link">
          <a href="/">Your pet</a>
        </li>
      </ul>
    </div>
  );
}
