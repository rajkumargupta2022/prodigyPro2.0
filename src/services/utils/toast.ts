import { toast } from "react-toastify";

export const successToast = (res: any) => {
  toast.dismiss();
   if (typeof res == "string") {
    return toast.success(res, {
      position: "bottom-right",
      theme: "dark",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  }
  toast.success(res.msg || res.message, {
    position: "bottom-right",
    theme: "dark",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    className: "custom-toast custom-toast-text",
  });
};

export const errorToast = (msg: any) => {
  toast.dismiss();

  if (typeof msg == "string") {
    return toast.error(msg, {
      position: "bottom-right",
      theme: "dark",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  }

  toast.error(msg.response?.data?.msg || msg.response?.data?.error || msg.response?.data?.message, {
    position: "bottom-right",
    theme: "dark",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
  });
};
// const bounce = cssTransition({
//   enter: "animate__animated animate__bounceIn",
//   exit: "animate__animated animate__bounceOut"
// });
