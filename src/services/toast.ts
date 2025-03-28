import {  toast } from 'react-toastify';

export const successToast = (res:any)=>{
  toast.success(res.data.msg,{position: "bottom-right",theme: "dark",hideProgressBar: true,closeOnClick: true, customProgressBar: true})
}

export const errorToast = (msg:any)=>{
  toast.error(msg.response.data.msg,{position: "bottom-right",theme: "dark",hideProgressBar: true,closeOnClick: true, customProgressBar: true})
}
// const bounce = cssTransition({
//   enter: "animate__animated animate__bounceIn",
//   exit: "animate__animated animate__bounceOut"
// });