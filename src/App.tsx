import { Form, Formik, Field } from "formik";
import { useState } from "react";

import { getUsers } from "./api/getUsers";
import { Button } from "./components/Button";
import { UserFormValues, User } from "./types";
import { UserRepos } from "./components/UserRepos/UserRepos";
import { TEXTS } from "./texts";
import { Text } from "./components/Text";

const App = () => {
  const [users, setUsers] = useState([] as User[]);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (values: UserFormValues) => {
    setError("");
    setIsLoading(true);

    setSearchString(values.query);
    const fetchedUsers = await getUsers(values.query);

    console.log(fetchedUsers);

    setIsLoading(false);

    if (!fetchedUsers.ok) {
      setError(fetchedUsers.error);
      setUsers([] as User[]);
      return;
    }
    setUsers(fetchedUsers.data);
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
                    setError("");
                  }}
                  name="query"
                  placeholder={TEXTS.APP.INPUT_PLACEHOLDER}
                  className="w-full bg-slate-100 border border-slate-100 p-4"
                />
                <Button
                  disabled={
                    (isSubmitting ||
                      values.query === searchString ||
                      values.query === "") &&
                    !error
                  }
                >
                  {TEXTS.APP.SEARCH}
                </Button>
              </Form>
            );
          }}
        </Formik>
        {isLoading && <Text>{TEXTS.GENERAL.LOADING}</Text>}
        {error && <Text>{error}</Text>}
        {!isLoading && users && users.length > 0 && (
          <Text>{TEXTS.APP.SHOWING_USERS(searchString)}</Text>
        )}
        {users && (
          <div className="flex flex-col gap-2">
            {users.map((user) => (
              <UserRepos key={user.id} userLogin={user.login} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
