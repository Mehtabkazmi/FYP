import axios from "axios";  
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  const friendId = conversation.members.find((m) => m !== currentUser._id);
  useEffect(() => { 
    const getUser = async () => {
      try { 
        const res = await axios.get("/api/v1/manager/users");
        setUser(res.data);
        
      } catch (err) {
        const res = await axios.get("/api/v1/user/users");
        setUser(res.data);
      }
    };
    getUser();
  }, [conversation, currentUser]);
  return (
  <>
      {user && user.users.filter((item, i, arr) => arr[i]._id === friendId)
        .map((item,i) => (
    <div key={i} className="conversation">
          
      <img
        className="conversationImg"
        src={item.avatar.url}
        alt="" 
      />
      <span className="conversationName">{item.name}</span>
    </div>
        ))}
      </>
  );
}
