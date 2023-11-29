import { Flex } from '@chakra-ui/react';
import FilesTable from './FilesTable';
import { useContext } from 'react';
import SpinnerShow from '../components/SpinnerShow';
import { FileContext } from '../components/file/File';

export default function Home() {
  const { isLoading } = useContext(FileContext);
  


  return (
    
    <Flex direction={'column'} w={'full'}>
      {<SpinnerShow url={'/'} isLoading={isLoading} />}
      <FilesTable  />
    </Flex>
  );
}
