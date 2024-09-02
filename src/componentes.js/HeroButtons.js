export default function HeroButtons({ onSelectDiagnosis }) {
  return (
    <div className="hero_btns">
      <button className="btn btn_hero" onClick={onSelectDiagnosis}>
        Diagnose Health Issues 🩺
      </button>
      <button className="btn btn_hero">Get Diet & Care Plan 🥣</button>
    </div>
  );
}
