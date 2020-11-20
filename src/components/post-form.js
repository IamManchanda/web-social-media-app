import { useMutation } from "@apollo/client";
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
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <h2>Create a Post</h2>
      <Form.Input
        type="text"
        placeholder="Hi World!"
        name="body"
        value={values.body}
        onChange={handleFormInputChange}
      />

      <Button type="submit" color="teal">
        Submit
      </Button>
    </Form>
  );
}

export default PostForm;
