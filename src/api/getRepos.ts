import axios from "axios";
import { Repo } from "../types";
import { apiConfig } from "./apiConfig";

export const getRepos = async (
  userName: String
): Promise<Repo[] | undefined> => {
  try {
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos`,
      apiConfig
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
