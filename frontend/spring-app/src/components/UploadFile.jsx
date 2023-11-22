
import { Box, Flex } from '@chakra-ui/react';
import { useCallback } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { useDropzone } from 'react-dropzone';
import axios from 'axios';


export default function UploadFile() {
  const onDrop = useCallback(async (acceptFile)  => {
    const formData = new FormData();
    formData.append('file', acceptFile[0]);

      await axios.post('/api/v1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      console.log('file uploaded successfully');
    }
    ).catch((err) => {
      console.log(err);

    });

  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
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
  );
}


