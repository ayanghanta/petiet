import { useState } from "react";
import PetDetails from "./PetDetails";
import Loader from "../Loader.js";
import Error from "./Error";

import useGetGeminiResponce from "../customHooks/useGetGeminiRes";

const mySchema = {
  type: "object",
  properties: {
    diagnosis: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          issue: {
            type: "string",
          },
          description: {
            type: "string",
          },
          symptoms: {
            type: "array",
            items: {
              type: "string",
            },
          },
          causes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          cure: {
            type: "array",
            items: {
              type: "string",
            },
          },
          doctors: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: [
          "title",
          "issue",
          "symptoms",
          "causes",
          "cure",
          "doctors",
          "description",
        ],
      },
    },
  },
  required: ["diagnosis"],
};

export default function DiagnosisResultSection({ petDetails }) {
  const [petInfo, setPetInfo] = useState(petDetails);

  const prompt = `My ${petInfo.pet} ${
    petInfo.petBreed ? `of breed ${petInfo.petBreed}` : ""
  } is ${petInfo.petAge} years old and weighs ${petInfo.petWeight}.My ${
    petInfo.pet
  }'s issue is ${
    petInfo.issue
  }. Please provide a diagnosis, including the top 3 different possible health issues, their symptoms, causes, cures, and recommended doctors.`;

  const { isLoading, result, error } = useGetGeminiResponce(mySchema, prompt);
  console.log(result);

  return (
    <div className="diag_section">
      <h3>Your pet's details</h3>
      <PetDetails petInfo={petInfo} />

      <div className="degonosisResultCards">
        <h3>Your Pet’s Health Diagnosis: Key Issues and Expert Advice</h3>

        {error && <Error>⚠️ {error}</Error>}

        {isLoading && <Loader />}

        {error.length !== 0 || isLoading || (
          <div className="card_lists">
            {result?.diagnosis?.map((diagnosis, i) => (
              <DiagnosisCard
                result={diagnosis}
                key={`${diagnosis.title}${i}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DiagnosisCard({ result }) {
  return (
    <div className="diagnosis_card">
      <p className="diagnosis_title">{result.title}</p>
      <p className="diagnosis_description">{result.description}</p>
      <div>
        <p>🚨 Symptoms</p>
        <ul>
          {result.symptoms.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>⚠️ Causes</p>
        <ul>
          {result.causes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>💝 Cure</p>
        <ul>
          {result.cure.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  /*
{
      causes: [
        "Allergies to pollen, dust mites, mold, or other allergens",
        "Viral infections, such as feline herpesvirus (FHV) or feline calicivirus (FCV)",
        "Bacterial infections",
      ],
      cure: [
        "Antihistamines or corticosteroids to reduce allergy symptoms",
        "Supportive care, such as fluids and antibiotics if a bacterial infection is present",
        "Antibiotics if a bacterial infection is present",
      ],
      doctors: ["Veterinarian"],
      issue: "Upper respiratory infection (URI)",
      symptoms: [
        "Sneezing",
        "Watery eyes",
        "Runny nose",
        "Coughing",
        "Conjunctivitis",
      ],
      title: "Upper Respiratory Infection (URI)",
    }
*/
}
