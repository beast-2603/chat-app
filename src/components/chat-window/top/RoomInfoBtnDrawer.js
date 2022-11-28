import React, { memo } from 'react';
import { Button, Drawer, Dropdown } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';

const RoomInfoBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();

  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);

  const isMobile = useMediaQuery('(max-width: 992px)');

  return (
    <>
      <Button onClick={open}>Room Info</Button>
      <Drawer
        full={isMobile}
        placement="right"
        show={isOpen}
        onHide={close}
        size="xs"
      >
        <Drawer.Header>
          <Drawer.Title>Room Information</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <div className="d-flex align-items-center justify-content-center mb-2 flex-wrap">
            <h5>Name :</h5>
            <p>{name}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-2 flex-wrap">
            <h5>Description :</h5>
            <p>{description}</p>
          </div>
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default memo(RoomInfoBtnDrawer);
