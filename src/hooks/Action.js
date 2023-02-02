import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export const Action = (data) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(data);
  }, [data, dispatch]);
};
