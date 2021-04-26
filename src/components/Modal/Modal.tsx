import React from 'react';
import { createPortal } from 'react-dom';
import { ModalStyles } from './ModalStyles';

interface Props {
  children: React.ReactChild;
  isOpen: boolean;
}

const modalElement = document.getElementById('modal-root');

export const Modal = (({ children, isOpen = false }: Props) => createPortal(
    isOpen ? (
      <ModalStyles>
        {children}
      </ModalStyles>
    ) : null
  , modalElement)
);
