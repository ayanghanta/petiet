import { useRef, useState } from "react";
import PetOptions from "./PetOptions";

export default function FormHealth({ onSubmitDiagnosisDetails }) {
  const [pet, setPet] = useState("dog");
  const [petWeight, setPetWeight] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [issue, setIssue] = useState("");

  const weightUnit = useRef("kg");

  function handleSubmit(e) {
    e.preventDefault();

    const petDetails = {
      pet,
      petWeight: `${petWeight} ${weightUnit.current.value}`,
      petAge,
      issue,
      petBreed,
    };
    onSubmitDiagnosisDetails(petDetails);
  }

  return (
    <div className="form_health--container">
      <h2>Diagnose Your Pet’s Health: Get Expert Guidance Now</h2>
      <form className="health_form" onSubmit={handleSubmit}>
        <div>
          <label>Pets's type: </label>
          <select value={pet} onChange={(e) => setPet(e.target.value)}>
            <PetOptions />
          </select>
        </div>

        <div>
          <label>Briefly Describe the Issue</label>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Pet's Age(in year)</label>
          <input
            type="number"
            min="0"
            value={petAge}
            onChange={(e) => setPetAge(+e.target.value)}
            required
          />
        </div>
        <div className="weight_inp">
          <label>pet's weight</label>
          <input
            type="text"
            value={petWeight}
            onChange={(e) => setPetWeight(e.target.value)}
          />
          <select ref={weightUnit}>
            <option value="kg">Kg</option>
            <option value="pounds">Pounds</option>
          </select>
        </div>

        <div>
          <label>Pet's Breed/Type(optional)</label>
          <input
            type="text"
            value={petBreed}
            onChange={(e) => setPetBreed(e.target.value)}
          />
        </div>

        <button className="btn btn-submit">Get Diagnosis</button>
      </form>
    </div>
  );
}
