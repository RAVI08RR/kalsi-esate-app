import React, { useState } from "react";
import { Slider } from "antd";

const EMICalculatorForm = ({ classname }) => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [timePeriodYears, setTimePeriodYears] = useState(10);
  const [interestRate, setInterestRate] = useState(7);
  const [emi, setEmi] = useState(null);

  const calculateEMI = (e) => {
    e.preventDefault();
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseInt(timePeriodYears) * 12;

    if (!isNaN(P) && !isNaN(r) && !isNaN(n)) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const formattedEmi = new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(emi);
      setEmi(formattedEmi);
    } else {
      setEmi(null);
    }
  };



  return (
    <div className={`container ${classname}`}>
      <h2 className="Project-title pb-2">EMI Calculator</h2>
      <form onSubmit={calculateEMI}>
        <div className="form-row emi-calculation">
          <div className="form-group">
            <div className="input-group">
              <input
                type="number"
                className="form-control input-emi-form"
                id="loanAmount"
                placeholder=" "
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
              <label htmlFor="loanAmount" className="form-label">
                Loan Amount
              </label>
              <Slider
                className="slider-loan"
                min={100000}
                max={50000000}
                step={1}
                value={loanAmount}
                onChange={(value) => setLoanAmount(value)}
                marks={{
                  100000: "1 Lac",
                  50000000: "5 Cr",
                }}
              />
            </div>

            <div className="input-group">
              <input
                type="number"
                className="form-control input-emi-form"
                id="timePeriodYears"
                placeholder=" "
                value={timePeriodYears}
                onChange={(e) => setTimePeriodYears(e.target.value)}
              />
              <label htmlFor="timePeriodYears" className="form-label">
                Time Period (Years)
              </label>
              <Slider
                className="slider-loan"
                min={1}
                max={30}
                step={1}
                value={timePeriodYears}
                onChange={(value) => setTimePeriodYears(value)}
                marks={{
                  1: "1 Year",
                  30: "30 Year",
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <input
                type="number"
                className="form-control input-emi-form"
                id="interestRate"
                placeholder=" "
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
              <label htmlFor="interestRate" className="form-label">
                Interest Rate
              </label>
              <Slider
                className="slider-loan"
                min={4}
                max={15}
                step={0.1}
                value={interestRate}
                onChange={(value) => setInterestRate(value)}
                marks={{
                  4: "4%",
                  15: "15%",
                }}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary submit-btn-contact">
            Calculate My EMI
          </button>
        </div>
      </form>
      {emi && (
        <div className="emi-result">
          <h4>Your Monthly EMI is: ₹{emi}</h4>
        </div>
      )}
    </div>
  );
};

export default EMICalculatorForm;
