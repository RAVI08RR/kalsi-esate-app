import React from "react";
import BreadcrumbComponent from "./BreadcrumbComponent";
import Header from "./Header";

const Disclaimer = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/", active: false },
    { label: "Disclaimer", active: true },
  ];
  return (
    <>
      <Header showBg={true} />
      <div className="container mt-5 pb-2">
        <BreadcrumbComponent items={breadcrumbItems} headingText="Disclaimer" />
      </div>
      <div className="container">
        <div className="row">
          <div className="container">
            <p>
              The Proprietor does not take responsibility or liability for the
              actions, products, content and services on the Website if any,
              which are linked to Affiliates and / or third party websites using
              APIs or otherwise. They will not be liable for any damages of any
              kind arising out of or relating to the use or the inability to use
              its Website its content or links, including but not limited to
              damages caused by or related to errors, omissions, interruptions,
              defects, delay in operation or transmission, computer virus, line
              failure and all other direct, indirect, special, incidental,
              punitive, loss of profit, exemplary or consequential damages
              whether based on warranty, contract, tort or any other legal
              theory including Force Majeure, and whether or not, such
              organizations or entities were intimated or advised of the
              possibility of such damages. User agree to defend, indemnify, and
              hold harmless, to Proprietor and/ or its associates, subsidiaries,
              their officers, directors, employees, affiliates, licensees,
              business partners and agents, from and against any claims, actions
              or demands, including without limitation reasonable legal and
              accounting fees, alleging or resulting from your use of any
              material or your breach of these terms and conditions or any
              applicable law. We does not facilitate or participate in any
              manner in the process of selling, buying, renting etc. of
              properties, and it is not responsible for any dealing,
              negotiations, transactions, etc. whatsoever between the parties
              connected through our Services, including and not limited to any
              quality assurance, guarantee, claim etc. given by one party to
              another in any transaction. We will not be party to any legal
              proceedings between parties contracted through these Services. In
              case if Proprietor is sought to be implicated in any legal
              proceedings, costs will be recovered from the party that names as
              a party to such proceedings. As a part of the service we may form
              alliance between user and third party. However user acknowledge
              and agree that in no time we are making any representation or
              warranty regarding any third party services nor liable for any
              action or consequences occurred by the act of the third party
              including but not limited to any liability or responsibility for
              injury, impairment or any loss incurred whether monetary or
              otherwise experienced by the user. User hereby disclaim and waive
              any rights and claims they may have against us with respect to
              third party’s.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
