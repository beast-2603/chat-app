import React from 'react';
import { Button, Modal, Tag } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const ProfileInfoBtnModal = ({ profile, children, author, ...btnProps }) => {
  const { isOpen, close, open } = useModalState();

  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);

  const shortName = profile.name.split(' ')[0];

  const MemberSince = new Date(profile.createdAt).toLocaleDateString();

  return (
    <>
      <Button
        {...btnProps}
        className="d-flex align-items-center font-bolder"
        onClick={open}
      >
        <ProfileAvatar
          src={profile.avatar}
          name={profile.name}
          className="mr-2"
          size="xs"
        />
        <span>{shortName}</span>
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>
            <ProfileAvatar
              src={profile.avatar}
              name={profile.name}
              className="width-200 height-200 img-fullsize font-huge"
            />
            <h4 className="text-disappear font-bolder mt-2">
              Name: {profile.name}{' '}
              {isMsgAuthorAdmin ? (
                <Tag color="red" className="ml-2" size="sm">
                  A
                </Tag>
              ) : (
                <Tag color="blue" className="ml-2" size="sm">
                  M
                </Tag>
              )}
            </h4>
            <p>Member Since: {MemberSince} </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {children}
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
