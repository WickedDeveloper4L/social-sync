import Contacts from "../contacts/Contacts";
import Navbar from "../navbar/Navbar";
import Search from "../search/Search";
import styles from "./dashboard.module.scss";
import useContacts from "../hooks/useContacts";
import { useEffect, useState } from "react";
import { ImPlus } from "react-icons/im";

const Dashboard = () => {
  const { contacts, submitContact, isPendingSave } = useContacts();
  const [contactList, setContactList] = useState(contacts);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);
  console.log(contactList);
  return (
    <div className={styles.main}>
      <Navbar />
      <Search />
      <Contacts contactList={contacts} />
      {showAddModal && (
        <form onSubmit={submitContact} className={styles.addModal}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input className={styles.input} type="text" name="name" id="name" />
          <label className={styles.label} htmlFor="number">
            Phone number
          </label>
          <input
            className={styles.input}
            type="text"
            name="number"
            id="number"
          />
          <button
            type="submit"
            onClick={() => setTimeout(() => setShowAddModal(false), 5000)}
            disabled={isPendingSave}
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
