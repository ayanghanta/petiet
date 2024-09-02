import PetDetails from "./PetDetails";
import { APIKEY } from "./config.js";
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

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

export default function DiagnosisResultSection() {
  return (
    <div className="diag_section">
      <h3>Your pet's details</h3>
      <PetDetails />

      <div className="degonosisResultCards">
        <h3>Your Pet’s Health Diagnosis: Key Issues and Expert Advice</h3>
        <div className="card_lists">
          <DiagnosisCard />
          <DiagnosisCard />
          <DiagnosisCard />
        </div>
      </div>
    </div>
  );
}

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
  console.log(data);
}

function DiagnosisCard() {
  return (
    <div className="diagnosis_card">
      <p className="diagnosis_title">Upper Respiratory Infection (URI)</p>
      <p className="diagnosis_description">
        Upper respiratory infections (URIs) are common in cats and often cause
        sneezing and watery eyes. The symptoms are usually mild and resolve on
        their own within a week or two. However, if the symptoms are severe or
        persist for more than a week, it's important to see a veterinarian."
      </p>
      <div>
        <p>🚨 Symptoms</p>
        <ul>
          <li>Sneezing</li>
          <li>Watery eyes</li>
          <li>Runny nose</li>
          <li>Coughing</li>
          <li>Conjunctivitis</li>
        </ul>
      </div>
      <div>
        <p>⚠️ Causes</p>
        <ul>
          <li>Allergies to pollen, dust mites, mold, or other allergens</li>
          <li>
            Viral infections, such as feline herpesvirus (FHV) or feline
            calicivirus (FCV)
          </li>
          <li>Bacterial infections</li>
        </ul>
      </div>
      <div>
        <p>💝 Cure</p>
        <ul>
          <li>Antihistamines or corticosteroids to reduce allergy symptoms</li>
          <li>
            Supportive care, such as fluids and antibiotics if a bacterial
            infection is present
          </li>
          <li>Antibiotics if a bacterial infection is present</li>
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
