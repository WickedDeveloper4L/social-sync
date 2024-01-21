import Contacts from "../contacts/Contacts";
import { httpsGetAllContacts } from "../hooks/requests";
import Navbar from "../navbar/Navbar";
import { addContacts } from "../redux/getEmailSlice";
import Search from "../search/Search";
import styles from "./dashboard.module.scss";
import { useEffect, useState } from "react";
import { ImPlus } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const updatedContactsList = useSelector((state) => state.email.contacts);
  const [contactList, setContactList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [isPendingSave, setIsPendingSave] = useState(false);

  const email = useSelector((state) => state.email.currentUser);
  console.log(updatedContactsList);

  const dispatch = useDispatch();
  const submitContact = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:8000/dashboard/new", {
        method: "post",
        body: JSON.stringify({
          name,
          phoneNumber,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const contacts = await httpsGetAllContacts(email);
      if (response.status === 200) {
        console.log(`success, ${name} successfully added to contact list`);
      }
      setName("");
      setPhoneNumber("");
      setContactList(contacts);
      dispatch(addContacts(contacts));
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const getContacts = async () => {
      const contacts = await httpsGetAllContacts(email);
      setContactList(contacts);
    };
    getContacts();
  }, [email]);
  console.log(contactList);
  return (
    <div className={styles.main}>
      <Navbar />
      <Search />
      <Contacts contactList={contactList} />
      {showAddModal && (
        <form onSubmit={submitContact} className={styles.addModal}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.input}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className={styles.label} htmlFor="number">
            Phone number
          </label>
          <input
            className={styles.input}
            type="text"
            name="phoneNumber"
            id="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => setTimeout(() => setShowAddModal(false), 2000)}
            className={styles.btn}
          >
            Save
          </button>
        </form>
      )}

      <span className={styles.add} onClick={() => setShowAddModal(true)}>
        <ImPlus className={styles.add_btn} />
        Add new
      </span>
    </div>
  );
};

export default Dashboard;
