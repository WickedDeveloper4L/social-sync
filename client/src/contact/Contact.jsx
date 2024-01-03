import styles from "./contact.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
const Contact = (contact) => {
  const { name, number } = contact;
  return (
    <div className={styles.main}>
      <div className={styles.details}>
        <span className={styles.name}>{name}</span>
        <span className={styles.tel}>{number}</span>
      </div>
      <div className={styles.edit}>
        <BsThreeDotsVertical className={styles.icon} />
      </div>
    </div>
  );
};

export default Contact;
