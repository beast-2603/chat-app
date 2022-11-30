import React from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useHover } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/Firebase';
import PresenceDot from '../../PresenceDot';
import IconBtnControl from './IconBtnControl';
import ImgBtnModal from './ImgBtnModal';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const renderFileMessage = file => {
  if (file.contentType.includes('image')) {
    return (
      <div className="height-220">
        <ImgBtnModal src={file.url} fileName={file.name} />
      </div>
    );
  }

  return <a href={file.url}>Download {file.name}</a>;
};

const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {
  const { author, createdAt, text, file, likes, likeCount } = message;

  const [selfRef, isHovered] = useHover();

  const isMobile = useMediaQuery('(max-width: 992px)');

  const isAdmin = useCurrentRoom(v => v.isAdmin);

  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);

  const isAuthor = auth.currentUser.uid === author.uid;

  const canGrantAdmin = isAdmin && !isAuthor;

  const canShowIcons = isMobile || isHovered;

  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileInfoBtnModal
          profile={author}
          appearance="subtle"
          author={author}
        >
          {canGrantAdmin && (
            <Button
              block
              color={isMsgAuthorAdmin ? 'red' : 'blue'}
              onClick={() => handleAdmin(author.uid)}
            >
              {isMsgAuthorAdmin ? 'Remove as Admin' : 'Make Room Admin'}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2 mr-2"
        />

        <IconBtnControl
          {...(isLiked ? { color: 'red' } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like This Message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtnControl
            {...{ color: 'blue' }}
            isVisible={canShowIcons}
            iconName="trash"
            tooltip="Delete This Message"
            onClick={() => handleDelete(message.id)}
            className="ml-2"
          />
        )}
      </div>
      <div>
        {text && <span className="word-break-all">{text}</span>}
        {file && renderFileMessage(file)}
      </div>
    </li>
  );
};

export default MessageItem;
