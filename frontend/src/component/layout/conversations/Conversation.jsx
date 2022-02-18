import axios from "axios";  
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("../users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://media.gettyimages.com/photos/wazir-khan-mosque-lahore-punjab-pakistan-picture-id637623678?s=612x612"
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
