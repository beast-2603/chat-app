import React from 'react';
import TimeAgo from 'timeago-react';

const RoomItem = ({ room }) => {
  const { createdAt, name } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear">{name}</h4>
        <TimeAgo
          datetime={new Date(createdAt)}
          className="font-normal text-black-45"
        />
      </div>
      <div className="d-flex align-items-center text-black-70">
        No Messages yet...
      </div>
    </div>
  );
};

export default RoomItem;
