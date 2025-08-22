import MyNavbar from "./Navbar"
import rislBg from "../assets/img/bg-image/risk-profile.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



const RiskProfile = () => {
  const navigate = useNavigate()
  const profileQuestion: string[]  =["I seek above average returns from my investments","I’m patient with my investments & can bear short term volatility in my portfolio","I have a regular & stable source of income","My outstanding debt/loan is low or that has been provisioned for" ]
  const [question,setQuestion] =useState<number>(0)
  const [option,setOption] =useState<number>(0)
  const [option1,setOption1] =useState<string>("")
  const [option2,setOption2] =useState<string>("")
  const [option3,setOption3] =useState<string>("")

  const nextQuestion = ()=>{
     if(question<3){
       setQuestion(question+1)
       setOption1("")
       setOption2("")
       setOption3("")
     }else{
      if(question===3){
         navigate("/risk-result")
      }
     
     }
  }

  const selectOption = (selectedValue:number)=>{
      nextQuestion()
      if(selectedValue===1){
        setOption1("selectedOption")
        setOption2("")
        setOption3("")
       }else if(selectedValue===2){
         setOption1("")
         setOption2("selectedOption")
         setOption3("")
        }
        else if(selectedValue===3){
          setOption1("")
          setOption2("")
          setOption3("selectedOption")
        }
        
        setOption(option+selectedValue)
  }


  return (
    <>
      <MyNavbar />
      <div className="container px-4 mt-4">
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-sm-12">
            <h5>Know Your Risk Profile</h5>
          </div>
          <div className="col-lg-8 col-sm-12 bg-light rounded-3 mt-3" style={{ backgroundImage: `url(${rislBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="row justify-content-md-center my-4">
              <div className="col-lg-8 col-sm-12">
                <div className="row mb-4">
                  <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: "100%" }}></div>
                  </div> <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: `${question===1 && "100%"}` }}></div>
                  </div> <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: `${question===2 && "100%"}` }}></div>
                  </div> <div className="progress col px-0 mx-1 my-2 progressBg" role="progressbar" style={{ height: "4px" }} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-white" style={{ width: `${question===3 && "100%"}` }}></div>
                  </div>
                </div>
                <h4 className="text-white mt-5">{profileQuestion[question]}</h4>
                <div className=" py-5 d-grid gap-2 ">
                  <button className={`btn btn-light border-0 bgOption 100vh ${option3}`} onClick={()=>selectOption(3)}>Agree ✅</button>
                  <button className={`btn btn-light border-0 bgOption 100vh ${option2}`}onClick={()=>selectOption(2)}>Somewhat Agree 🤔</button>
                  <button className={`btn btn-light border-0 bgOption 100vh ${option1}`}onClick={()=>selectOption(1)}>Disagree ❌</button>
                </div>   
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default RiskProfile