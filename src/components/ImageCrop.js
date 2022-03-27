import React, { useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import styles from "./imageCrop.module.scss";
import { WizardContext } from "../context/WizardContext";

const ImageCrop = () => {
  const { file, setStep, step, setFile } = useContext(WizardContext);
  const onClickArrowBack = () => {
    setStep(step - 1);
    setFile(null);
  };

  return (
    <>
      <div className={styles["header"]}>
        <BiArrowBack onClick={onClickArrowBack} />
        <h3>Create New Post</h3>
        <p onClick={() => setStep(step + 1)}>Next</p>
      </div>
      <div className={styles["body"]}>
        <img src={URL.createObjectURL(file)} alt="" />
      </div>
    </>
  );
};

export default ImageCrop;
