import React from "react";
import styles from "./dragAndDrop.module.scss";

const DragAndDrop = ({ children, setIsDragged, setFile }) => {
  const onDrop = event => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragged(false);
    setFile(event.dataTransfer.files[0]);
  };

  return (
    <div
      className={styles["drop-area"]}
      onDragEnter={() => setIsDragged(true)}
      onDragLeave={() => setIsDragged(false)}
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
};

export default DragAndDrop;
