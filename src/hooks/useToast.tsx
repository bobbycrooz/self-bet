import React from 'react';
import { ToastOptions, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const useToast = () =>
{
	const notify = (type:string, message: string) =>
	{
		let toastConfig = {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light'
            };
            
		if (type === 'error')
		{
			toast.error(message, toastConfig as ToastOptions<{}>);
		} else if (type === 'success')
		{
			toast.success(message, toastConfig as ToastOptions<{}>);
		} else if (type === 'warn')
		{
			toast.warn(message, toastConfig as ToastOptions<{}>);
		} else
		{
			toast(message, toastConfig as ToastOptions<{}>);
		}
	};

	return { notify };
};

export default useToast;
