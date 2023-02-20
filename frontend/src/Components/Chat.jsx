import React from "react";
import "../index.css";
import { Avatar, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function Chat({ message }) {
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqwkbI4_dMt8HBZ3T6MK1KkQ6yraXixiQQyQ&usqp=CAU" />
        <div className="chats_info">
          <h3>Pwd Group 2023</h3>
          <p>Last seen at ....</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {message.length > 0 &&
          message.map((msg, index) => (
            <p
              className={
                msg.received ? "chat_message chat_reciever" : "chat_message"
              }
              key={index}
            >
              <span className="chat_name">{msg.name}</span>
              {msg?.message ? msg.message : "..."}
              <span className="chat_timestamp">{msg.timestamp}</span>
            </p>
          ))}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input placeholder="type message" type="text" />
          <button type="submit">Send a message</button>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <CameraAltIcon />
          </IconButton>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
