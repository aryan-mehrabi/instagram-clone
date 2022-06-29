import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./newPost.module.scss";
import ImageUpload from "../components/ImageUpload";
import ImageCrop from "../components/ImageCrop";
import ImageDescription from "../components/ImageDescription";
import { WizardContext } from "../context/WizardContext";
import { createPost } from "../actions";

const NewPost = ({userId, createPost, user }) => {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const renderContent = () => {
    switch (step) {
      case 0:
        return <ImageUpload />;
      case 1:
        return <ImageCrop />;
      case 2:
        return <ImageDescription />;
      default:
        return;
    }
  };
  const onClickPost = () => {
    createPost(file, description, userId, user);
  };

  return (
      <div className={styles["content"]}>
        <WizardContext.Provider
          value={{
            setFile,
            file,
            setStep,
            step,
            description,
            setDescription,
            onClickPost,
          }}
        >
          {renderContent()}
        </WizardContext.Provider>
      </div>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.userId,
    user: state.users[state.userId],
  };
};
export default connect(mapStateToProps, { createPost })(NewPost);
