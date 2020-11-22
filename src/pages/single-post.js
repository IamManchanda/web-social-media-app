function PageSinglePost(props) {
  const { postId } = props.match.params;
  return <div>Hello {postId}</div>;
}

export default PageSinglePost;
