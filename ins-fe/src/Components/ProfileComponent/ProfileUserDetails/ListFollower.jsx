import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import FollowerCard from "./FollowerCard";

const ListFollower = ({ isOpen, onClose, follower, follow }) => {
  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Follower</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input borderRadius="20px" placeholder="Search ..." />
            {follower?.result.map((item, index) => (
              <FollowerCard key={index} item={item} follow={follow}/>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ListFollower;
