import { time } from "console";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, doc, query } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

async function getMessages() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();

    const messages = query(collection(db, "messages"));
    const subToMessages = onSnapshot(messages, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
        const { message, timestamp, userID } = doc.data();
        console.log(message,timestamp,userID);
        })
    })
   
    // getMessages.forEach((doc) => {
    //     console.log(doc.id, "=>", doc.data());
    //     const {message, timestamp, userID } = doc.data();
    //     console.log(message);
    //     console.log(userID);
    //     console.log(timestamp);
    // })

    // return getMessages;
}


function ChatRoom() {
    getMessages();

    return(
        <div className="chatRoom chatRoom-container">
            <div className="chatRoom-header">
                <div className="icon-bar">
                    <span className="material-icons md-24">menu</span>
                </div>
            </div>
            <div className="chatRoom-chatbox">
                {}
                <div className="other-user">someone's chat</div>
                <div className="current-user">my chat</div>
            </div>
            <div className="chatRoom-type">
                <input className="messages" type="text" id="messages" name="messages"></input>
                <span className="material-icons chatRoom-center">keyboard_return</span>
            </div>
        </div>
    );
}

export default ChatRoom;