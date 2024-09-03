import { useState } from "react";

import Header from "./Header";
import HeroButtons from "./HeroButtons";
import NavBar from "./NavBar";
import Footer from "./Footer";
import FormHealth from "./FormHealth";
import DiagnosisResultSection from "./DiagnosisResultSection";

export default function App() {
  const [isSelectDigo, setIsSelectDigo] = useState(false);
  const [isSelectDiet, setIsSelectDiet] = useState(false);
  const [isShowDigo, setIsShowDigo] = useState(false);
  const [petInfo, setPetInfo] = useState("");

  function handleSelectDiagnosis() {
    setIsSelectDigo((s) => !s);
  }

  function handleSubmitDiagnosisDetails(petDetails) {
    setIsSelectDigo((s) => !s);
    setIsShowDigo((s) => !s);

    setPetInfo(petDetails);
  }

  return (
    <div className="app">
      <div className="main">
        <NavBar />
        {isSelectDigo || isSelectDiet || isShowDigo || (
          <>
            <Header />
            <HeroButtons onSelectDiagnosis={handleSelectDiagnosis} />
          </>
        )}
        {isSelectDigo && (
          <FormHealth onSubmitDiagnosisDetails={handleSubmitDiagnosisDetails} />
        )}
        {isShowDigo && <DiagnosisResultSection petDetails={petInfo} />}
      </div>
      <Footer />
    </div>
  );
}
