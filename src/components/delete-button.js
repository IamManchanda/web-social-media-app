import { useMutation } from "@apollo/client";
import { Fragment, useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import {
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
} from "../constants/mutations";
import { FETCH_POSTS_QUERY } from "../constants/queries";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy, _result) {
      setConfirmOpen(false);

      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });

        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: data.getPosts.filter((p) => p.id !== postId),
          },
        });
      }

      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <Fragment>
      <Button
        icon
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </Fragment>
  );
}

export default DeleteButton;
