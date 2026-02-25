import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Card } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import NomineeModal from "../../components/Nominee-Modal";

const NominationList = () => {
  // const [openNomination,setOpenNomination] = useState(false)
  return (
    <>
      <NavBar />

      <NomineeModal toggle={true} />

      <div className="breadcum_area" style={{ backgroundColor: "#F2F4FB" }}>
        <div className="personal_form_container p-3">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container pt-5">
        <div className="personal_form_container pt-4">
          <h3 className="mb-4 text-dark fw-bolder">List of Nominee(s)</h3>
          <form className="bg-white px-5 py-4 rounded form_shadow">
            <Card className="d-flex align-items-center p-3 border-0 shadow-sm rounded-3">
              <div className="d-flex align-items-center w-100">
                {/* Profile Circle */}
                <div
                  className="rounded-circle  d-flex align-items-center justify-content-center text-white"
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "16px",
                    backgroundColor: "#6778fe",
                  }}
                >
                  NG
                </div>

                {/* Details */}
                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1 fw-bold">Nilima Kumar Gupta</h6>
                  <small className="text-muted text-secondary">
                    10 Feb 1991 • Spouse • Allocation: 50%
                  </small>
                </div>

                {/* Menu Icon */}
                <ThreeDotsVertical size={20} className="text-muted" />
              </div>
            </Card>
            <Card className="d-flex align-items-center p-3 border-0 shadow-sm rounded-3 mt-2">
              <div className="d-flex align-items-center w-100">
                {/* Profile Circle */}
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "16px",
                    backgroundColor: "#6778fe",
                  }}
                >
                  NG
                </div>

                {/* Details */}
                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1 fw-bold">Nilima Kumar Gupta</h6>
                  <small className="text-muted text-secondary">
                    10 Feb 1991 • Spouse • Allocation: 50%
                  </small>
                </div>

                {/* Menu Icon */}
                <ThreeDotsVertical size={20} className="text-muted" />
              </div>
            </Card>
            <Card className="d-flex align-items-center p-3 border-0 shadow-sm rounded-3 mt-2">
              <div className="d-flex align-items-center w-100">
                {/* Profile Circle */}
                <div
                  className="rounded-circle  d-flex align-items-center justify-content-center text-white"
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "16px",
                    backgroundColor: "#6778fe",
                  }}
                >
                  NG
                </div>

                {/* Details */}
                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1 fw-bold">Nilima Kumar Gupta</h6>
                  <small className="text-muted text-secondary">
                    10 Feb 1991 • Spouse • Allocation: 50%
                  </small>
                </div>

                {/* Menu Icon */}
                <ThreeDotsVertical size={20} className="text-muted" />
              </div>
            </Card>
            <Card className="d-flex align-items-center p-3 border-0 shadow-sm rounded-3 mt-2">
              <div className="d-flex align-items-center w-100">
                {/* Profile Circle */}
                <div
                  className="rounded-circle  d-flex align-items-center justify-content-center text-white"
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "16px",
                    backgroundColor: "#6778fe",
                  }}
                >
                  NG
                </div>

                {/* Details */}
                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1 fw-bold">Nilima Kumar Gupta</h6>
                  <small className="text-muted text-secondary">
                    10 Feb 1991 • Spouse • Allocation: 50%
                  </small>
                </div>

                {/* Menu Icon */}
                <ThreeDotsVertical size={20} className="text-muted" />
              </div>
            </Card>
              <div className="logoBlueColor mt-2 crPointer" >+ Add New</div>
            <div className="mt-4" >
              <span
                style={{
                  color: "#6778fe",
                }}
                className="fw-bold"
              >
                + Add Nominee
              </span>
            </div>
          </form>
        </div>
      </div>
      <NextBar  onSaveContinue={() => {}} />
    </>
  );
};

export default NominationList;
