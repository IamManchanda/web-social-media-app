import React from "react";

function PostCard({ post }) {
  return <div style={{ padding: "1rem" }}>{JSON.stringify(post, null, 2)}</div>;
}

export default PostCard;
