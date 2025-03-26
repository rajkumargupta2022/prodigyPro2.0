import {  toast } from 'react-toastify';

export const successToat = ()=>{
  toast.success("wow so easy",{position: "bottom-right",theme: "dark",hideProgressBar: true,closeOnClick: true,autoClose: 4000, customProgressBar: true})
  // toast.error("error msg",{position: "bottom-right",theme: "dark",hideProgressBar: true,closeOnClick: true,autoClose: 4000,})
}
// const bounce = cssTransition({
//   enter: "animate__animated animate__bounceIn",
//   exit: "animate__animated animate__bounceOut"
// });