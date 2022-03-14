import { useState } from "react";
import type { SyntheticEvent } from "react";

interface Message {
  displayName: string;
  message: string;
  timestamp: Date;
  userPhoto: string;
  userID: string;
}

interface ModalProp {
  prop: {
    displayName: string;
    userPhoto: string;
    userID: string;
  };
  show: boolean;
}

function Modal({ prop, show }: ModalProp) {
  const [showModal, setShowModal] = useState(show);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { displayName, userPhoto, userID } = prop;

  function exitModal(e: SyntheticEvent) {
    if ((e.target as HTMLElement).className === "modal") {
      setShowModal(false);
    }
  }

  if (!showModal) {
    return null;
  }
  return (
    <div
      className="modal"
      onClick={(e) => {
        exitModal(e);
      }}
    >
      <div className="modal-content">
        <img
          src={userPhoto}
          alt="unable to retrieve"
          className="modal-profilePhoto"
        />
        <div className="modal-displayName">{displayName}</div>
      </div>
    </div>
  );
}

export type { Message };
export default Modal;
