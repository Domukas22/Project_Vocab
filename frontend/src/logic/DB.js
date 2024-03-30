// write  a delet efunction

import { base_URL } from "./config";

export async function LIST_vocabs() {
  try {
    const response = await fetch(`${base_URL}`);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    return data; // This is now a regular JavaScript array (or object, depending on the API response) that you can use.
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of an error to ensure the function always returns an array.
  }
}
export async function FIND_vocab(id) {
  try {
    const response = await fetch(`${base_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    return data; // This is now a regular JavaScript array (or object, depending on the API response) that you can use.
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of an error to ensure the function always returns an array.
  }
}
export async function UPDATE_vocab(id, vocab_DATA) {
  try {
    const response = await fetch(`${base_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vocab_DATA),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const updatedVocab = await response.json();
    return updatedVocab;
  } catch (error) {
    console.error("Failed to update vocab:", error);
    throw error;
  }
}
export async function CREATE_vocab(vocab_DATA) {
  try {
    const response = await fetch(`${base_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vocab_DATA),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const createdVocab = await response.json();
    return createdVocab;
  } catch (error) {
    console.error("Failed to create vocab:", error);
    throw error;
  }
}
export async function DELETE_vocab(id) {
  try {
    const response = await fetch(`${base_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return true;
  } catch (error) {
    console.error("Failed to delete vocab:", error);
    throw error;
  }
}
