import { useState } from "react";
import cn from "classnames";

import { getRepos } from "../api/getRepos";
import { Repos, User } from "../types";
import { texts } from "../texts";

interface UserReposProps {
  user: User;
  repos: Repos;
  setRepos: React.Dispatch<React.SetStateAction<Repos>>;
}

export const UserRepos = ({ user, repos, setRepos }: UserReposProps) => {
  const [showRepos, setShowRepos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFetchRepos = async () => {
    setShowRepos((prevState) => !prevState);

    if (Array.isArray(repos[user.login])) {
      return;
    }

    setIsLoading(true);
    setIsError(false);

    const fetchedRepos = await getRepos(user.login);

    setIsLoading(false);

    if (!fetchedRepos) {
      setIsError(true);
      return;
    }

    setRepos((prevRepos: Repos) => {
      return { ...prevRepos, [user.login]: fetchedRepos };
    });
  };

  const isMoreThanOneRepo = repos[user.login] && repos[user.login].length > 0;

  return (
    <>
      <button
        key={user.login}
        className="bg-slate-100 hover:bg-slate-200 p-3 flex justify-between items-stretch"
        onClick={handleFetchRepos}
      >
        <div> {user.login}</div>
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
          {isLoading && <>{texts.general.loading}</>}
          {isError && <>{texts.general.error}</>}
          {!isMoreThanOneRepo && !isLoading && !isError && (
            <>{texts.userRepos.noRepos}</>
          )}
          {isMoreThanOneRepo &&
            repos[user.login].map((repo) => (
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
