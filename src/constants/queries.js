import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      body
      createdAt
      username
      commentsCount
      likes {
        id
        createdAt
        username
      }
      likesCount
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query GetPosts($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        id
        body
        username
        createdAt
      }
      commentsCount
      likes {
        id
        createdAt
        username
      }
      likesCount
    }
  }
`;
