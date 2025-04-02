import { toast } from "react-toastify";

export const successToast = (res: any) => {
  toast.dismiss();
  toast.success(res.data?.msg || "Success..", {
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
  toast.error(msg.response?.data?.msg, {
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
