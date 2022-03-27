import React, { useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import styles from "./imageDescription.module.scss";
import { WizardContext } from "../context/WizardContext";

const ImageDescription = () => {
  const { step, setStep, setDescription, desription, onClickPost } = useContext(WizardContext);
  return (
    <>
      <div className={styles["header"]}>
        <BiArrowBack onClick={() => setStep(step - 1)} />
        <h3>Create New Post</h3>
        <p onClick={onClickPost}>Post</p>
      </div>
      <div className={styles["body"]}>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={desription}
          placeholder="Write Description For Your Post"
          name=""
          id=""
        ></textarea>
      </div>
    </>
  );
};

export default ImageDescription;
