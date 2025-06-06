import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations.js";
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  TitleModal,
  ModalCloseBtn,
  ModalText,
  ContainerLogoutBtn,
  StyledButton,
} from "./UserLogoutModal.styled.js";
import icons from "../../assets/icons.svg";

export const UserLogoutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <ModalBackdrop onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <TitleModal>Вийти</TitleModal>
          <ModalCloseBtn onClick={handleClose}>
            <svg width="24" height="24">
              <use href={`${icons}#icon-cross`} />
            </svg>
          </ModalCloseBtn>
        </ModalHeader>
        <ModalText>Do you really want to leave?</ModalText>
        <ContainerLogoutBtn>
          <StyledButton className="logout-button" onClick={handleLogout}>
            Вийти
          </StyledButton>
          <StyledButton className="cancel-button" onClick={onClose}>
            Закрити
          </StyledButton>
        </ContainerLogoutBtn>
      </ModalContent>
    </ModalBackdrop>
  );
};
