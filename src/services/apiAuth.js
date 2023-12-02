export async function loginUser(email, password) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );
    const token = await res.json();
    if (res.ok) {
      const data = await getMe(token);
      return data;
    }
    throw new Error(token.message);
  } catch (err) {
    throw new Error(err);
  }

}

export async function registerUser(name, email, password) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      },
    );
    const token = await res.json();
    if (res.ok) {
      const data = await getMe(token);
      return data;
    }
    throw new Error(token.message);
  } catch (err) {
    throw new Error(err);
  }
}

const getMe = async (token) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_PUBLIC_REACT_APP_API_URL}/users/my-profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    if (res.ok) {
      const userData = {
        name: data.name,
        email: data.email,
        role: data.role,
        photo: data.avatar,
        token,
      };
      return userData;
    }
    throw new Error(data.message);
  } catch (err) {
    throw new Error(err);
  }
};
