/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect } from "react";
import { httpsAddNewContact, httpsGetAllContacts } from "./requests";
function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [isPendingSave, setPendingSave] = useState(false);

  const getContacts = useCallback(async () => {
    const fetchedContacts = await httpsGetAllContacts();
    setContacts(fetchedContacts);
  }, []);

  const submitContact = useCallback(
    async (e) => {
      e.preventDefault();
      setPendingSave(true);
      const data = new FormData(e.target);
      const name = data.get("name");
      const number = data.get("number");
      const response = await httpsAddNewContact({
        name,
        number,
      });

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
    [getContacts]
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
