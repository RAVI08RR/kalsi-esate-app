import React from "react";
import Header from "../components/Header";
import LoginPagecomponent from "../components/LoginPagecomponent";

const Loginpage = () => {
  return (
    <>
      <Header showBg={true} />

      <div className="container mt-5 py-5 login-section">
        <div className="row">
          <LoginPagecomponent />
        </div>
      </div>
    </>
  );
};

export default Loginpage;
