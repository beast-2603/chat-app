import React from 'react';
import { Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';

const ImgBtnModal = ({ src, fileName }) => {
  const { isOpen, close, open } = useModalState();

  return (
    <>
      <input
        type="image"
        src={src}
        alt="file"
        onClick={open}
        className="mh-100 mw-100 w-auto"
        style={{ borderRadius: '10px' }}
      />

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{fileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={src}
            height="100%"
            width="100%"
            alt="file"
            style={{ borderRadius: '10px' }}
          />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center align-items-center">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            View Original
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImgBtnModal;
