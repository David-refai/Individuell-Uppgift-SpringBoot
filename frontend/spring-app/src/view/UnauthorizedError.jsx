import React, { useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
export default function UnauthorizedError() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const finalRef = React.useRef();
  const [isOpenModal, setIsOpenModal] = React.useState(() => {
    if (onOpen) {
      return true;
    } else {
      return false;
    }
  });

  const handleClose = () => {
    setIsOpenModal(false);
    navigate('/');
  };

  // useEffect(() => {
  //   if (isOpenModal) {
  //     onOpen();
  //   }
  // }
  // , [isOpenModal, onOpen]);

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onClose={handleClose}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              {/* <Flex */}

              <Stack spacing={8} w={'full'} py={0} px={0}>
                <Heading fontSize={'xl'}>401 Unauthorized</Heading>

                <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  // boxShadow={'lg'}
                  p={8}
                >
                  <h1>
                    You are not authorized to view this page. Please log in or
                    register.
                  </h1>

                  <Stack spacing={4}>
                    <Stack spacing={10}></Stack>
                  </Stack>
                </Box>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
