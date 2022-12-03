import { TEXTS } from "../texts";
import { ApiError, ApiResponse } from "../types";

const getErrorName = (errorName: string) => {
  if (errorName === "Network Error") {
    return TEXTS.GENERAL.NETWORK_ERROR;
  }
  return TEXTS.GENERAL.ERROR;
};

export const handleResponse = <T>(res: T): ApiResponse<T> => {
  return {
    ok: true,
    data: res,
    error: "",
  };
};

export const handleError = (error: ApiError) => {
  return {
    ok: false,
    data: [],
    error: getErrorName(error.message),
  };
};
