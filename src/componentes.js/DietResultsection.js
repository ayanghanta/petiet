import { useState } from "react";
import useGetGeminiResponce from "../customHooks/useGetGeminiRes";

import Error from "./Error";
import Loader from "../Loader";

const dietResponceSchema = {
  type: "object",
  properties: {
    dietPlan: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        properties: {
          day: {
            type: "integer",
          },
          meals: {
            type: "array",
            items: {
              type: "object",
              properties: {
                time: {
                  type: "string",
                },
                food: {
                  type: "string",
                },
                nutrients: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      nutrient: {
                        type: "string",
                      },
                      quantity: {
                        type: "string",
                      },
                    },
                    required: ["nutrient", "quantity"],
                  },
                },
                portion: {
                  type: "string",
                },
                supplements: {
                  type: "string",
                },
              },
              required: ["time", "food", "nutrients", "portion", "supplements"],
            },
          },
        },
        required: ["day", "meals"],
      },
    },
  },
  required: ["dietPlan"],
};

export default function DietResultSection({ dietInputs }) {
  const [dietInputInfo, setDietInputInfo] = useState(dietInputs);

  const apiPrompt = `{
  "instruction": "Create a ${3}-day diet plan for a pet based on the provided user input. Each day should have ${
    dietInputInfo.feedingFrequency
  } meals with specific food options, timings, portion sizes, nutrients, and supplements. Ensure the nutrient content aligns with the 'preferredDiet' field. The food options should be appropriate for the 'petType' and 'activityLevel', considering any 'dietaryRestrictions' and 'healthConditions'. The supplement recommendations should be based on the user's input on 'supplements'. and all nutrient quantity should be in gram and total portion in gram , in food name not use any brand name it should be just food,
  "context": {
    "petType": "${dietInputInfo.pet}",
    "petAge": "${dietInputInfo.petAge}",
    "petWeight": "${dietInputInfo.petWeight}",
    "activityLevel": "${dietInputInfo.activityLevel}",
    "healthConditions": "${dietInputInfo.healthConditions}",
    "preferredDiet": "${dietInputInfo.preferredDiet}",
    "feedingFrequency": "${dietInputInfo.feedingFrequency}",
    "supplements": "${dietInputInfo.supplements}",
    "dietaryRestrictions": "${dietInputInfo.dietaryRestrictions}",
    "dietGoal": "${dietInputInfo.dietGoal}"
  }
}`;
  // console.log(dietInputInfo);
  // console.log(promt);

  const { isLoading, result, error } = useGetGeminiResponce(
    dietResponceSchema,
    apiPrompt
  );

  console.log(result);

  return (
    <div>
      {error && <Error>⚠️ {error}</Error>}

      {isLoading && <Loader />}

      {error.length !== 0 || isLoading || (
        <div className="diet_cards">
          {result?.dietPlan?.map((plan, index) => (
            <DietPlanCard key={index} day={plan.day} meals={plan.meals} />
          ))}
        </div>
      )}
    </div>
  );
}
function DietPlanCard({ day, meals }) {
  return (
    <div className="diet_card">
      <h3>Day {day}</h3>
      {meals.map((meal, index) => (
        <div key={index}>
          <h4>
            Meal {index + 1} - {meal.time}
          </h4>
          <p>
            <strong>Food:</strong> {meal.food}
          </p>
          <p>
            <strong>Portion:</strong> {meal.portion}
          </p>
          <p>
            <strong>Supplements:</strong> {meal.supplements}
          </p>
          <div className="nutri_card_section">
            <strong>Nutrients:</strong>
            <ol className="nutri_list">
              {meal.nutrients.map((nutrient, i) => (
                <li key={i}>
                  {nutrient.nutrient}: {nutrient.quantity}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
}
