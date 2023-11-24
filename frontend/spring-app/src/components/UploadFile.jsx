
import { Box, Button, Flex } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { useDropzone } from 'react-dropzone';
import { FileContext } from './file/File';
import SpinnerShow from './SpinnerShow';


export default function UploadFile({ onclose }) {

  const [files, setFiles] = useState([]);
  const { uploadFiles } = useContext(FileContext);
  const [isLoading, setIsLoading] = useState(false);
  

  const uploadFile = async () => {
    try {
      const response = await uploadFiles(...files);
      setIsLoading(true);
     
      if (response) {
        setIsLoading(false);
        onclose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (files.length > 0) {
      setIsLoading(false);
    }
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files, isLoading]);

const onDrop = useCallback((acceptFile) => {
  const newFiles = acceptFile.map((file) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
  );
  setFiles((prevFiles) => [...prevFiles, ...newFiles]);
}, []);
  

  const thumbs = files.map((file) => (
    <Box
      key={file.name}
      w={100}
      h={100}
      textAlign={'center'}
      p={4}
      borderWidth={2}
      borderRadius={2}
      borderStyle={'dashed'}
      borderColor={'gray.500'}
      // add hover effect
      _hover={{
        borderColor: 'gray.300',
      }}
      
    >
      <img src={file.preview} />
    </Box>
  ));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  // console.log({ ...getInputProps() });
  return (
    <Flex direction="column" align="center" justify="space-between" h="100%">
      <Box
        {...getRootProps()}
        w="100%"
        h={100}
        textAlign={'center'}
        p={4}
        borderWidth={2}
        borderRadius={2}
        borderStyle={'dashed'}
        borderColor={'gray.500'}
        // add hover effect
        _hover={{
          borderColor: 'gray.300',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <FaCloudUploadAlt
              style={{
                fontSize: '4rem',
                color: 'gray',
              }}
            />

            <Flex align={'center'} justify={'center'} color={'gray.600'}>
              Drag file drop some files here, or click to select files
            </Flex>
          </div>
        )}
      </Box>

      <Flex
        w="100%"
        h="100%"
        mt={6}
        align={'center'}
        justify={'center'}
        color={'gray.600'}
      >
        {isLoading ? (
          <SpinnerShow url={'/upload'} />
        ) : (
          <Flex
            w="100%"
            h="100%"
            align={'center'}
            justify={'center'}
            wrap={'wrap'}
          >
            {thumbs}
          </Flex>
        )}

      </Flex>

      <Box w="100%" h="100%" align={'center'} justify={'center'} mt={12}>
      <Button variant="outline" mr={3} onClick={onclose}>
        Cancel
      </Button>
      <Button colorScheme="blue" onClick={uploadFile}>
        Upload
        </Button>
      </Box>
    </Flex>
  );
}


