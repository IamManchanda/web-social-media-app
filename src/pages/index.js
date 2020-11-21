import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/post-card";
import PostForm from "../components/post-form";
import { FETCH_POSTS_QUERY } from "../constants/queries";
import { AuthContext } from "../context/auth";

function PageIndex() {
  const { user } = useContext(AuthContext);

  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY,
  );

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          <Transition.Group duration={1000}>
            {posts &&
              posts.map((post) => (
                <Grid.Column
                  key={post.id}
                  style={{
                    marginBottom: "1.25rem",
                  }}
                >
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default PageIndex;
