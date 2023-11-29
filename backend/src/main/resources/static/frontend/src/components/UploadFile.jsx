
import { Box, Button, Flex } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { useDropzone } from 'react-dropzone';


import { FileContext } from './file/File';



export default function UploadFile({ onclose }) {

  const [files, setFiles] = useState([]);
  const { uploadFiles } = useContext(FileContext);
  const [isLoading, setIsLoading] = useState(false);
  

  const uploadFile = async () => {
    setIsLoading(true);
    try {
      const response = await uploadFiles(...files);
      
     
      if (response) {
    
        onclose();
           setIsLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   
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
      transition="3s ease"
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
 
        {thumbs.length > 0 && (
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
        <Button
          colorScheme="blue"
          isLoading={isLoading}
          loadingText="Loading"
          variant="outline"
          spinnerPlacement="end"
          type="submit"
          onClick={uploadFile}
        >
          Upload
        </Button>
      </Box>
    </Flex>
  );
}


