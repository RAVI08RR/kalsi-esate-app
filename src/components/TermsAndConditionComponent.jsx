import React from "react";
import BreadcrumbComponent from "./BreadcrumbComponent";
import Header from "./Header";

const TermsAndConditionComponent = ({cities}) => {
  const breadcrumbItems = [
    { label: "Home", href: "/", active: false },
    { label: "Terms And Conditions", active: true },
  ];
  return (
    <>
      <Header showBg={true} cities={cities}/>
      <div className="container mt-5 pb-2">
        <BreadcrumbComponent
          items={breadcrumbItems}
          headingText="Terms And Conditions"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-5 terms-condtions-section">
            <h6> 1. GENERAL</h6>
            <p>
              Welcome to Kalsiestate.com. A platform where we serve digital real
              estate advertising / marketing and information services and
              connect people with the real estate market through our website
              &nbsp;{" "}
              <a className="text-black" href="https://www.Kalsiestate.com">
                https://www.Kalsiestate.com
              </a>{" "}
              to provide you with access to a variety of services, including but
              not limited to the &nbsp;{" "}
              <a className="text-black" href="https://www.Kalsiestate.com">
                https://www.Kalsiestate.com
              </a>{" "}
              website (hereinafter refer as "Website" ) and all the products and
              services available through our Website. The Website is owned and
              operated by Kalsi Estate Consultant having its Corporate office
              “Siddharth Nagar, Borivali East, Mumbai, and Maharashtra”
              (hereinafter refer as “Proprietor” or “Kalsiestate.com”). By using
              or visiting website, provided to you (collectively the "Service")
              you signify your agreement to these terms and conditions (the
              "Terms of Service") and privacy policy (the “Privacy Policy”) of
              the Proprietor. It shall be deem to be consider as unequivocal
              acceptance on the part of the user and it will term as that user
              has agree to bound to the Terms of Service and Privacy policy
              given in website. This document and the Privacy Policy is an
              electronic record in terms of Information Technology Act, 2000 and
              rules there under as applicable and the amended provisions
              pertaining to electronic records in various statutes as amended,
              modified, restated by the Information Technology Act, 2000 from
              time to time . These ‘Terms of Use’ constitute an electronic
              record within the meaning of the applicable law. This electronic
              record is generated by a computer system and does not require any
              physical or digital signatures. The website reserves an exclusive
              and independent right to amend, modify, add or delete any terms
              and conditions or any terms in privacy policy mention herewith at
              any time without the prior intimation. It is an obligation on the
              user to timely check the website and stay updated on its
              requirements .By continuing browsing it shall be deem to be
              consider that the user is aware of updates and confirm with the
              same.
            </p>
            <h6>2. SERVICES DECRIPTION</h6>
            <p>
              Through our technical research and analysis intent to provide
              assistance in property search to match with the customer
              requirements and preferences. The sales team helps during Site
              visits, Pricing / Inventory Negotiation. We have a dedicated team
              which aids the customer for Mortgage & Financial services,
              Administrative & Legal support. We cater into all kinds of
              properties; categorized as Residential (primary & resale),
              Commercial, Leasing, Land, Global projects, Affordable Housing,
              Investor Projects, Structured offerings etc. We help diversify our
              clients' real estate portfolios around the globe and are pioneers
              in bringing Global Properties with the best payout options to
              Indian investors.
            </p>
            <h6> 3. ELIGIBILITY</h6>
            <p>
              The User represents and warrants that he/she is competent and
              eligible to enter into legally binding agreements and that he/she
              has the requisite authority to bind himself/herself to these
              Terms, as determined solely by the provisions of the Indian
              Contract Act, 1872.
            </p>
            <h6>4. TERMS</h6>
            <p>
              These Terms shall continue to form a valid and binding contract
              between the Parties, and shall continue to be in full force and
              effect until:
              <ul
                className="d-flex list-unstyled"
                style={{ flexDirection: "column" }}
              >
                <li>
                  (a) The User continues to access and use the Website or;
                </li>

                <li>
                  (b)The Transaction between the Parties, if any, concludes to
                  the satisfaction of both Parties; Whichever is longer?{" "}
                </li>
              </ul>
            </p>
            <h6>5. TERMINATION</h6>
            <p>
              The proprietor reserves the exclusive right, in its sole
              discretion, to unilaterally terminate the User's access to the
              products and services offered on the Website, or any portion
              thereof, at any time, without notice or cause.
            </p>
            <h6>6. ONLINE SERVICE PLATFORM</h6>
            <p>
              The Website is an online service platform that gives advises and
              recommendations regarding real estate properties.
            </p>
            <h6> 7. COMMUNICATION/REPORTING:</h6>
            <p>
              To facilitate the user with the better services, the Website will
              ask contact information and providing his/her contact information
              through the Website, the User hereby agree to receive
              communications such as calls, autodialed and/or pre-recorded
              message calls, e-mails SMSs and whatapp or any means of
              communication from the Proprietor and/or any of its affiliates or
              partners at any time, subject to the Policy. In the event that the
              User wishes to stop receiving any such marketing or promotional
              calls / email messages / text messages, the User may send an
              e-mail to the effect{" "}
              <a className="text-black" href="mailto:info@kalsiestate.com">
                Info@kalsiestate.com
              </a>
            </p>
            <h6>8. MODE OF PAYMENT</h6>
            <p>The following payment options are available on the Website:</p>

            <ul className="list-unstyled">
              <li>
                a) Domestic and international credit cards issued by banks and
                financial institutions that are part of the Visa, Master Card &
                Amex Card networks;
              </li>
              <li>b) Visa & Master Card Debit cards;</li>
              <li>
                c) Netbanking/Direct Debit payments from select banks in India.
                A list of available options will be made available at the time
                of 'checkout'.
              </li>
            </ul>

            <h6 className="mt-2">9. SECURITY</h6>
            <p>
              {" "}
              Transactions on the Website are secure and protected. Any
              information entered by the User when transacting on the Website is
              encrypted to protect the User against unintentional disclosure to
              third parties. The User's credit and debit card information is not
              received, stored by or retained by the Proprietor / Website in any
              manner. This information is supplied by the User directly to the
              relevant payment gateway which is authorized to handle the
              information provided, and is compliant with the regulations and
              requirements of various banks and institutions and payment
              franchisees that it is associated with.
            </p>
            <h6>10. OBLIGATIONS AND RESTRICTIONS OF USER</h6>

            <p>
              The User agrees and acknowledges that he/she is a restricted user
              of this Website, and that he/she: a) Is bound not to cut, copy,
              distribute, modify, recreate, reverse engineer, distribute,
              disseminate, post, publish or create derivative works from,
              transfer, or sell any information or software obtained from the
              Website. Any such use / limited use of the Website will only be
              allowed with the prior express written permission of the
              Proprietor. b) Agrees not to access the Website and/or the
              materials or services by any means other than through the
              interface provided by the Website. The use of deep-link, robot,
              spider or other automatic device, program, algorithm or
              methodology, or any similar or equivalent manual process, to
              access, acquire, copy or monitor any portion of the Website or its
              content, or in any way reproduce or circumvent the navigational
              structure or presentation of the Website, materials or any
              content, or to obtain or attempt to obtain any materials,
              documents or information through any means not specifically made
              available through the Website will lead to suspension or
              termination of the User's access to the Website. The User
              acknowledges and agrees that by accessing or using the Website or
              any of the services provided therein, he/she may be exposed to
              content that he/she may consider offensive, indecent or otherwise
              objectionable. The Proprietor disclaims any and all liabilities
              arising in relation to such offensive content on the Website. The
              User expressly agrees and acknowledges that the products /
              services displayed on the Website are not owned by the
              Proprietor/Website, and that the same are the exclusive property
              of certain third parties who have chosen to market their products
              through the Proprietor's Website, and that the Proprietor/Website
              is in no way responsible for the content of the same. The User may
              however report any such offensive or objectionable content, which
              the Proprietor may then remove from the Website, at its sole
              discretion. c) In places where Website permits the User to post or
              upload data/information, the User undertakes to ensure that such
              material is not offensive or objectionable, and is in accordance
              with applicable laws. The User expressly agrees that any such
              material that is deemed to be objectionable/offensive may be
              removed from the Website immediately and without notice, and
              further that the User's access to the Website may also be
              permanently revoked, at the sole discretion of the Proprietor.
            </p>

            <p>
              d) Further undertakes not to: i. Abuse, harass, threaten, defame,
              disillusion, erode, abrogate, demean or otherwise violate the
              legal rights of any other person or entity; ii. Engage in any
              activity that interferes with or disrupts access to the Website or
              the services provided therein (or the servers and networks which
              are connected to the Website); iii. Impersonate any person or
              entity, or falsely state or otherwise misrepresent his/her
              affiliation with a person or entity; iv. Publish, post,
              disseminate, any information which is grossly harmful, harassing,
              blasphemous, defamatory, obscene, pornographic, pedophilic,
              libelous, invasive of another's privacy, hateful, or racially,
              ethnically objectionable, disparaging, relating or encouraging
              money laundering or gambling, or otherwise unlawful in any manner
              whatever under any law, rule or regulation currently in force; or
              unlawfully threatening or unlawfully harassing including but not
              limited to "indecent representation of women" within the meaning
              of the Indecent Representation of Women (Prohibition) Act, 1986;
              v. Post any image/file/data that infringes the copyright, patent
              or trademark of another person or legal entity; vi. Upload or
              distribute files that contain viruses, corrupted files, or any
              other similar software or programs that may damage the operation
              of the Website; vii. Download any file posted/uploaded by another
              user of the Website that the User is aware, or should reasonably
              be aware, cannot be legally distributed in such a manner; viii.
              Probe, scan or test the vulnerability of the Website or any
              network connected to the Website, nor breach the security or
              authentication measures on the Website or any network connected to
              the Website. The User may not reverse look-up, trace or seek to
              trace any information relating to any other user of, or visitor
              to, the Website, or any other customer of the Website, including
              any user account maintained on the Website not operated/managed by
              the User, or exploit the Website or information made available or
              offered by or through the Website, in any manner; ix. Disrupt or
              interfere with the security of, or otherwise cause harm to, the
              Website, systems resources, accounts, passwords, servers or
              networks connected to or accessible through the Websites or any
              affiliated or linked websites; x. Collect or store data about
              other users of the Website. xi. Use the Website or any material or
              content therein for any purpose that is unlawful or prohibited by
              these Terms, or to solicit the performance of any illegal activity
              or other activity which infringes the rights of this Website or
              any other third party(ies); xii. Violate any code of conduct or
              guideline which may be applicable for or to any particular product
              or service offered on the Website; xiii. Violate any applicable
              laws, rules or regulations currently in force within or outside
              India; xiv. Violate any portion of these Terms or the Policy,
              including but not limited to any applicable additional terms of
              the Website contained herein or elsewhere, whether made by
              amendment, modification, or otherwise; xv. Threaten the unity,
              integrity, defence, security or sovereignty of India, friendly
              relations with foreign states, or public order, or cause
              incitement to the commission of any cognizable offence, or prevent
              the investigation of any offence, or insult any other nation. xvi.
              Publish, post, or disseminate information that is false,
              inaccurate or misleading; xvii. Directly or indirectly offer,
              attempt to offer, trade, or attempt to trade, any item the dealing
              of which is prohibited or restricted in any manner under the
              provisions of any applicable law, rule, regulation or guideline
              for the time being in force. xviii. Commit any act that causes the
              Proprietor to lose (in whole or in part) the services of its
              internet service provider ("ISP") or in any manner disrupts the
              services of any other supplier/service provider of the
              Proprietor/Website; xix. Engage in advertising to, or solicitation
              of, other users of the Website to buy or sell any products or
              services not currently displayed on the Website. The User may not
              transmit any chain letters or unsolicited commercial or junk
              email/messages to other users via the Website. It shall be a
              violation of these Terms to use any information obtained from the
              Website in order to harass, abuse, or harm another person, or in
              order to contact, advertise to, solicit, or sell to another user
              of the Website without the express prior written consent of the
              Proprietor. The User hereby expressly authorises the
              Proprietor/Website to disclose any and all information relating to
              the User in the possession of the Proprietor/Website to law
              enforcement or other government officials, as the Proprietor may
              in its sole discretion, believe necessary or appropriate in
              connection with the investigation and/or resolution of possible
              crimes, especially those involve personal injury and theft /
              infringement of intellectual property. The User further
              understands that the Proprietor/Website might be directed to
              disclose any information (including the identity of persons
              providing information or materials on the Website) as necessary to
              satisfy any judicial order, law, regulation or valid governmental
              request with or without prior intimation. The User expressly
              agrees and acknowledges that the Proprietor/Website has no
              obligation to monitor the materials posted on the Website, but it
              has the right to remove or edit any content that in its sole
              discretion violates, or is alleged to violate, any applicable law
              or either the spirit or letter of these Terms. Notwithstanding
              this right, the User remains solely responsible for the content of
              the materials posted on the Website by him/her. In no event shall
              the Proprietor/Website assume or be deemed to have any
              responsibility or liability for any content posted, or for any
              claims, damages or losses resulting from use of any such content
              and/or the appearance of any content on the Website. The User
              hereby represents and warrants that he/she has all necessary
              rights in and to all content provided as well as all information
              contained therein, and that such content does not infringe any
              proprietary or other rights of any third party(ies), nor does it
              contain any libelous, tortuous, or otherwise unlawful or offensive
              material, and the User hereby accepts full responsibility for any
              consequences that may arise due to the publishing of any such
              material on the Website.
            </p>

            <h6>12. INTELLECTUAL PROPERTY RIGHTS</h6>

            <p>
              All content included in our Services, such as text, brands
              graphics, logos, button icons, images, clips, digital downloads,
              data compilations, and software, is the property of the
              Proprietor, and its content suppliers and protected by copyright
              laws. All software used on this Website and Mobile App is the
              property of the Proprietor. Some of which that appears on this
              site not owned by Proprietor are the property of their respective
              owners, who may or may not be affiliated with, connected to, or
              sponsored by inmumbaiproperties.com or its affiliates. The access
              to the website does not confers any right or privilege to the User
              to use any of the marks in any manner or form and it is strictly
              prohibited unless and until prior consent been taken from
              Proprietor or owner of the intellectual property. Non-compliance
              of will lead to violation of the prevailing applicable Laws of
              India. Our website is committed to remove infringing products from
              its platform. To facilitate this, we have put in place a
              “Infringement Verification process” on our website so that
              intellectual property owners could easily report listings that
              infringe their rights. We always work to remove any infringing
              products as they would erode the Buyer and Seller trust. If you
              are a verified rights owner and want to report a listing issue,
              you may report{" "}
              <a className="text-black" href="mailto:info@kalsiestate.com">
                Info@kalsiestate.com
              </a>
            </p>
            <h6>13. GRIEVANCES</h6>
            <p>
              Any complaints, abuse or concerns with regards to content and or
              comment or breach of these terms shall be immediately informed to
              the Grievance Officer through email on the following email Id.
              <a className="text-black" href="mailto:info@kalsiestate.com">
                Info@kalsiestate.com
              </a>
              . Any grievance so received by the Proprietor shall be resolved
              within the best possible time.
            </p>
            <h6>14. DISPUTE RESOLUTION AND JURISDICTION</h6>

            <p>
              For the speedy disposal of any dispute related to the formation,
              interpretation and performance of these Terms and any disputes
              arising here from will be resolved through a two-step Alternate
              Dispute Resolution ("ADR") mechanism. It is agreed to by the
              Parties that the contents of this Section shall survive even after
              the termination or expiry of the Terms and/or Policy.
            </p>

            <p>
              a) Mediation: In case of any dispute between the parties, the
              Parties will attempt to resolve the same amicably amongst
              themselves, to the mutual satisfaction of both Parties. In the
              event that the Parties are unable to reach such an amicable
              solution within thirty (30) days of one Party communicating the
              existence of a dispute to the other Party, the dispute will be
              resolved by arbitration, as detailed herein below;
            </p>

            <p>
              b) Arbitration. In the event that the Parties are unable to
              amicably resolve a dispute by mediation, said dispute will be
              referred to arbitration by a sole arbitrator to be appointed by
              the Proprietor, and the award passed by such sole arbitrator will
              be valid and binding on both Parties. The Parties shall bear their
              own costs for the proceedings, although the sole arbitrator may,
              in his/her sole discretion, direct either Party to bear the entire
              cost of the proceedings. The arbitration shall be conducted in
              English, and the seat of Arbitration shall be the city of Mumbai
              in the state of Maharashtra, India.
            </p>

            <p>
              The Parties expressly agree that the Terms, Policy and any other
              agreements entered into between the Parties are governed by the
              laws, rules and regulations of India, and that the Courts at
              Mumbai shall have exclusive jurisdiction over any disputes arising
              between the Parties irrespective of the territory and jurisdiction
              of the user.
            </p>

            <h6>15. NOTICES </h6>
            <p>
              {" "}
              Any and all communication relating to any dispute or grievance
              experienced by the User may be communicated to the Proprietor by
              the User reducing the same to writing, and sending the same to the
              registered office of the Proprietor by Registered Post
              Acknowledgement Due / Speed Post Acknowledgement Due (RPAD / SPAD)
              or Email.
            </p>
            <h6>16. GOVERNING LAW</h6>

            <p>
              The Parties agree that all matters related to this Agreement shall
              be governed by the Laws of India each Party irrevocably consents
              to the exclusive jurisdiction of the state of Maharashtra with
              respect to any action brought in connection with this Agreement.
            </p>

            <h6>17. MISCELLANEOUS PROVISIONS</h6>
            <p>
              a) Entire Agreement: These Terms form the complete and final
              contract between the User and the Proprietor with respect to the
              subject matter hereof and supersedes all other communications,
              representations and agreements (whether oral, written or
              otherwise) relating thereto;
            </p>
            <p>
              b) Waiver: The failure of either Party at any time to require
              performance of any provision of these Terms shall in no manner
              affect such Party's right at a later time to enforce the same. No
              waiver by either Party of any breach of these Terms, whether by
              conduct or otherwise, in any one or more instances, shall be
              deemed to be or construed as a further or continuing waiver of any
              such breach, or a waiver of any other breach of these Terms.
            </p>
            <p>
              c) Severability: If any provision/clause of these Terms is held to
              be invalid, illegal or unenforceable by any court or authority of
              competent jurisdiction, the validity, legality and enforceability
              of the remaining provisions/clauses of these Terms shall in no way
              be affected or impaired thereby, and each such provision/clause of
              these Terms shall be valid and enforceable to the fullest extent
              permitted by law. In such case, these Terms shall be reformed to
              the minimum extent necessary to correct any invalidity, illegality
              or unenforceability, while preserving to the maximum extent the
              original rights, intentions and commercial expectations of the
              Parties hereto, as expressed herein.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionComponent;
