import { useState } from "react";

import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import FormDiet from "./FromDiet";
import FormHealth from "./FormHealth";
import HeroButtons from "./HeroButtons";
import DietResultSection from "./DietResultsection";
import DiagnosisResultSection from "./DiagnosisResultSection";

export default function App() {
  const [isSelectDigo, setIsSelectDigo] = useState(false);
  const [isSelectDiet, setIsSelectDiet] = useState(false);
  const [isShowDigo, setIsShowDigo] = useState(false);
  const [isShowDiet, setIsShowDiet] = useState(false);
  const [petInfo, setPetInfo] = useState("");
  const [dietInput, setDietInputs] = useState("");

  function handleSelectDiagnosis() {
    setIsSelectDigo((s) => !s);
  }
  function handleSelectDiet() {
    setIsSelectDiet((s) => !s);
  }

  function handleSubmitDiagnosisDetails(petDetails) {
    setIsSelectDigo((s) => !s);
    setIsShowDigo((s) => !s);

    setPetInfo(petDetails);
  }

  function handleSubmitDeitParams(inputObj) {
    setIsSelectDiet((s) => !s);
    setIsShowDiet((s) => !s);
    setDietInputs(inputObj);
  }

  return (
    <div className="app">
      <div className="main">
        <NavBar />
        {isSelectDigo || isSelectDiet || isShowDigo || isShowDiet || (
          <>
            <Header />
            <HeroButtons
              onSelectDiagnosis={handleSelectDiagnosis}
              onSelectDiet={handleSelectDiet}
            />
          </>
        )}

        {isSelectDigo && (
          <FormHealth onSubmitDiagnosisDetails={handleSubmitDiagnosisDetails} />
        )}

        {isSelectDiet && (
          <FormDiet onSubmitDietInputs={handleSubmitDeitParams} />
        )}

        {isShowDigo && <DiagnosisResultSection petDetails={petInfo} />}

        {isShowDiet && <DietResultSection dietInputs={dietInput} />}
      </div>
      <Footer />
    </div>
  );
}
