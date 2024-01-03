const SERVER_URL = "https://localhost:8000";

async function httpsGetAllContacts() {
  const response = await fetch(`${SERVER_URL}/dashboard`);
  return await response.json();
}

async function httpsAddNewContact(contact) {
  try {
    return await fetch(`${SERVER_URL}/dashboard`, {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
  } catch (error) {
    return {
      ok: false,
      error: `${error}: unable to save contact`,
    };
  }
}

export { httpsGetAllContacts, httpsAddNewContact };
