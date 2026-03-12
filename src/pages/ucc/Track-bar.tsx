import { Link, useLocation, useSearchParams } from "react-router-dom";

import { ChevronRight } from "react-bootstrap-icons";
import {  uccDataResKeys } from "../data-interfaces/ucc";

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
  const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  const pan = searchParams.get("pan") ?? "";
  const holder = searchParams.get("holder") as keyof uccDataResKeys;

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
                    to={step.path+`?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`}
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
