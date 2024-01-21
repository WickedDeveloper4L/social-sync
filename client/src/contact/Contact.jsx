import { useDispatch, useSelector } from "react-redux";
import styles from "./contact.module.scss";
import { MdDelete, MdEdit } from "react-icons/md";
import { httpsGetAllContacts } from "../hooks/requests";
import { addContacts } from "../redux/getEmailSlice";
// import { useState } from "react";
const Contact = (contact) => {
  const { contactName, phoneNumber, _id } = contact;
  // const [name, setName] = useState(contactName);
  // const [number, setNumber] = useState(phoneNumber);
  // const [editMode, setEditMode] = useState(true);
  const email = useSelector((state) => state.email.currentUser);
  const dispatch = useDispatch();
  const deleteContact = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:8000/dashboard/", {
        method: "delete",
        body: JSON.stringify({
          _id,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.status === 200) {
        console.log(
          `success, ${contactName} successfully deleted from contact list`
        );
      }
      const latestContacts = await httpsGetAllContacts(email);
      dispatch(addContacts(latestContacts));
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.details}>
        <span className={styles.name}>{contactName}</span>
        <span className={styles.tel}>{phoneNumber}</span>
      </div>
      <div className={styles.edit}>
        <MdEdit className={styles.edit_icon} />
        <MdDelete className={styles.delete} onClick={(e) => deleteContact(e)} />
      </div>
    </div>
  );
};

export default Contact;
