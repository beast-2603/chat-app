import React, { memo } from 'react';
import { Button, Icon, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import { useCurrentRoom } from '../../../context/current-room.context';

const RoomInfoBtnModal = () => {
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);

  const { isOpen, close, open } = useModalState();
  return (
    <>
      <Button appearance="link" className="px-0" onClick={open} color="green">
        <Icon icon="info" size="2x" />
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About - {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Description:</h6>
          <p>{description}</p>
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
