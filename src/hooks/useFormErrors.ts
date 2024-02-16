import React, { useState } from "react";
import { useErrorHandler } from "./useErrorHandler";

const useFormErrors = () => {
  const { errorHandler } = useErrorHandler();
  const [mainError, setMainError] = useState("");
  const [formErrors, setFormErrors] = useState<any>([]);

  const handleFormErrors = (fieldname: string): string => {
    const errors = formErrors.errors.filter(
      (error: any) => error.path === fieldname
    );

    if (errors && errors.length > 0) {
      return errors[0].msg;
    }

    return "";
  };

  return {
    formErrors,
    setFormErrors,
    handleFormErrors,
    errorHandler,
    mainError,
    setMainError,
  };
};

export default useFormErrors;
