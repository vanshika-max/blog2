import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "../store/authSlice";
import Loader from "../components/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  let totalPost = null;
  useSelector((state) => (totalPost = state?.allPost));
  if (totalPost) {
    console.log("ALL POSTS : IN ALLPOST FILE", totalPost);
  }

  const logoutState = useSelector(state => state.status)
  console.log(logoutState)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!totalPost) {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts?.documents);
          //dispatch to store
          dispatch(getAllPost(posts?.documents));
        } else {
          setPosts([]);
        }
      });
    } else {
      setPosts(totalPost);
    }
    setLoading(false);
  }, [logoutState]);

  console.log("HOME POSTS LENGTH", posts.length);
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full ">
              <h1 className="text-2xl font-bold hover:text-gray-500 p-20">
                Login to read posts
              </h1>
              <p className="p-20">Kindly login to have access to all posts</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

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