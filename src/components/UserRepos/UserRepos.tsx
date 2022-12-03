import { useState } from "react";
import cn from "classnames";

import { getRepos } from "../../api/getRepos";
import { Repos } from "../../types";
import { texts } from "../../texts";

interface UserReposProps {
  userLogin: string;
  repos: Repos;
  setRepos: React.Dispatch<React.SetStateAction<Repos>>;
}

export const UserRepos = ({ userLogin, repos, setRepos }: UserReposProps) => {
  const [showRepos, setShowRepos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFetchRepos = async () => {
    setShowRepos((prevState) => !prevState);

    if (Array.isArray(repos[userLogin])) {
      return;
    }

    setIsLoading(true);
    setIsError(false);

    const fetchedRepos = await getRepos(userLogin);

    setIsLoading(false);

    if (!fetchedRepos) {
      setIsError(true);
      return;
    }

    setRepos((prevRepos: Repos) => {
      console.log({ ...prevRepos, [userLogin]: fetchedRepos });
      return { ...prevRepos, [userLogin]: fetchedRepos };
    });
  };

  const isMoreThanOneRepo = repos[userLogin] && repos[userLogin].length > 0;

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
          {isLoading && <>{texts.general.loading}</>}
          {isError && <>{texts.general.error}</>}
          {!isMoreThanOneRepo && !isLoading && !isError && (
            <>{texts.userRepos.noRepos}</>
          )}
          {isMoreThanOneRepo &&
            repos[userLogin].map((repo) => (
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
