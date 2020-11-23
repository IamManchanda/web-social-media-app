import { useMutation } from "@apollo/client";
import { Fragment, useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { DELETE_POST_MUTATION } from "../constants/mutations";
import { FETCH_POSTS_QUERY } from "../constants/queries";

function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      postId,
    },
    update(proxy, _result) {
      setConfirmOpen(false);
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

      if (callback) callback();
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
        onConfirm={deletePost}
      />
    </Fragment>
  );
}

export default DeleteButton;
