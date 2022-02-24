
function ChatRoom() {
    return(
        <div className="chatRoom chatRoom-container">
            <div className="chatRoom-header">
                <div className="icon-bar">
                    <span className="material-icons md-24">menu</span>
                </div>
            </div>
            <div className="chatRoom-chatbox">
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