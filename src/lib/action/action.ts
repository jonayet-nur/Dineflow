'use server'

import { db } from "@/lib/auth"; // Apnar auth.ts file-er relative path

export const CreateMenu = async (newMenu: any) => {
  try {
    // Better Auth-er oi eki DB connection use hoche!
    // "all-menu" er jaigay apnar backend collection name ta diben
    const result = await db.collection("all-menu").insertOne(newMenu);

    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(result)) 
    };

  } catch (error) {
    console.error('Failed to create menu:', error);
    return { 
      success: false, 
      error: 'Database operations failed' 
    };
  }
};