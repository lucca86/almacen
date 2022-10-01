
import type { AppProps } from 'next/app'
import { Box, ChakraProvider, Container, Divider, Heading, Image, Text, VStack } from '@chakra-ui/react';
import theme from '../theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          borderRadius='sm'
          backgroundColor='white'
          boxShadow='md'
          maxWidth='container.xl'
          padding={4}
        >
          <VStack marginBottom={6} >
            <Image borderRadius={9999} src='//placehold.it/128x128'></Image>
            <Heading>Almacen</Heading>
            <Text>Almacen by Goncy</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>

  )
}

export default App
