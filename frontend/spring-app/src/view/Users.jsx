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
import UpdateForm from './UpdateForm';
export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
    const { getAllUsers, deleteUser } = useContext(AuthContext);
    
    

  const DeleteUser = async (id) => {
    try {
      // Delete the user
      await deleteUser(id);

      // Fetch the updated list of users
      const updatedUsers = await getAllUsers();

      // Update the state with the new list of users
      setUsers(updatedUsers);

      setIsLoading(false);
    } catch (error) {
      if (error) {
        setError(error.response?.data.message);
      }
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setIsLoading(true);
        setError('');
        setUsers(res);
      } catch (error) {
        if (error) {
          setError(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [isLoading, getAllUsers]);

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
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
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

                  {/* <Button colorScheme="teal" variant="outline">
                              B
                              
                      Edit
                    </Button> */}
                  <BasicUsage name={'Edit'} userId={user.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

function BasicUsage({ name, userId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { updateUser, getUserById, getAllUsers } = useContext(AuthContext);
  const [userUpdate, setUserUpdate] = useState({
    id: userId,
    name: '',
    email: '',
    password: '',
    roles: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUserById(userId);
        setIsLoading(true);
        setUserUpdate((prevUser) => ({
          ...prevUser,
          id: userId,
          name: res?.name || '',
          email: res?.email || '',
          password: '',
          roles: res?.roles || '',
        }));

        let list = await getAllUsers();
        setUserUpdate(list);

        setIsLoading(true);
        setError('');
        setUserUpdate(res);
      } catch (error) {
        if (error) {
          setError(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [getAllUsers, getUserById, userId, updateUser]);

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
      setIsLoading(true);
      await updateUser(userUpdate);
      const updateList = await getAllUsers();
      setUserUpdate(updateList);
      onClose();
      window.location.reload();
    } catch (error) {
      setError(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>{name}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
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
                  value={userUpdate.email}
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
                  value={userUpdate.password}
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
                    name="role"
                    onChange={(e) => handleRoleChange(e)}
                    value={userUpdate.roles}
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                    <option value="MANAGER">Manager</option>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
