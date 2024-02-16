export const useErrorHandler: () => {
  errorHandler: (error: any) => string;
} = () => {
  function errorHandler(err: any) {
    try {
      let errorMessage = null;

      if (err.response) {
        if (
          (err.response.status === 422 ||
            err.response.status === 400 ||
            err.response.status === 401) &&
          ((err.response.data?.errors &&
            err.response.data?.errors.length > 0) ||
            (typeof err.response.data === "string" &&
              err.response.data?.length))
        ) {
          errorMessage =
            err.response.data?.message ??
            err.response.data?.errors?.[0]?.message ??
            err.response?.data ??
            err.response?.message ??
            err.response?.statusText;
          return errorMessage;
        } else {
          errorMessage =
            err.response.data?.message ??
            err.response.message ??
            err.response.statusText;
          return err.response.data?.message;
        }
      } else if (err.request) {
        errorMessage = "Something went wrong!";
        return "Something went wrong!";
      } else {
        errorMessage = err.message;
        return err.message;
      }
    } catch (err: any) {
      if (err?.code) return err.code;

      return "Please try again!";
    }
  }

  return {
    errorHandler,
  };
};
