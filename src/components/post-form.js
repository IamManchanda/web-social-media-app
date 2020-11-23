import { useMutation } from "@apollo/client";
import { Fragment } from "react";
import { Button, Form } from "semantic-ui-react";
import { CREATE_POST_MUTATION } from "../constants/mutations";
import { FETCH_POSTS_QUERY } from "../constants/queries";
import { useForm } from "../utils/hooks";

function PostForm() {
  const { values, handleFormSubmit, handleFormInputChange } = useForm(
    createPostCallback,
    {
      body: "",
    },
  );

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    onError(error) {
      console.log(error.graphQLErrors[0].message);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Fragment>
      <Form onSubmit={handleFormSubmit}>
        <h2>Create a Post</h2>
        <Form.Input
          type="text"
          placeholder="Hi World!"
          name="body"
          value={values.body}
          onChange={handleFormInputChange}
          error={Boolean(error)}
        />

        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form>
      {error && (
        <div
          className="ui error message"
          style={{
            marginBottom: "1.25rem",
          }}
        >
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </Fragment>
  );
}

export default PostForm;
