import { useState } from "react";
import cn from "classnames";

import { getRepos } from "../../api/getRepos";
import { Repo } from "../../types";
import { TEXTS } from "../../texts";

interface UserReposProps {
  userLogin: string;
}

export const UserRepos = ({ userLogin }: UserReposProps) => {
  const [repos, setRepos] = useState([] as Repo[]);
  const [showRepos, setShowRepos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchRepos = async () => {
    setShowRepos((prevState) => !prevState);

    if (repos.length > 0) {
      return;
    }

    setIsLoading(true);
    setError("");

    const fetchedRepos = await getRepos(userLogin);

    setIsLoading(false);

    if (!fetchedRepos.ok) {
      setError(fetchedRepos.error);
      return;
    }

    setRepos(fetchedRepos.data);
  };

  return (
    <>
      <button
        key={userLogin}
        className="bg-slate-100 hover:bg-slate-200 p-3 flex justify-between items-stretch"
        onClick={handleFetchRepos}
      >
        <div> {userLogin}</div>
        <div className="flex items-center justify-center">
          <img
            src="/arrow-down.png"
            alt=""
            className={cn("w-4", {
              "rotate-180": showRepos,
            })}
          />
        </div>
      </button>
      {showRepos && (
        <>
          {isLoading && <>{TEXTS.GENERAL.LOADING}</>}
          {error && <>{TEXTS.GENERAL.ERROR}</>}
          {repos.length < 1 && !isLoading && !error && (
            <>{TEXTS.USER_REPOS.NO_REPOS}</>
          )}
          {repos.length > 0 &&
            repos.map((repo) => (
              <div
                key={repo.id}
                className="flex py-3 px-2 ml-6 flex-col gap-1 bg-slate-300 min-h-[100px]"
              >
                <div className="flex justify-between">
                  <div className="font-bold">{repo.name}</div>
                  <div className="flex gap-2">
                    {repo.stargazers_count}
                    <img src="/star.svg" alt="" className="w-4" />
                  </div>
                </div>
                <div>{repo.description}</div>
              </div>
            ))}
        </>
      )}
    </>
  );
};
