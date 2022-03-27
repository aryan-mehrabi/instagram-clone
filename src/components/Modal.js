import React from "react";
import ReactDOM from "react-dom";
import { BiX } from "react-icons/bi";
import styles from "./modal.module.scss";

const Modal = ({ children, closeModal }) => {
  return ReactDOM.createPortal(
    <div onClick={() => closeModal(false)} className={styles["modal"]}>
      <div className={styles["close-button"]}>
        <BiX />
      </div>
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
