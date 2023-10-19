export async function loginUser(email, password) {
    // your api calling code goes here

    const data = {
        result: {
            name: 'john doe',
            email: 'john@doe.com',
            role:'user',
            token: 'jwt-token'
        },
    }
    return data;
  }
  