import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleFormInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    values,
    handleFormInputChange,
    handleFormSubmit,
  };
};
