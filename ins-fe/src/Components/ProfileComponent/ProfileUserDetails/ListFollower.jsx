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

const ListFollower = ({ isOpen, onClose, follower }) => {
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
              <div
                className="flex justify-between items-center mt-5"
                key={index}
              >
                <div className="flex items-center space-x-3">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item?.userImage ? item?.userImage : "https://hzshop.ir/img/accountimg.png"}
                    alt=""
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-md font-semibold">{item.username} · </p>
                      <Button
                        size="sx"
                        backgroundColor="white"
                        textColor="blue.400"
                      >
                        follow
                      </Button>
                    </div>
                    <p className="">{item.fullName}</p>
                  </div>
                </div>
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ListFollower;
