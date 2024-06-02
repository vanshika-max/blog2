import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //-> login after account creation
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const account = await this.account.createEmailPasswordSession(
        email,
        password
      );

      if (account) {
        return account;
      } else {
        console.log("APPWRITE ERROR IN LOGIN");
      }
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const account = await this.account.get();
      console.log("USER ACCOUNT  : ", account);

      return account;
    } catch (error) {
      console.log("Appwrite service error :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logOut() {
    try {
      const account = await this.account.deleteSessions();
      if (account) {
        return account;
      } else {
        console.log("APPWRITE ERROR IN GETTING LOGOUT");
      }
    } catch (error) {
      console.log("Appwrite service error :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;