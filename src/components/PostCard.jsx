import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage, status}) => {
    const btn=true;
    console.log(btn)
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 overflow-hidden shadow-xl">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-wrap justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          {/* {btn && <button className={`${status == 'active' ? 'bg-green' : 'bg-red'}`}>{status}</button>} */}
          
        </div>
      </div>
    </Link>
  );
};

export default PostCard;