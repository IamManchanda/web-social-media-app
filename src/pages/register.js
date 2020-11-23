import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { REGISTER_USER } from "../constants/mutations";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

function PageRegister({ history }) {
  const { login } = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { values, handleFormSubmit, handleFormInputChange } = useForm(
    registerUserCallback,
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  );

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    variables: values,
    update(_proxy, { data: { register: userData } = {} }) {
      login(userData);
      history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function registerUserCallback() {
    registerUser();
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={handleFormSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Register</h1>
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
          type="email"
          label="Email"
          placeholder="Enter Email..."
          name="email"
          value={values.email}
          error={Boolean(errors.email)}
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

        <Form.Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={values.confirmPassword}
          error={Boolean(errors.confirmPassword)}
          onChange={handleFormInputChange}
        />

        <Button type="submit" primary>
          Register
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

export default PageRegister;
