export default function HeroButtons({ onSelectDiagnosis, onSelectDiet }) {
  return (
    <div className="hero_btns">
      <button className="btn btn_hero" onClick={onSelectDiagnosis}>
        Diagnose Health Issues 🩺
      </button>
      <button className="btn btn_hero" onClick={onSelectDiet}>
        Get Diet & Care Plan 🥣
      </button>
    </div>
  );
}
