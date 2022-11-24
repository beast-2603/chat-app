import React from 'react';
import { Nav } from 'rsuite';
import RoomItem from './RoomItem';

const ChatRoomList = ({ abvElHeight }) => {
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${abvElHeight}px - 20px)`,
      }}
    >
      <Nav.Item>
        <RoomItem />
      </Nav.Item>
    </Nav>
  );
};

export default ChatRoomList;
