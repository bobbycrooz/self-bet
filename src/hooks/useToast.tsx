import React from 'react';
import toast from 'react-hot-toast';
// import 'react-hot-toast/dist/ReactToastify.css';

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
			toast.error(message);
		} else if (type === 'success')
		{
			toast.success(message);
		} else if (type === 'warn')
		{
			toast(message);
		} else
		{
			toast(message);
		}
	};

	return { notify };
};

export default useToast;
