import React, { useCallback, useMemo } from "react";
import { Accept, useDropzone } from "react-dropzone";
// import { uploadImage } from '../../../src/axios/apis/media';
import { SvgElement, UploadSvg } from "@/assets";

const baseStyle = {};

const activeStyle = {
	borderColor: "#2196f3",
};

const acceptStyle = {
	borderColor: "#00e676",
};

const rejectStyle = {
	borderColor: "#ff1744",
};

function DropzoneComponent({ seCurrentFile }: { seCurrentFile: any }) {
	// @ts-ignore
	const onDrop = useCallback(async (acceptedFiles) => {
		return seCurrentFile(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		onDrop,
		accept: "image/jpeg, image/png" as unknown as Accept,
	});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),

		[isDragActive, isDragReject, isDragAccept]
	);

	return (
		// @ts-ignore
		<div {...getRootProps({ style })}>
			<input {...getInputProps()} />
			<div className="">
				<div className="border border-gray-200 text-gray-400 col-center  px-6 p-4 rounded-lg mt-4">
					<UploadSvg />

					<h1 className="txt-sm w-full text-center mt-3">
						<span className="text-sec f-s">Click to upload </span> or drag and drop
					</h1>
					<h1 className="txt-sm w-full text-center mt-2">PNG, JPG or GIF (max. 800x400px)</h1>
				</div>
			</div>
		</div>
	);
}

export default DropzoneComponent;
