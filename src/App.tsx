import { Form, Formik, Field } from "formik";
import { useState } from "react";

import { getUsers } from "./api/getUsers";
import { Button } from "./components/Button";
import { UserFormValues, Repos, User } from "./types";
import { UserRepos } from "./components/UserRepos";
import { getShowingUsersText, texts } from "./texts";
import { Text } from "./components/Text";

const App = () => {
  const [users, setUsers] = useState([] as User[]);
  const [repos, setRepos] = useState({} as Repos);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (values: UserFormValues) => {
    setIsError(false);
    setIsLoading(true);

    setSearchString(values.query);
    const fetchedUsers = await getUsers(values.query);

    setIsLoading(false);

    if (!fetchedUsers) {
      setIsError(true);
      setUsers([] as User[]);
      return;
    }
    setUsers(fetchedUsers);
  };

  return (
    <div className="flex justify-center">
      <div className="sm:mt-10 p-4 w-full max-w-[800px]">
        <Formik initialValues={{ query: "" }} onSubmit={handleSearch}>
          {({ isSubmitting, values, handleChange }) => {
            return (
              <Form className="flex flex-col gap-4">
                <Field
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    setIsError(false);
                  }}
                  name="query"
                  placeholder={texts.app.inputPlaceHolder}
                  className="w-full bg-slate-100 border border-slate-100 p-4"
                />
                <Button
                  disabled={
                    (isSubmitting ||
                      values.query === searchString ||
                      values.query === "") &&
                    !isError
                  }
                >
                  {texts.app.searchButton}
                </Button>
              </Form>
            );
          }}
        </Formik>
        {isLoading && <Text>{texts.general.loading}</Text>}
        {isError && <Text>{texts.general.error}</Text>}
        {!isLoading && users && users.length > 0 && (
          <Text>{getShowingUsersText(searchString)}</Text>
        )}
        {users && (
          <div className="flex flex-col gap-2">
            {users.map((user) => (
              <UserRepos
                key={user.id}
                user={user}
                repos={repos}
                setRepos={setRepos}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
