import Header from "./Header";
import NavBar from "./NavBar";

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <Header />
      <HeroButtons />
    </div>
  );
}

function HeroButtons() {
  return (
    <div className="hero_btns">
      <button className="btn">Pet health</button>
      <button className="btn">Pet Diet</button>
    </div>
  );
}
