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
  Box,
  Image,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import SpinnerShow from '../components/SpinnerShow';
import { FileContext } from '../components/file/File';

export default function FilesTable({ user}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { fetchFiles, downloadFile, deleteFile } = useContext(FileContext);
  const [file, setFile] = useState([]);




  const DownloadFile = async (id, fileType, fileName) => {
    try {
      // Assuming downloadFile is an asynchronous function that initiates the file download
      const file = await downloadFile(id);

      // Assuming fetchFiles is an asynchronous function that fetches the updated files
      const updatedFiles = await fetchFiles();

      // Create a Blob from the fetched data
      const blob = new Blob([file], { type: fileType });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}`;
      document.body.appendChild(a);

      // Programmatically trigger a click event on the link to start the download
      a.click();

      // Remove the link from the DOM after the download
      document.body.removeChild(a);

      // Update the state with the fetched files
      setFile(updatedFiles);
      setIsLoading(false);
      console.log(updatedFiles);
    } catch (error) {
      // Handle errors
      if (error) {
        setError(error.response?.data.message);
      }
    }
  };

  const handlerDelete = async (id) => {
    try {
      // Delete the user
      await deleteFile(id);

      // Fetch the updated list of users
      const updatedFiles = await fetchFiles();

      // Update the state with the new list of users
      setFile(updatedFiles);

      setIsLoading(false);
    } catch (error) {
      if (error) {
        setError(error.response?.data.message);
      }
    }
  };
    useEffect(() => {
      const getAllFiles = async () => {
        try {
          const res = await fetchFiles();
          setError('');
          setFile(res);
          setIsLoading(false);
        } catch (error) {
          if (error) {
            setError(error.response?.data.message);
          }
        }
      };

      getAllFiles().then(r => r);

  
    }, [isLoading, fetchFiles, deleteFile ]);
  

 

  const fileImages = {
    jpg: './images/image-icon.png',
    jpeg: './images/image-icon.png',
    png: './images/image-icon.png',
    gif: './images/image-icon.png',
    svg: './images/image-icon.png',
    webp: './images/image-icon.png',
    doc: './images/docx-image.png',
    docx: './images/docx-image.png',
    odt: './images/docx-image.png',
    pdf: './images/pdf-image.svg',
    epub: './images/epub-image.png',
    zip: './images/zip-image.png',
    txt: './images/text-image.webp',
    pages: './images/text-image.webp',
    rtf: './images/text-image.webp',
    docker: './images/docker-image.png',
    default: './images/file-image.jpg',
  };

  return (
    <Flex direction="column" align="space-between" justify="center">
      {isLoading ? (
        <SpinnerShow url={'/'} isLoading={isLoading} />
      ) : (
        <>
          {error && (
            <Box
              color="white"
              bg="red.500"
              p={3}
              borderRadius="lg"
              w="100%"
              textAlign="center"
              mb={3}
            >
              {error}
            </Box>
          )}
        </>
      )}
      <TableContainer m={16}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th fontSize="md">Name</Th>
              <Th fontSize="md">Type</Th>
              <Th fontSize="md">Size</Th>
              <Th fontSize="md">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {file.map((file) => (
              <Tr key={file.id}>
                <Td>
                  <Image
                    boxSize="30px"
                    objectFit="cover"
                    src={
                      fileImages[file.fileName.split('.').pop().toLowerCase()]
                    }
                  />
                </Td>
                <Td>{file.fileName}</Td>
                <Td>{file.fileType}</Td>
                <Td>
                  {file.size > 1000000
                    ? `${(file.size / 1000000).toFixed(2)} MB`
                    : `${(file.size / 1000).toFixed(2)} KB`}
                </Td>
                <Td p={3} display="flex" gap={3} alignItems="center" w="100%">
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() =>
                      DownloadFile(
                        file.id,
                        file.fileType.split('/')[1],
                        file.fileName
                      )
                    }
                  >
                    Download
                  </Button>

                  {user?.roles[0] === 'ADMIN' && (
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => handlerDelete(file.id)}
                    >
                      Delete
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
