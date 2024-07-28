import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectedId: import.meta.env.VITE_APPWRITE_PROJECTID,
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGEID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTIONID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTIONID,
    saveCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTIONID,


}

export const client = new Client();
client.setProject(appwriteConfig.projectedId);
client.setEndpoint(appwriteConfig.url);


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
