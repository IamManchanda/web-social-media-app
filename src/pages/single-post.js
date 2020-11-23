import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import DeleteButton from "../components/delete-button";
import LikeButton from "../components/like-button";
import { FETCH_POST_QUERY } from "../constants/queries";
import { AuthContext } from "../context/auth";
import dayjs from "../utils/dayjs";

function PageSinglePost({ match, history }) {
  const { user } = useContext(AuthContext);

  const { postId } = match.params;
  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  function handleDeletePost() {
    history.push("/");
  }

  let postMarkup;

  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      commentsCount,
      likes,
      likesCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
              size="small"
              floated="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{dayjs(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likesCount }} />
                <Button
                  labelPosition="right"
                  as="div"
                  onClick={() => console.log("comment on post")}
                >
                  <Button color="blue" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentsCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={handleDeletePost} />
                )}
              </Card.Content>
            </Card>
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{dayjs(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}

export default PageSinglePost;
