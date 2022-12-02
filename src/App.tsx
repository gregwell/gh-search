import { Form, Formik, Field } from "formik";
import { useState } from "react";

import { getUsers } from "./api/getUsers";
import { Button } from "./components/Button";
import { UserFormValues, Repos, User } from "./types";
import { UserRepos } from "./components/UserRepos";

const App = () => {
  const [users, setUsers] = useState([] as User[]);
  const [repos, setRepos] = useState({} as Repos);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (values: UserFormValues) => {
    setError("");
    setIsLoading(true);

    setSearchString(values.q);
    const users = await getUsers(values.q);

    setIsLoading(false);

    if (users === undefined) {
      setError("General error occured. Try again later.");
      setUsers([] as User[]);
      return;
    }
    setUsers(users);
  };

  return (
    <div className="flex justify-center">
      <div className="sm:mt-10 p-4 w-full max-w-[800px]">
        <Formik initialValues={{ q: "" }} onSubmit={handleSearch}>
          {({ isSubmitting, values, handleChange }) => {
            return (
              <Form className="flex flex-col gap-4">
                <Field
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    setError("");
                  }}
                  name="q"
                  placeholder="Enter username"
                  className="w-full bg-slate-100 border border-slate-100 p-4"
                />
                <Button
                  disabled={
                    (isSubmitting ||
                      values.q === searchString ||
                      values.q === "") &&
                    !error
                  }
                >
                  Search
                </Button>
              </Form>
            );
          }}
        </Formik>
        {isLoading && <div className="py-2">Loading...</div>}
        {error && <div className="py-2">{error}</div>}
        {!isLoading && users && users.length > 0 && (
          <div className="py-2">{`Showing users for "${searchString}"`}</div>
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
