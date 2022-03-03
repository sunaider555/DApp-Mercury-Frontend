import React from 'react';
import { Container } from '@material-ui/core';
import useEagerConnect from '../../hooks/useEagerConnect';
import backImg from '../../assets/img/pixta.jpg'

import Footer from '../Footer';
import Nav from '../Nav';

const Page: React.FC = ({ children }) => {
  useEagerConnect();
  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: `#260d0d`, backgroundImage:`url('/img/pixta.jpg') `,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }} >

      <Nav />
      <Container maxWidth="lg" style={{ paddingBottom: '5rem' }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Page;
