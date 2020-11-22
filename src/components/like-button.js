import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { LIKE_POST_MUTATION } from "../constants/mutations";

function LikeButton({ user, post: { id, likes, likesCount } = {} }) {
  const [liked, setLiked] = useState();

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      postId: id,
    },
  });

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {user ? (
        liked ? (
          <Button color="teal">
            <Icon name="heart" />
          </Button>
        ) : (
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
        )
      ) : (
        <Button as={Link} to="/login" color="teal" basic>
          <Icon name="heart" />
        </Button>
      )}
      <Label basic color="teal" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
