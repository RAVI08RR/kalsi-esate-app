import React from "react";
import RealtedPostComponent from "../components/RealtedPostComponent";
import Header from "../components/Header";

const RelatedPostpage = ({cities}) => {
  return (
    <div className="realted-post-section mb-5">
      <Header showBg={true} cities={cities}/>

      <RealtedPostComponent clasName="mb-5 " />
    </div>
  );
};

export default RelatedPostpage;
