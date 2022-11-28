import React, { memo } from 'react';
import { Alert, Button, Dropdown, Modal } from 'rsuite';
import { useParams } from 'react-router';
import { useModalState } from '../../../misc/custom-hooks';
import { useCurrentRoom } from '../../../context/current-room.context';
import EditableInput from '../../EditableInput';
import { database } from '../../../misc/Firebase';
import EditableTextArea from '../../EditableTextArea';

const EditRoomBtnModal = () => {
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);
  const { isOpen, close, open } = useModalState();
  const roomId = useParams().chatId;

  const onSaveRoomName = async newData => {
    database
      .ref(`/rooms/${roomId}`)
      .child('name')
      .set(newData)
      .then(() => {
        Alert.success('Room-Name has been Updated', 4000);
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };

  const onSaveDescription = async newData => {
    database
      .ref(`/rooms/${roomId}`)
      .child('description')
      .set(newData)
      .then(() => {
        Alert.info(`Description of the Room - ${name} has been updated`, 4000);
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };

  return (
    <div>
      <Button onClick={open}>Edit Room</Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title classPrefix="About Room">About Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditableInput
            initialValue={name}
            onSave={onSaveRoomName}
            label={<h5 className="mb-2">Room-Name:</h5>}
          />
          <EditableTextArea
            initialValue={description}
            onSave={onSaveDescription}
            label={<h5 className="mt-2 mb-2">Description:</h5>}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(EditRoomBtnModal);
