import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage; //storage, bucket

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    console.log(title, slug, content, featuredImage, status, userId);
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, //document id
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service error :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, //document id
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service error :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug //document id
      );
      return true;
    } catch (error) {
      console.log("Appwrite service error :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug //document id
      );
    } catch (error) {
      console.log("Appwrite service error :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service error :: getPosts :: error", error);
      return false;
    }
  }

  //file upload service
  async uploadFile(file) {
    console.log(conf.appwriteBucketId);
    try {

      const data =  await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      console.log("Uploading files completed : ",data);
      return data;
    } catch (error) {
      console.log("Appwrite service error :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileID) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileID);
    } catch (error) {
      console.log("Appwrite service error :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileID) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileID);
  }
}

const service = new Service();
export default service;