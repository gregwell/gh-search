import axios from "axios";
import { User } from "../types";
import { apiConfig } from "./apiConfig";

export const getUsers = async (
  searchString: String
): Promise<User[] | undefined> => {
  try {
    const config = {
      ...apiConfig,
      params: {
        q: searchString,
        per_page: 5,
      },
    };

    const res = await axios.get(`https://api.github.com/search/users`, config);

    return res.data.items;
  } catch (error) {
    console.log(error);
  }
};
