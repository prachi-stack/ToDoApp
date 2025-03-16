"use server";

import { revalidatePath } from "next/cache";

export async function createDocument(title, description) {
  const response = await fetch("http://localhost:5000/api/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to create document");
  }
  const data = await response.json();

  revalidatePath("/");

  return data;
}

export async function fetchDocuments(page = 1, limit = 5) {
  const response = await fetch(
    `http://localhost:5000/api/documents?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { tags: ["documents"] },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }
  const data = await response.json();
  return data;
}

export async function fetchDocumentById(id) {
  try {
    console.log(`Fetching document with ID: ${id}`);
    const url = `http://localhost:5000/api/documents/${id}`;
    console.log(`API URL: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { tags: [`document-${id}`] },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} - ${errorText}`);

      const error = new Error(
        `Failed to fetch document: ${response.status} - ${errorText}`
      );
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    console.log("Document fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchDocumentById:", error);
    if (!error.status && error.message && error.message.includes("404")) {
      error.status = 404;
    }
    throw error;
  }
}

export async function updateDocument(id, updates) {
  const response = await fetch(`http://localhost:5000/api/documents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to update document");
  }
  const data = await response.json();

  revalidatePath("/");
  revalidatePath(`/todos/${id}`);

  return data;
}
