import { useState, useRef } from "react";
import PetOptions from "./PetOptions";

export default function FormDiet({ onSubmitDietInputs }) {
  const [petType, setPetType] = useState("dog");
  const [petAge, setPetAge] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const [preferredDiet, setPreferredDiet] = useState("");
  const [feedingFrequency, setFeedingFrequency] = useState("");
  const [supplements, setSupplements] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [dietGoal, setDietGoal] = useState("");

  const weightUnit = useRef(null);
  const ageUnit = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const diestParameters = {
      pet: petType,
      petAge: `${petAge} ${ageUnit.current.value}`,
      petWeight: `${petWeight} ${weightUnit.current.value}`,
      activityLevel,
      healthConditions,
      preferredDiet,
      feedingFrequency,
      supplements,
      dietaryRestrictions,
      dietGoal,
    };
    onSubmitDietInputs(diestParameters);
  }

  return (
    <div className="form_health--container">
      <h2>Create the Perfect Diet Plan for Your Pet 🥘</h2>
      <form className="diet_form" onSubmit={handleSubmit}>
        <div>
          <label>Pet Type (e.g., Dog, Cat, Rabbit)</label>
          <select value={petType} onChange={(e) => setPetType(e.target.value)}>
            <PetOptions />
          </select>
        </div>

        <div className="grid-3">
          <label>Pet's Age (in Years or Months)</label>
          <input
            type="number"
            min="0"
            placeholder="Enter your pet's age"
            required
            value={petAge}
            onChange={(e) => setPetAge(+e.target.value)}
          />
          <select ref={ageUnit}>
            <option value="year">Years</option>
            <option value="month">Month</option>
          </select>
        </div>

        <div className="grid-3">
          <label>Pet's Weight (in kg or lbs)</label>
          <input
            type="number"
            min="0"
            placeholder="Enter your pet's weight"
            required
            value={petWeight}
            onChange={(e) => setPetWeight(+e.target.value)}
          />
          <select ref={weightUnit}>
            <option value="kg">Kg</option>
            <option value="pounds">Pounds</option>
          </select>
        </div>

        <div>
          <label>Activity Level (Low, Medium, High)</label>
          <select
            required
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            <option value="">Select activity level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label>Existing Health Conditions (Optional)</label>
          <input
            type="text"
            placeholder="Enter any health conditions"
            value={healthConditions}
            onChange={(e) => setHealthConditions(e.target.value)}
          />
        </div>

        <div>
          <label>Preferred Diet Type (Optional)</label>
          <input
            type="text"
            placeholder="Enter preferred diet type"
            value={preferredDiet}
            onChange={(e) => setPreferredDiet(e.target.value)}
          />
        </div>

        <div>
          <label>
            How Often Do You Feed Your Pet? (Once, Twice, Free Feeding)
          </label>
          <select
            required
            value={feedingFrequency}
            onChange={(e) => setFeedingFrequency(e.target.value)}
          >
            <option value="">Select feeding frequency</option>
            <option value="once">Once</option>
            <option value="twice">Twice</option>
            <option value="free">Free Feeding</option>
          </select>
        </div>

        <div>
          <label>Do You Give Your Pet Treats or Supplements? (Yes/No)</label>
          <select
            required
            value={supplements}
            onChange={(e) => setSupplements(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label>Dietary Preferences or Restrictions (Optional)</label>
          <input
            type="text"
            placeholder="Enter preferences or restrictions"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
        </div>

        <div>
          <label>
            Diet Goal (e.g., Weight Loss, Weight Gain, Maintenance, Health
            Management)
          </label>
          <select
            required
            value={dietGoal}
            onChange={(e) => setDietGoal(e.target.value)}
          >
            <option value="">Select a diet goal</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="weight_gain">Weight Gain</option>
            <option value="maintenance">Maintenance</option>
            <option value="health_management">Health Management</option>
          </select>
        </div>
        <button className="btn btn-submit">Get Diet Plan</button>
      </form>
    </div>
  );
}
