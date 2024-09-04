import { useState, useEffect } from "react";
import { APIKEY } from "../componentes.js/config";
const {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
} = require("@google/generative-ai");

export default function useGetGeminiResponce(responceSchema, prompt) {
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

          // CHECK IS THE ERROR FORM THE GEMINI OR NOT
          if (err instanceof GoogleGenerativeAIFetchError) {
            const errorInfo = err.errorDetails[0];
            console.error("Error reason: ▶️", errorInfo.reason);

            setError("Sorry we currently did not fetch your data :/");
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

  return { isLoading, result, error };
}
