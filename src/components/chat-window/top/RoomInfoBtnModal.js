import React, { memo } from 'react';
import { Alert, Button, Drawer, Icon, Modal } from 'rsuite';
import { useParams } from 'react-router';
import { useModalState } from '../../../misc/custom-hooks';
import { database } from '../../../misc/Firebase';
import { useCurrentRoom } from '../../../context/current-room.context';
import EditableInput from '../../EditableInput';
import EditableTextArea from '../../EditableTextArea';

const RoomInfoBtnModal = () => {
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);
  const roomId = useParams().chatId;

  const { isOpen, close, open } = useModalState();
  const onSaveRoomName = async newData => {
    try {
      database.ref(`/rooms/${roomId}`).child('name').set(newData);
      Alert.success('Room-Name has been Updated', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const onSaveDescription = async nData => {
    try {
      database.ref(`/rooms/${roomId}`).child('description').set(nData);
      Alert.info(`Description of the Room - ${name} has been updated`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  return (
    <>
      <Button appearance="link" className="px-0" onClick={open} color="green">
        <Icon icon="info" size="2x" />
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title classPrefix="About">About</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mt-2 mb-2">Name :</h6>
          <EditableInput
            name="Room-Name"
            initialValue={name}
            onSave={onSaveRoomName}
          />
          <h6 className="mt-2 mb-2">Description:</h6>
          <EditableTextArea
            name="Room-Description"
            initialValue={description}
            onSave={onSaveDescription}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(RoomInfoBtnModal);
