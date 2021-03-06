import "./messenger.css";
import Conversation from "../layout/conversations/Conversation";
import Message from "../layout/message/Message";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";  
import Loader from "../layout/Loader/Loader";

export default function Messenger({history}) {

  // conversation 
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
  if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  const scrollRef = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900"); 
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [user]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        if (user.role === "manager") {
          const res = await axios.get("/api/v1/manager/messenger/" + user._id);
          setConversations(res.data);
        }
        else if (user.role === "chef") {
          const res = await axios.get("/api/v1/chef/messenger/" + user._id);
          setConversations(res.data);
        }
        else if (user.role === "user") {
          const res = await axios.get("/api/v1/user/messenger/" + user._id);
          setConversations(res.data);
        }
      } catch (err) { 
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        if (user.role === "manager") {
          const res = await axios.get("/api/v1/manager/message/" + currentChat?._id);
          setMessages(res.data);
        }
        else if (user.role === "chef") {
          const res = await axios.get("/api/v1/chef/message/" + currentChat?._id);
          setMessages(res.data);
        }
        else if (user.role === "user") {
          const res = await axios.get("/api/v1/user/message/" + currentChat?._id);
          setMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (user.role === "manager") {
        const res = await axios.post("/api/v1/manager/message", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      }
      else if (user.role === "chef") {
        const res = await axios.post("/api/v1/chef/message", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      }
      else if (user.role === "user") {
        const res = await axios.post("/api/v1/user/message", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder="Search for friends" className="chatMenuInput" />
            
              {conversations.map((c,index) => (
            
              <div key={index} onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
              </div>
            ))} 
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    ))} 
                  </div> 
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
