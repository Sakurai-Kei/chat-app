import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  Firestore,
  addDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import firebaseConfig from "./firebaseConfig";
import isEqual from "lodash/isEqual";
import { getAuth, User } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

function isUser(messageUserID: string, userID: string) {
  if (messageUserID === userID) {
    return "current-user";
  }
  return "other-user";
}

function sendMessage(db: Firestore, user: User) {
  let message = (document.getElementById("messages") as HTMLInputElement).value;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const docRef = addDoc(collection(db, "messages"), {
    displayName: user.displayName,
    message: message,
    timestamp: new Date(),
    userPhoto: user.photoURL,
    userID: user.uid,
  });
  (document.getElementById("messages")! as HTMLInputElement).value = "";
}

function ChatRoom() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  const [messagesCol, setMessagesCol] = useState([] as unknown[]);
  let messageFromFirestore: unknown[] = [];
  console.log(user);

  useEffect(() => {
    if (isEqual(messagesCol, messageFromFirestore)) {
      const messages = query(collection(db, "messages"));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const subToMessages = onSnapshot(messages, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          messageFromFirestore = messageFromFirestore.concat(doc.data());
        });
        setMessagesCol(messageFromFirestore);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        messageFromFirestore = [];
      });
    }
  });

  if (user === null) {
    return (
      <div>
        Wait while we check for authentication. If you are stuck seeing this
        message, please login if you have not
      </div>
    );
  }

  return (
    <div className="chatRoom chatRoom-container">
      <div className="chatRoom-header">
        <div className="icon-bar">
          <span className="material-icons md-24">menu</span>
        </div>
      </div>
      <div className="chatRoom-chatbox">
        {messagesCol
          .sort((x: any, y: any) => x.timestamp - y.timestamp)
          .map((messageObj: any) => {
            return (
              <div
                key={uuidv4()}
                className={isUser(messageObj.userID, user.uid)}
              >
                <div className="messageHeader">
                  <img
                    src={messageObj.userPhoto}
                    alt="unable to retrieve"
                    className="profileImage"
                  />
                  <div className="displayName">{messageObj.displayName}</div>
                </div>
                <div> {messageObj.message} </div>
              </div>
            );
          })}
      </div>
      <div className="chatRoom-type">
        <input
          className="messages"
          type="text"
          id="messages"
          name="messages"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage(db, user);
            }
          }}
        ></input>
        <button
          className="material-icons chatRoom-center"
          onClick={() => sendMessage(db, user)}
        >
          keyboard_return
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
