import PetOptions from "./PetOptions";

export default function FormHealth() {
  return (
    <div className="form_health--container">
      <h2>Diagnose Your Pet’s Health: Get Expert Guidance Now</h2>
      <form className="health_form">
        <div>
          <label>Pets's type: </label>
          <select>
            <PetOptions />
          </select>
        </div>

        <div>
          <label>Briefly Describe the Issue</label>
          <textarea></textarea>
        </div>
        <div>
          <label>Pet's Age(in year)</label>
          <input type="number" min="0" />
        </div>
        <div className="weight_inp">
          <label>pet's weight</label>
          <input type="text" />
          <select>
            <option value="kg">Kg</option>
            <option value="pounds">Pounds</option>
          </select>
        </div>

        <div>
          <label>Pet's Breed/Type(optional)</label>
          <input type="text" />
        </div>

        <button className="btn btn-submit">Get Diagnosis</button>
      </form>
    </div>
  );
}
