const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPERITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPERITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPERITE_BUCKET_ID),
    rte_api_key: String(import.meta.env.VITE_RTE_KEY),
}

export default conf