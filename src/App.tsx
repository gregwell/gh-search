import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { getUsers } from "./api/getUsers";
import { Button } from "./Button";
import { Repos, User } from "./types";
import { UserRepos } from "./UserRepos";

const App = () => {
  const [users, setUsers] = useState([] as User[]);
  const [repos, setRepos] = useState({} as Repos);
  const [searchString, setSearchString] = useState("");

  const handleSearch = async (values: any) => {
    setSearchString(values.q);
    // add tests and error handling
    const users = (await getUsers(values.q)) as any;

    setUsers(users.items);
  };

  return (
    <div className="flex justify-center">
      <div className="sm:mt-10 p-4 w-full max-w-[800px]">
        <Formik initialValues={{ q: "" }} onSubmit={handleSearch}>
          {({ isSubmitting, values }) => {
            return (
              <Form className="flex flex-col gap-4">
                <Field
                  name="q"
                  placeholder="Enter username"
                  className="w-full bg-slate-100 border border-slate-100 p-4"
                />
                <Button
                  disabled={
                    isSubmitting || values.q === searchString || values.q === ""
                  }
                >
                  Search
                </Button>
              </Form>
            );
          }}
        </Formik>
        {users && users.length > 0 && (
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
