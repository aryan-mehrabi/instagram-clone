import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./profileEdit.module.scss";
import { updateUserData } from "../actions";

const ProfileEdit = ({ userId, user, setIsModalOpen, updateUserData }) => {
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [file, setFile] = useState(null);
  const onClickSave = () => {
    updateUserData(userId, name, bio)
  }
  return (
    <section className={styles["edit-profile"]}>
      <header>
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        <h3>EditProfile</h3>
        <button onClick={onClickSave}>Save</button>
      </header>
      <div className={styles["body"]}>
        <div className={styles["avatar"]}>
          <label htmlFor="file">Change Avater</label>
          {/* <input onChange={(e) => setFile(e.target.files[0])} type="file" id="file" name="file" /> */}
          <img src={(file && URL.createObjectURL(file)) || user.profilePicture} alt="avatar" />
        </div>
        <form>
          <div>
            <label>Username</label>
            <input disabled type="text" value={user.username} />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Biography</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </section>
  );
};
const mapStateToProps = state => {
  return {
    userId: state.userId,
    user: state.users[state.userId],
  };
};
export default connect(mapStateToProps, { updateUserData })(ProfileEdit);
