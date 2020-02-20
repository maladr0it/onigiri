import React from "react";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import { useFormik } from "formik";

interface RouteParams {
  id: string;
}

interface Props {}

export const EditMenuForm: React.FC<Props> = () => {
  const match = useRouteMatch<RouteParams>();

  const id = match.params.id;

  return <h1>hey menu {id} </h1>;
};
