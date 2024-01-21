const SERVER_URL = "http://localhost:8000";

async function httpsGetAllContacts(email) {
  const response = await fetch(`${SERVER_URL}/dashboard/`, {
    method: "post",
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
}

async function httpsAddNewContact(name, email, phoneNumber) {
  try {
    return await fetch("http://localhost:8000/dashboard/new/", {
      method: "post",
      headers: {
        "content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        name,
        phoneNumber,
      }),
    });
  } catch (error) {
    return {
      ok: false,
      error: `${error}: unable to save contact`,
    };
  }
}

export { httpsGetAllContacts, httpsAddNewContact };
