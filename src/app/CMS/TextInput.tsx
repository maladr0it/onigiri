import React from "react";
import styled from "styled-components";
import { useField } from "formik";

interface Props {
  label: string;
  name: string;
}

export const TextInput: React.FC<Props> = ({ label, name }) => {
  const [field, meta] = useField({ name });

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input id={name} type="text" {...field} />
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </>
  );
};
