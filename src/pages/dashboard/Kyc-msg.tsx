import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { kycUpdateRes } from '../data-interfaces/ucc';

const KycMsg = ({ uccStatusData }: { uccStatusData: kycUpdateRes | null }) => {
  const navigate = useNavigate()
  return (
    <Card border="light" className="my-3 kycWarningColor">
      <Card.Body>
        <div className="row">
          <div className="col d-flex">
            <h6 className="fw-semibold">Investor Account Is Not Active </h6>
          </div>
          <p className="fs14px" >{uccStatusData?.description ?? ""}</p>
        </div>{
          uccStatusData?.actionUrl ?
            <button type="button" onClick={() => window.open(uccStatusData.actionUrl, "_blank")} className="btn contactSupportButton">{uccStatusData?.actinText ?? ""}</button>
            :
            <button type="button" onClick={() => navigate("/help-and-support")} className="btn contactSupportButton">Contact Support</button>
        }
      </Card.Body>
    </Card>
  )
}
export default KycMsg