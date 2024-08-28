import { useState } from "react";

const useDisclosure = (isOpenModal = false) => {
  const [isOpen, setIsOpen] = useState(isOpenModal);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useDisclosure;
