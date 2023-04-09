import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";

interface InputProps {
  icon?: string;
  disabled?: boolean;
  text: string;
  full?: boolean
  isLoading?: boolean;
  primary?: boolean;
  ghost?: boolean;
  type: "button" | "submit" | "reset" | undefined;
  click?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({
  type,
  click,
  icon,
  disabled,
  text,
  isLoading,
  full,
  primary,
  ghost,
  ...rest
}: InputProps) => {
 

  return (
    <button
      disabled={disabled || isLoading}
      onClick={click}
      {...rest}
      type={type}
      className={`btn ${full && "w-full"} ${primary && "primary"} ${ghost && "ghost"} `}
    >
      {isLoading && (
        <div className="loader-body">
          <div className="loader-body-roller"></div>
        </div>
      )}

      {icon && (
        <div className="icon">
          <Image width={19.5} height={16.5} src={icon} alt="" />
        </div>
      )}

      {/* <div className="w-2"></div> */}

      {!isLoading && <p className={`capitalize`}>{text}</p>}
    </button>
  );
};

export default Button;
