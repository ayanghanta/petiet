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

  function handleSelectDiagnosis() {
    setIsSelectDigo((s) => !s);
  }

  return (
    <div className="app">
      <div className="main">
        <NavBar />
        {isSelectDigo || isSelectDiet || (
          <>
            <Header />
            <HeroButtons onSelectDiagnosis={handleSelectDiagnosis} />
          </>
        )}
        {isSelectDigo && <FormHealth />}
        {/* <DiagnosisResultSection /> */}
      </div>
      <Footer />
    </div>
  );
}
