import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { Query } from "appwrite";

import { getUserPost } from "../store/authSlice";
import Loader from "../components/Loader";

function AllPosts() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  let user_id = null;
  useSelector((state) => (user_id = state.userData?.$id));

  console.log(user_id);

  let allPost = null;
  useSelector((state) => (allPost = state?.userPost));



  useEffect(() => {
    setLoading(true);
    if (!allPost) {
      appwriteService
        .getPosts([Query.equal("userId", user_id)])
        .then((posts) => {
          console.log(posts);
          if (posts) {
            setPosts(posts.documents);
            dispatch(getUserPost(posts?.documents));
          }
        });
    }else{
      setPosts(allPost)
    }
    setLoading(false);
  }, []);

  return (
    !loading ? 
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
    : <Loader />
  );
}

export default AllPosts;