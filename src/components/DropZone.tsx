import React, { useCallback, useMemo } from "react";
import { Accept, useDropzone } from "react-dropzone";
// import { uploadImage } from '../../../src/axios/apis/media';
import { SvgElement, UploadSvg } from "@/assets";
import useToast from "@/hooks/useToast";

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

const roundTo2SigFigs = (number: number) => {
	const decimalPlaces = 2;
	const precision = 10 ** decimalPlaces;
	const roundedNumber = Math.round(number * precision) / precision;
	return roundedNumber;
};

function bytesToMB(bytes: number) {
	const MB = 1048576;
	return roundTo2SigFigs(bytes / MB);
}

function sizeValidation(file: any) {
	const fileSizeInBytes = file.size;

	const maxSize = 2.0;

	console.log(bytesToMB(fileSizeInBytes), "size in bytes");

	if (bytesToMB(fileSizeInBytes) > maxSize) {
		return {
			code: "size-too-large",
			message: `Image size is larger than ${maxSize} MB`,
		};
	}
	return null;
}

function DropzoneComponent({ seCurrentFile }: { seCurrentFile: any }) {
	const [files, setfiles] = React.useState<Array<any>>();
	const { notify } = useToast();

	// @ts-ignore
	const onDrop = useCallback(async (acceptedFiles) => {
		setfiles(acceptedFiles);
		return seCurrentFile(acceptedFiles);
	}, [seCurrentFile]);

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, fileRejections } =
		useDropzone({
			onDrop,
			// accept: "image/jpeg, image/png" as unknown as Accept,
			accept: {
				"image/*": [".jpeg", ".png", ".gif"],
			},
			validator: sizeValidation,
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


	const onError = useCallback( () => {
		if (fileRejections.length > 0) {
			notify("error", fileRejections[0].errors[0].message);
		}
	}, [fileRejections, notify]);

	onError()

	return (
		<>
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

			<div className="files mt-2">
				{acceptedFiles?.map((i: any, k: any) => (
					<div key={k} className="file_item text-xs font-light">
						<p className="fileNme">
							{i.name} <span className="text-green-500">uploaded</span>
						</p>

						<p className="font-me">
							size: ({bytesToMB(i.size)} MB)
						</p>

						
					</div>
				))}
			</div>
		</>
	);
}

export default DropzoneComponent;
