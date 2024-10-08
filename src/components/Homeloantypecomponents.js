import React from "react";

const Homeloantypecomponents = () => {
  return (
    <div>
      <div className="container">
        <div className="row g-0" style={{ alignItems: "center" }}>
          <div className="col-lg-6">
            <div className="home-type-description">
              <p>
                <b style={{ color: "#c08735" }}> Home purchase loan  – </b> It
                is the most common type of home loan. All banks and housing
                finance companies offer loan for residential properties at
                different rates coupled with discounts and rebates. It can be
                availed for both resale properties and builder allocated units.
              </p>

              <p>
                <b style={{ color: "#c08735" }}> Land/Plot loan  – </b> Banks
                offer such type of loan to buyers intending to purchase land
                parcels for constructing their residential units. About 70
                percent of the total cost of the land can be availed.
              </p>

              <p>
                {" "}
                <b style={{ color: "#c08735" }}>Construction loan  – </b>Most
                common type of home loan availed by a major share of semi-urban
                population to build a home meeting their requirements on a land
                parcel you already own. All housing finance companies and banks
                provide home construction loan.
              </p>

              <p>
                {" "}
                <b style={{ color: "#c08735" }}>
                  Home extension/improvement loan  –{" "}
                </b>{" "}
                You can also avail loan for any sort of extension or improvement
                in your house, be it a new room or a new floor. The housing
                finance companies and banks offer loan for home
                improvement/renovation purposes such as painting, plumbing,
                electrical system, interior designing and waterproofing.
              </p>

              <p>
                {" "}
                <b style={{ color: "#c08735" }}>Home conversion loan - </b>Such
                home loan is taken by people who have bought a house on a home
                loan but would now intend to buy and move to new house. With
                these loans, applicants can fund the purchase of the new house
                by shifting the running loan to the new unit.
              </p>

              <p>
                {" "}
                <b style={{ color: "#c08735" }}>Balance transfer loan  – </b>It
                can be availed when an applicant wishes to transfer home loan
                from one bank to another. It is usually adopted to repay the
                remaining amount at lower interest rates.
              </p>

              <p>
                {" "}
                <b style={{ color: "#c08735" }}>NRI home loan  – </b>It is
                designed for NRIs who wish to construct or buy a home in India.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="home-loan-div">
              <img
                src="/assets/images/home-loan-type.png"
                alt="img"
                className="home-loan-type"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeloantypecomponents;
