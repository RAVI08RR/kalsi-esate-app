import React from "react";
import BreadcrumbComponent from "./BreadcrumbComponent";
import Header from "./Header";

const Desclaimer = ({cities}) => {
  const breadcrumbItems = [
    { label: "Home", href: "/", active: false },
    { label: "Disclaimer", active: true },
  ];
  return (
    <>
      <Header showBg={true} cities={cities}/>
      <div className="container mt-5 pb-2">
        <BreadcrumbComponent items={breadcrumbItems} headingText="Disclaimer" />
      </div>
      <div className="container mt-0 mb-5">
        <div className="row">
          <div className="col-lg-12 terms-condtions-section">
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
            <p>
              1. Before entering into any agreement, the user should conduct
              checks and establish authenticity of any property, or project, its
              title, built up area, suitability for buying / renting in a form
              and manner deemed appropriate at his or her cost.
            </p>
            <p>
              2. Being an advertising platform we cannot validate the
              authenticity of content in its Services. A lot of content is
              uploaded by the advertiser and we do not filter or verify the
              same. If a complaint is made, we will take remedial measures.
            </p>
            <p>3. Precautionary Measure:</p>
            <p>
              (a) Conduct a comprehensive check of ownership to verify owners' /
              landlords’ credentials.
            </p>
            <p>
              (b) Visit the project site/property personally, to ensure that the
              seller’s / landlord’s claim is genuine and that the property is
              not an 'imaginary' one.
            </p>
            <p>
              (c) Beware of false title documents. Loans may have been secured
              against properties that may be disputed or have remained vacant
              for long.
            </p>
            <p>
              (d) We strongly recommend that proper due diligence on the
              property is conducted prior to entering into a transaction related
              to a real estate.
            </p>
            <p>
              (e) It should be independently ensured by the User whether the
              seller is complying with the provisions of Real Estate (Regulation
              and Development) Act 2016 and its applicability to the relevant
              property or project.
            </p>

            <p>
              Our Proprietor is an advertising and marketing platform to many
              developer for their real estate projects (hereinafter referred to
              as “Project”) and is in no way facilitating, negotiating or
              assisting in the sales between you and the developer. While
              displaying this information on our Website is relying on the
              information as provided by the Developer of such Project. Before
              making any decision please ensure to validate all the information
              and go through the terms and conditions as included in the
              documents. Further note that: a. While reasonable efforts are
              being made to ensure the meaningful information being displayed by
              the REPs and the same being asked to be updated by REPs on regular
              intervals, there is a possibility that the information displayed
              may not be current and complete. b. The pictures / photos shown
              here include artist’s impression of the Project. The actual
              properties may vary from such representations. c. Users should
              verify the completeness and accuracy of all such information from
              the RERA website, as may be applicable, of respective States where
              the Project is registered. We does not, by any means verify,
              validate, endorse or promote the compliance of a specific Project
              with the RERA regulations. d. Please make sure you verify all the
              details independently from the REPs or from the RERA website
              before making any decision in relation to the purchase of the
              properties. Proprietor does not warrant that the services offered
              are free of errors or mistakes. Further we does not warrant or
              represent that defects or limitations in the services will be
              corrected. Nor does we warrant or represent that the services
              shall be available continuously. Certain extenuating circumstances
              may cause the services to be interrupted. We provides no remedies
              for such service interruptions. In addition, Proprietor provides
              no remedies for any loss of data resulting from use of the
              services. There is also a lot of information displayed on the
              platform which is neither an advertisement / listing as provided
              by REPs and is collated by our research team from the publically
              available information and is meant to be a tool for the Users’ own
              research and awareness about real estate market. While reasonable
              efforts are being made to ensure the completeness of such
              information being displayed here and the same being updated on
              regular intervals by our research team, there is a possibility
              that the information displayed is not current and complete. This
              information shall in no way be considered as an advertisement or
              offer to sale from the REPs or Proprietor shall neither be
              responsible nor liable for any inaccuracy in the information
              provided here and therefore the Users are requested to
              independently validate the information from the respective
              developers before making their decision for purchase of
              properties. Neither Proprietor, its directors, employees, agents
              nor other representatives shall not be liable for any action
              taken, cost / expenses / losses incurred, by you, based on the
              information given on the portal.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Desclaimer;
