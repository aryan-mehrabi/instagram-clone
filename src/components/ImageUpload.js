import React, { useState, useEffect, useContext } from "react";
import DragAndDrop from "./DragAndDrop";
import styles from "./imageUpload.module.scss";
import { SvgPhoto } from "./SVGS";
import { WizardContext } from "../context/WizardContext";

const ImageUpload = () => {
  const [isDragged, setIsDragged] = useState(false);
  const { setFile, setStep, step, file } = useContext(WizardContext);
  useEffect(() => {
    if (file) {
      setStep(step + 1);
    }
  }, [file]);
  return (
    <>
      <div className={styles["header"]}>
        <h3>Create New Post</h3>
      </div>
      <DragAndDrop setIsDragged={setIsDragged} setFile={setFile}>
        <div className={styles["body"]}>
          <div className={styles["drop"]}>
            <SvgPhoto color={isDragged ? "#0095f6" : "#262626"} />
            <p>Drag Photos Here</p>
          </div>
        </div>
      </DragAndDrop>
    </>
  );
};

export default ImageUpload;
