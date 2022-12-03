import axios from "axios";

import { ApiError, ApiResponse, Repo, ReposResponse } from "../types";
import { apiConfig } from "./apiConfig";
import { API_ROUTES } from "./apiRoutes";
import { handleError, handleResponse } from "./apiUtils";

export const getRepos = async (
  userName: string
): Promise<ApiResponse<Repo[]>> => {
  try {
    const res = (await axios.get(
      API_ROUTES.REPOS(userName),
      apiConfig
    )) as ReposResponse;

    return handleResponse(res.data);
  } catch (error) {
    return handleError(error as ApiError);
  }
};
