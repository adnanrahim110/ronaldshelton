import React from "react";

const TextField = ({ formData, field, errors, onChange }) => {
  return (
    <>
      <label htmlFor={field.name} className="mb-1 block">
        {field.label}{" "}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <span className="block">
        <input
          type={field.type}
          value={formData[field.name]}
          name={field.name}
          onChange={onChange}
          placeholder={field.placeholder}
          className="bg-white border border-gray-200 rounded-sm py-1.5 px-2.5 w-full outline-0 focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]"
        />
      </span>
      {errors[field.name] && (
        <small className={`text-red-500 pl-2.5 text-xs font-medium`}>
          {errors[field.name]}
        </small>
      )}
    </>
  );
};

export default TextField;
