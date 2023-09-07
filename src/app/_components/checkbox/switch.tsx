"use client";

import React, { InputHTMLAttributes } from "react";

interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "label"> {
  label: React.ReactNode;
}

export const Switch: React.FunctionComponent<SwitchProps> = ({
  id,
  label,
  ...props
}) => {
  return (
    <div className="inline-flex">
      <input {...props} type="checkbox" id={id} className="hidden peer" />
      <label htmlFor={id} className={`p-1 px-3 rounded-full bg-gray-800`}>
        {label}
      </label>
    </div>
  );
};
