import React from "react";

const EcosystemComponents = ({ eco_system }) => {
  return (
    <div>
      <div className="container">
        <div className="row pl-0">
          {eco_system?.map((item, index) => (
            <div className="col-lg-3" key={index}>
              <div className="card ecosystem">
                <div className="card-body">
                  <img src={item.icon} className="ecosystem-icons" alt="icon" />
                  <h6>{item.facilities}</h6>
                  <p>{item.duration} Min </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcosystemComponents;
