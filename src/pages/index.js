import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/post-card";
import { FETCH_POSTS_QUERY } from "../constants/queries";

function PageIndex() {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY,
  );

  return (
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column>
          <h1>Recent Posts</h1>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default PageIndex;
