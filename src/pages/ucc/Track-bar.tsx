import {  useLocation, useSearchParams } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";
import { taxStatus } from "../data/ucc-data";

const steps = [
  { name: "Personal Details", path: "/personal-details" },
  { name: "Declarations", path: "/declaration" },
  { name: "Address", path: "/address-details" },
  { name: "Bank Details", path: "/bank-details-form" },
  { name: "Bank Mandate", path: "/mandate-amount" },
  { name: "Nominations", path: "/nomination-details" },
  { name: "Nominee List", path: "/nomination-list" },
];

const TrackBar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const tax_status = searchParams.get("tax_status") ?? "";

  // 👉 Filter steps if tax_status === "2"
  const filteredSteps =
    tax_status === taxStatus.ON_BEHALF_OF_MINOR
      ? steps.filter(
          (step) =>
            step.path !== "/nomination-details" &&
            step.path !== "/nomination-list"
        )
      : steps;

  // 👉 Use filteredSteps for correct index calculation
  const currentIndex = filteredSteps.findIndex(
    (step) => step.path === location.pathname
  );

  return (
    <div className="breadcum_area" style={{ backgroundColor: "#E6E8FF" }}>
      <div className="personal_form_container p-2">
        <div className="d-flex align-items-center flex-wrap my-2">
          {filteredSteps.map((step, index) => {
            const isCompletedOrActive = index <= currentIndex;

            return (
              <div key={index} className="d-flex align-items-center">
                <div
                 
                  className={`text-decoration-none fw-500 crPointer ${
                    isCompletedOrActive ? "logoBlueColor" : "text-dark"
                  }`}
                >
                  {step.name}
                </div>

                {index !== filteredSteps.length - 1 && (
                  <ChevronRight
                    className="mx-2"
                    size={14}
                    color={"#6c757d"}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackBar;