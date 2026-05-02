export async function loginUser(userData) {
    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': "application/json",
        },
        body: JSON.stringify(userData),
    });

    // console.log(response);

    return response;
}