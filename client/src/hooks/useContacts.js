/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect } from "react";
import { httpsAddNewContact, httpsGetAllContacts } from "./requests";
import { useSelector } from "react-redux";
function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [isPendingSave, setPendingSave] = useState(false);
  const email = useSelector((state) => state.email.currentUser);
  console.log(email);
  const getContacts = useCallback(async () => {
    const fetchedContacts = await httpsGetAllContacts(email);
    setContacts(fetchedContacts);
  }, [email]);

  const submitContact = useCallback(
    async (e) => {
      e.preventDefault();
      setPendingSave(true);
      const data = new FormData(e.target);
      const name = data.get("name");
      const phoneNumber = data.get("number");
      const response = await httpsAddNewContact(name, phoneNumber, email);

      const success = response.ok;
      if (success) {
        getContacts();
        setTimeout(() => {
          setPendingSave(false);
        }, 800);
      } else {
        console.log("unanble to save contact...getting all contacts!");
      }
    },
    [getContacts, email]
  );
  useEffect(() => {
    getContacts();
  }, [getContacts]);
  return {
    contacts,
    submitContact,
  };
}

export default useContacts;
