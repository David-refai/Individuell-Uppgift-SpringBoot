import { Flex, VStack } from "@chakra-ui/react";


export default function Home() {
  return (
    <Flex
      // bg={'gray.800'}
      // color={'white'}
      minH={'100vh'}
      direction={'column'}
      align={'center'}
      // justify={'center'}
    >
      <VStack spacing={8} w={'full'} mt={10}></VStack>
    </Flex>
  );
}
