/* eslint-disable react/prop-types */
import Contact from "../contact/Contact";
import styles from "./contacts.module.scss";

const Contacts = ({ contactList }) => {
  return (
    <div className={styles.main}>
      {contactList.map((contact) => {
        return <Contact key={contact._id} {...contact} />;
      })}
    </div>
  );
};

export default Contacts;
