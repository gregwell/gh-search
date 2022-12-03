import axios from "axios";

import { ApiError, ApiResponse, User, UserResponse } from "../types";
import { apiConfig } from "./apiConfig";
import { API_ROUTES } from "./apiRoutes";
import { handleError, handleResponse } from "./apiUtils";

export const getUsers = async (
  searchString: String
): Promise<ApiResponse<User[]>> => {
  try {
    const config = {
      ...apiConfig,
      params: {
        q: searchString,
        per_page: 5,
      },
    };

    const res = (await axios.get(API_ROUTES.USERS, config)) as UserResponse;

    return handleResponse(res.data.items);
  } catch (error) {
    return handleError(error as ApiError);
  }
};
