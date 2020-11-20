import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { LOGIN_USER } from "../constants/mutations";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

function PageLogin({ history }) {
  const { login } = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { values, handleFormSubmit, handleFormInputChange } = useForm(
    loginUserCallback,
    {
      username: "",
      password: "",
    },
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_proxy, { data: { login: userData } = {} }) {
      login(userData);
      history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={handleFormSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Login</h1>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Enter Username..."
          name="username"
          value={values.username}
          error={Boolean(errors.username)}
          onChange={handleFormInputChange}
        />

        <Form.Input
          type="password"
          label="Password"
          placeholder="Enter Password..."
          name="password"
          value={values.password}
          error={Boolean(errors.password)}
          onChange={handleFormInputChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.entries(errors).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PageLogin;
