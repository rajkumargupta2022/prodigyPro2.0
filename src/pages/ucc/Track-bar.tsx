import { Link, useLocation } from "react-router-dom";

import { ChevronRight } from "react-bootstrap-icons";
const steps = [
  { name: "Personal Details", path: "/personal-details" },
  { name: "Declarations", path: "/declaration" },
  { name: "Address", path: "/address-details" },
  { name: "Bank Details", path: "/bank-details-form" },
  { name: "Bank Mandate", path: "/mandate-amount" },
  { name: "Nominations", path: "/nomination-details" },
];


const TrackBar = () => {
  const location = useLocation();

  const currentIndex = steps.findIndex(
    (step) => step.path === location.pathname
  );
  return (
    <>

      <div
        className="breadcum_area"
        style={{ backgroundColor: "#E6E8FF" }}
      >
        <div className="personal_form_container p-2">
          <div className="d-flex align-items-center flex-wrap my-2">
            {steps.map((step, index) => {
              const isCompletedOrActive = index <= currentIndex;

              return (
                <div key={index} className="d-flex align-items-center">
                  <Link
                    to={step.path}
                    className={`text-decoration-none fw-500 ${isCompletedOrActive
                      ? "logoBlueColor"
                      : "text-dark"
                      }`}
                  >
                    {step.name}
                  </Link>

                  {index !== steps.length - 1 && (
                    <ChevronRight
                      className="mx-2"
                      size={14}
                      color={
                        "#6c757d"
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </>
  );
};

export default TrackBar;
