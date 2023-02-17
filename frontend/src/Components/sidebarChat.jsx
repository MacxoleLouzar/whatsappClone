import React from 'react'
import '../index.css'
import { Avatar } from "@mui/material";

function sidebarChat() {
  return (
    <div className='sidebarChat'>
          <Avatar/>
          <div className='sidebar_Chats'>
            <h4>Pwd 2023</h4>
            <p>This is a last message</p>
          </div>
        </div>
  )
}

export default sidebarChat