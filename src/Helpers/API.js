const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C";

export const fetchPosts = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const makePost = async (token, post) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: post.title,
          description: post.description,
          price: post.price,
          willDeliver: post.willDeliver,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = async (token, postId, updatedPost) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: updatedPost.title,
          description: updatedPost.description,
          price: updatedPost.price,
          willDeliver: updatedPost.willDeliver,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = async (token, postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const postMessage = async (token, postId, content) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: content,
        },
      }),
    });

    const result = await response.json();
    if (result.success) {
      // Fetch the username of the author
      const authorResponse = await fetch(
        `${BASE_URL}/users/${result.data.message.fromUser}`
      );
      const authorData = await authorResponse.json();
      if (authorData.success) {
        result.data.message.fromUser = authorData.data.user.username;
      }
    }

    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });

    console.log("Login Response:", response); // Log the entire response

    if (response.ok) {
      const data = await response.json(); // Parse the response JSON
      console.log("Login Data:", data); // Log the parsed data
      return data; // Return the parsed data
    } else {
      throw new Error(`Login failed with status ${response.status}`);
    }
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
};

export const myData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("API Response:", result); // Add this line to log the response
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const fetchSinglePost = async (postId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export async function fetchUserData(token) {
  if (!token) {
    throw new Error("Token not provided.");
  }

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
