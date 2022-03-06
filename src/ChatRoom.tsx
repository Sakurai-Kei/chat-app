import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, doc, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import firebaseConfig from "./firebaseConfig";
import isEqual from "lodash/isEqual"

function isUser(messageUserID: string, userID: string) {
    if(messageUserID === userID) {
        return "current-user";
    }
    return "other-user";
}


function ChatRoom(){
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    const user = JSON.parse(sessionStorage.user)
    const [messagesCol, setMessagesCol] = useState([] as unknown[]);
    let messageFromFirestore: unknown[] = [];
    console.log(user)
    
    if(isEqual(messagesCol, messageFromFirestore)) {
        const messages = query(collection(db, "messages"));
        const subToMessages = onSnapshot(messages, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                messageFromFirestore = messageFromFirestore.concat(doc.data())
            })
            setMessagesCol(messageFromFirestore);
        })
    }

    return(
        <div className="chatRoom chatRoom-container">
            <div className="chatRoom-header">
                <div className="icon-bar">
                    <span className="material-icons md-24">menu</span>
                </div>
            </div>
            <div className="chatRoom-chatbox">
                {messagesCol.map((messageObj: any) => {
                    return (
                        <div key={messageObj.timestamp} className={isUser(messageObj.userID, user.uid)}>
                            <div> {messageObj.message} </div>
                            <div> {messageObj.displayName} </div>
                        </div>
                    );
                })}
            </div>
            <div className="chatRoom-type">
                <input className="messages" type="text" id="messages" name="messages"></input>
                <span className="material-icons chatRoom-center">keyboard_return</span>
            </div>
        </div>
    );
}

export default ChatRoom;