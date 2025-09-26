
import capitalGain from "../assets/img/capital-gain.png"
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { fetchAdminUser } from "../services/user/adminUser";
import { postRequest } from "../services/Api/HandleApi";
import { capitalGainRes } from "../pages/data-interfaces/reports";
import { endPoints } from "../services/utils/urls";
import { errorToast, successToast } from "../services/utils/toast";


const CapitalGain = () => {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [yearList, setYearList] = useState<string[]>([])



  const getEmailStatement = async () => {
    if (!selectedDate) {
      errorToast("Financial year required")
      return
    }
    try {
      const adminUser = fetchAdminUser()
      const reqBody = {
        ucc: adminUser?.ucc,
        from: Number(selectedDate?.split("-")[0]),
        to: Number(selectedDate?.split("-")[1])
      }
      const res = await postRequest<capitalGainRes>(endPoints.requestCapitalGainsStatement, reqBody)

      if (res.success) {
        successToast(res.msg)
      }
    } catch (err) {
      errorToast(err)
    }
  }

  useEffect(() => {
    fetchYearList()
  }, [])

  const fetchYearList = (startYear: number = 2000): void => {
    const today = new Date();
    let currentYear = today.getFullYear();
    if (today.getMonth() < 3) {
      currentYear -= 1;
    }

    const years: string[] = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(`${year}-${year + 1}`);
    }
    const reversed = years.reverse();
    setYearList(reversed);
    setSelectedDate(reversed[0])
  };

  const yearHandler = (e: any) => {
    setSelectedDate(e.target.value)

  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="">
            <Form.Select aria-label="Default select example" className="selectBoxBg" value={selectedDate} onChange={yearHandler} >
              {yearList.map((item) => {
                <option value={""}>Select year</option>
                return <option value={item}>FY-{item}</option>
              })}

            </Form.Select>
          </div>
        </div>

      </div>
      <div className="container px-4" >
        <div className="row">
          <div className="col-md-12 col-sm-12 ">
            <div className="row  justify-content-center mb-3">
              <div className="col-lg-6 col-md-12 col-sm-12 ">
                <div className="d-flex justify-content-center">
                  <img src={capitalGain} alt="" height={240} />
                </div>
                {/* {title?  <h5 className="text-center">{title}</h5>:""}   */}
                <p className="fs16px mt-1 text-center">Please select the financial year from the dropdown above to get capital gain statement on email.</p>

                <button type="button" className="customButton px-4 mx-auto d-block" onClick={getEmailStatement}>Email Statement</button>
              </div>
            </div>
          </div>


        </div>
      </div>


    </>
  );
};

export default CapitalGain;
