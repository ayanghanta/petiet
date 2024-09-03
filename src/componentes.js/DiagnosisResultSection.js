import { useEffect, useState } from "react";
import { APIKEY } from "./config.js";
import PetDetails from "./PetDetails";
import Loader from "../Loader.js";
const {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
} = require("@google/generative-ai");

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
async function testAPICall() {
  const genAI = new GoogleGenerativeAI(APIKEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: mySchema,
    },
  });

  const prompt =
    "My cat is 3 years old and weighs 5 kg. It has been exhibiting frequent sneezing and watery eyes. Please provide a diagnosis, including the top 3 possible health issues, their symptoms, causes, cures, and recommended doctors.";

  const result = await model.generateContent(prompt);
  const data = JSON.parse(result.response.text());
  // console.log(data);
}

// CUSTOM HOOK

function useGetGeminiResponce(responceSchema, prompt) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState([]);

  useEffect(
    function () {
      async function GetDiagnosis() {
        const genAI = new GoogleGenerativeAI(APIKEY);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: responceSchema,
          },
        });

        try {
          setIsLoading(true);
          setError("");

          const res = await model.generateContent(prompt);
          const data = JSON.parse(res.response.text());

          setIsLoading(false);

          setResult(data.diagnosis);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
          // CHECK IS THE ERROR FORM THE GEMINI OR NOT
          if (err instanceof GoogleGenerativeAIFetchError) {
            const errorInfo = err.errorDetails[0];
            console.error("Error reason:", errorInfo.reason);

            setError(errorInfo.reason);
          } else {
            console.log("UNEXPECTED ERROR");
            setError("UNEXPECTED ERROR");
          }
        }
      }
      // GetDiagnosis();
    },
    [prompt, responceSchema]
  );

  return { isLoading, result };
}

export default function DiagnosisResultSection({ petDetails }) {
  const [petInfo, setPetInfo] = useState(petDetails);
  const [diagnosisResult, setDiagnosisResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function GetDiagnosis() {
        const genAI = new GoogleGenerativeAI(APIKEY);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: mySchema,
          },
        });
        const prompt = `My ${petInfo.pet} ${
          petInfo.petBreed ? `of breed ${petInfo.petBreed}` : ""
        } is ${petInfo.petAge} years old and weighs ${petInfo.petWeight}.My ${
          petInfo.pet
        }'s issue is ${
          petInfo.issue
        }. Please provide a diagnosis, including the top 3 different possible health issues, their symptoms, causes, cures, and recommended doctors.`;
        try {
          setIsLoading(true);
          const result = await model.generateContent(prompt);
          const data = JSON.parse(result.response.text());
          console.log(data);
          setIsLoading(false);
          setDiagnosisResult(data.diagnosis);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
          // CHECK IS THE ERROR FORM THE GEMINI OR NOT
          if (err instanceof GoogleGenerativeAIFetchError) {
            const errorInfo = err.errorDetails[0];
            console.error("Error reason:", errorInfo.reason);
          } else {
            console.log("UNEXPECTED ERROR");
          }
        }
      }
      // GetDiagnosis();
    },
    [petInfo]
  );
  return (
    <div className="diag_section">
      <h3>Your pet's details</h3>
      <PetDetails petInfo={petInfo} />

      <div className="degonosisResultCards">
        <h3>Your Pet’s Health Diagnosis: Key Issues and Expert Advice</h3>
        <div className="card_lists">
          {isLoading ? (
            <Loader />
          ) : (
            diagnosisResult.map((result) => (
              <DiagnosisCard result={result} key={result.title} />
            ))
          )}
        </div>
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
          {/* <li>Sneezing</li>
          <li>Watery eyes</li>
          <li>Runny nose</li>
          <li>Coughing</li>
          <li>Conjunctivitis</li> */}
        </ul>
      </div>
      <div>
        <p>⚠️ Causes</p>
        <ul>
          {result.causes.map((item) => (
            <li key={item}>{item}</li>
          ))}
          {/* <li>Allergies to pollen, dust mites, mold, or other allergens</li>
          <li>
            Viral infections, such as feline herpesvirus (FHV) or feline
            calicivirus (FCV)
          </li>
          <li>Bacterial infections</li> */}
        </ul>
      </div>
      <div>
        <p>💝 Cure</p>
        <ul>
          {result.cure.map((item) => (
            <li key={item}>{item}</li>
          ))}
          {/* <li>Antihistamines or corticosteroids to reduce allergy symptoms</li>
          <li>
            Supportive care, such as fluids and antibiotics if a bacterial
            infection is present
          </li>
          <li>Antibiotics if a bacterial infection is present</li> */}
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
