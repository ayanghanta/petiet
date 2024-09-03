export default function PetDetails({ petInfo }) {
  return (
    <ul className="pet_details">
      <li>
        <span>Pet: </span>
        {petInfo.pet}
      </li>
      <li>
        <p>
          <span>Age: </span>
          {petInfo.petAge} years,
        </p>
        <p>
          <span>Weight: </span> {petInfo.petWeight}
        </p>
      </li>
      <li>
        <span>Issue: </span>
        {petInfo.issue}
      </li>
    </ul>
  );
}
