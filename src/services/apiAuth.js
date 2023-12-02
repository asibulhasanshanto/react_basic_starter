export async function loginUser(email, password) {
  // your api calling code goes here
  console.log(email, password);

  const data = {
    result: {
      name: "john doe",
      email: "john@doe.com",
      role: "user",
      token: "jwt-token",
    },
  };
  return data;
}

export async function registerUser(name, email, password, confirmPassword) {
  console.log(name, email, password, confirmPassword);
  const data = {
    result: {
      name: "john doe",
      email: "john@doe.com",
      role: "user",
      token: "jwt-token",
    },
  };
  return data;
}
