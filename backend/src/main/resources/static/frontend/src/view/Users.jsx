/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/Auth';
import SpinnerShow from '../components/SpinnerShow';
export default function Users({
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  isLoading,
}) {
  const [users, setUsers] = useState([]);
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);
  const [error, setError] = useState('');

  const DeleteUser = async (id) => {
    try {
      setIsLoadingLocal(true);
      // Delete the user
      await deleteUser(id);

      // Fetch the updated list of users
      const updatedUsers = await getAllUsers();

      // Update the state with the new list of users
      setUsers(updatedUsers);

      setIsLoadingLocal(false);
    } catch (error) {
      if (error) {
        setError(error.response?.data.message);
      }
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoadingLocal(true);
      const res = await getAllUsers();
      setUsers(res);
      setIsLoadingLocal(false);
      setError('');
    } catch (error) {
      if (error) {
        setError(error.response?.data.message);
      }
    } finally {
      setIsLoadingLocal(false);
    }
  };
  useEffect(() => {
    if (!isLoadingLocal) {
      fetchUsers();
    }
  }, []);

  return (
    <Flex direction="column" align="space-between" justify="center">
      {isLoading && <SpinnerShow url={'/users'} />}
      <TableContainer m={16}>
        <Table variant="simple">
          {/* <TableCaption>Users</TableCaption> */}
          <Thead>
            <Tr>
              <Th fontSize="lg">Name</Th>
              <Th fontSize="lg">Email</Th>
              <Th fontSize="lg">Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user) => (
              <Tr key={user.id}>
                <Td>{user?.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.roles}</Td>
                <Td p={3} display="flex" gap={3} alignItems="center" w="100%">
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => DeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                  <BasicUsage
                    name={'Edit'}
                    userId={user.id}
                    getAllUsers={getAllUsers}
                    getUserById={getUserById}
                    updateUser={updateUser}
                    isLoading={isLoading}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

function BasicUsage({
  name,
  userId,
  getAllUsers,
  isLoading,
  updateUser,
  getUserById,
}) {
  const [error, setError] = useState('');
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);

  const [userUpdate, setUserUpdate] = useState({
    id: userId,
    name: '',
    email: '',
    password: '',
    roles: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchUsers = async (e) => {
    try {
      setIsLoadingLocal(true);

      let list = await getAllUsers();
      setUserUpdate(list);

      setIsLoadingLocal(false);
      setError('');
    } catch (error) {
      if (error) {
        setError(error.response?.data.message);
      }
    }
  };

  const update = async () => {
    const res = await getUserById(userId);
    console.log(res);
    setUserUpdate((prevUser) => ({
      ...prevUser,
      id: userId,
      name: res.name,
      email: res.email,
      password: '',
      roles: res.roles,
    }));
      
  };

  const handleChange = (e) => {
    setUserUpdate((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (e) => {
    setUserUpdate((prevUser) => ({
      ...prevUser,
      roles: [e.target.value],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        id: userId,
        name: userUpdate.name,
        email: userUpdate.email,
        password: userUpdate.password,
        roles: userUpdate.roles,
      });

      const updateList = await getAllUsers();
      if (!isLoading) {
        setUserUpdate(updateList);
        onClose();
          window.location.reload();
      }
    } catch (error) {
      setError(error.response?.data.message);
    }
  };

  const fun = () => {
    onOpen();
    update();
  }

  return (
    <>
      <Button
        onClick={fun}
        colorScheme="teal"
        variant="outline"
        isLoading={isLoadingLocal}
        loadingText="Submitting"
      >
        {name}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Please enter user name"
                  value={userUpdate.name}
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="Please enter user email"
                  value={userUpdate?.email}
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  placeholder="password"
                  value={userUpdate?.password}
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormControl id="role">
                  <FormLabel>Role</FormLabel>
                  <Select
                    placeholder="Select role"
                    name="roles"
                    onChange={handleRoleChange}
                    value={userUpdate?.roles}
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Submitting"
              spinnerPlacement="end"
              type={'submit'}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
