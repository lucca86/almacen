import { Box, Button, Flex, Grid, Image, Link, Stack, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next'
import { useMemo, useState } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import api from '../product/api';
import { Product } from '../product/types';


interface Props {
  products: Product[];
}

function parseCurrency (value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}


const IndexRoute: React.FC<Props> = ({ products }) => {

  const [cart, setCart] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('')


  const text = useMemo(() => {
    return cart.reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), ``,).concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`)
  }, [cart])

  return (
    <AnimateSharedLayout >
      <Stack spacing={6} >
        <Grid gridGap={6} templateColumns='repeat(auto-fill, minmax(240px, 1fr))'>
          {products.map((product) => (
            <Stack spacing={3} borderRadius='md' padding={4} key={product.id} backgroundColor='gray.100'>
              <Stack spacing={1} >
                <Image
                  alt={product.title}
                  as={motion.img}
                  cursor='pointer'
                  layoutId={product.image}
                  borderTopRadius='md'
                  maxHeight={128}
                  objectFit='cover'
                  src={product.image}
                  onClick={() => setSelectedImage(product.image)}
                />
                <Text>{product.title}</Text>
                <Text 
                  fontSize='sm' 
                  fontWeight='500' 
                  color='green.500'
                >
                 {parseCurrency(product.price)}
                </Text>
              </Stack>
              <Button
                variant='outline'
                colorScheme='primary'
                onClick={() => setCart((cart) => cart.concat(product))}
                size='sm'
              >
                Agregar
              </Button>
            </Stack>
          ))}
        </Grid>
        <AnimatePresence>

        {Boolean(cart.length) && (
          <Flex 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            as={motion.div} 
            bottom={4} 
            alignItems='center'
            justifyContent='center'
            position='sticky'
          >
            <Button
              as={Link}
              href={`https://wa.me/543794331143?text=${encodeURIComponent(text)}`}
              isExternal
              width='100%'
              colorScheme='whatsapp'>Completar pedido ( {cart.length} producto/s)
            </Button>
          </Flex>
        )}
        </AnimatePresence>
      </Stack>
      <AnimatePresence>
        {selectedImage && 
          <Flex 
            key='backdrop' 
            alignItems='center' 
            as={motion.div} 
            backgroundColor='rgba(0,0,0,0.5)' 
            justifyContent='center' 
            layoutId={selectedImage}
            position='fixed'
            top={0}
            left={0}
            height='100%'
            width='100%'
            onClick={() => setSelectedImage('')}
          >
            <Image key='image' src={selectedImage} alt='image' />
          </Flex>}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
};


export const getStaticProps: GetStaticProps = async () => {

  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products
    }
  }
}

export default IndexRoute;
