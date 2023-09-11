import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";

interface InputProps {
  icon?: string;
  disabled?: boolean;
  label: string;
  filedName?: string;
  change?: any;
  value?: string | number;
  place?: any;
  blur?: any;
  error?: string;
  name?: string;
  touched?: boolean;
  required?: boolean;
  type: string;
  click?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const InputField = ({
  type,
  click,
  icon,
  disabled,
  label,
  filedName,
  change,
  value,
  place,
  blur,
  error,
  required,
  touched,
  name,
  ...rest
}: InputProps) => {
  const [passwordMode, setPasswordMode] = useState("password");
  const [errorMsg, setErrorMsg] = useState("");
  const [filedValue, setFieldValue] = useState("");
  const inputRef = useRef(null);

  function onChangeHandler(e: any) {
    e.preventDefault();
    const {
      target: { value },
    } = e;

    setFieldValue(value);
  }

  function togglePasswordMode() {
    if (passwordMode === "text") {
      setPasswordMode("password");
    } else {
      setPasswordMode("text");
    }
  }

  function typeHandler(type: string) {
    if (type === "password") {
      return passwordMode;
    } else {
      return type;
    }
  }

  if (type == "textarea") {
    return (
      <div className="">
        <div onClick={click} className={`custom-input ${!true && "full"} `}>
          <textarea
          name={name}            ref={inputRef}
            disabled={disabled}
            value={value || filedValue}
            onChange={(e) => change(e, name) || onChangeHandler}
            onBlur={blur}
            className={`textarea ${
              filedValue.length > 0 || (String(value).length > 0 && "active")
            } ${touched && error && "error"}`}
            {...rest}
          />

          <label
            className="absolute body-sm text-txt-subdued-alt"
            htmlFor={label}
          >
            {label}
          </label>
        </div>

        {touched && error && (
          <div className="error text-txt-critical middle mt-2">
            <Image width={20} height={20} src={"/icons/error.svg"} alt="" />
            <h1 className="error-text ml-2 text-xs text-red-400">
              {error || `Please enter your ${label.toLowerCase()}`}
            </h1>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="">
      <div onClick={click} className={`custom_input relative`}>
        {type == "password" && (
          <div
            role={"button"}
            onClick={() => togglePasswordMode()}
            className="icon absolute  right-3 bottom-3"
          >
            {passwordMode === "password" ? (
              <Image
                width={20}
                height={20}
                src={"/icons/eye-open.svg"}
                alt=""
              />
            ) : (
              <Image
                width={20}
                height={20}
                src={"/icons/eye-close.svg"}
                alt=""
              />
            )}
          </div>
        )}

        <label className="text-red-400" htmlFor={label}>
          {label} {required && "*"}
        </label>

        <input
          ref={inputRef}
          name={name} 
          type={typeHandler(type)}
          value={value || filedValue}
          onChange={(e) => change(e, filedName) || onChangeHandler}

          onBlur={blur}
          className={``}
          {...rest}
          disabled={disabled}
		  placeholder={place}
        />
      </div>

      {touched && error && (
        <div className="error text-txt-critical middle mt-2">
          <Image width={20} height={20} src={"/icons/error.svg"} alt="" />
          <h1 className="error-text ml-2  text-sm  text-red-400">
            {error || `Please enter your ${label.toLowerCase()}`}
          </h1>
        </div>
      )}
    </div>
  );
};

export default InputField;
