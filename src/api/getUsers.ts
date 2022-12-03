import axios from "axios";

import { ApiResponse, User } from "../types";
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

    const res = await axios.get(API_ROUTES.USERS, config);

    console.log(res.data.items);

    return handleResponse(res.data.items);
  } catch (error: any) {
    return handleError(error);
  }
};
