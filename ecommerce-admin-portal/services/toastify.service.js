import {toast} from "react-toastify";
const toasterConfig ={
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}

export const ToastifySuccess=(message)=>{
    toast.success(message,toasterConfig);
}

export const ToastifyWarning=(message)=>{
    toast.warning(message,toasterConfig);
}

export const ToastifyError=(message)=>{
    toast.error(message,toasterConfig);
}