import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPosts, likePost } from "../Features/PostSlice"; // Adjust path as needed
import { Table } from "reactstrap";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const email = useSelector((state) => state.users.user.email);
  const userId = useSelector((state) => state.users.user._id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleLikePost = (postId) => {
    const postData = { postId, userId };
    dispatch(likePost(postData));
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="postsContainer">
      <Table className="table table-striped">
        <thead>
          <tr>
            <th>Email address</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post._id}>
              <td>{post.email}</td>
              <td>
                <p>{moment(post.createdAt).fromNow()}</p>
                {post.postMsg}
                <p className="likes">
                  <a href="#" onClick={() => handleLikePost(post._id)}>
                    <FaThumbsUp />
                  </a>
                  ({post.likes.count})
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Posts;