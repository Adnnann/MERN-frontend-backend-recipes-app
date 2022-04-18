import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import './App.css';
import MainRouter from './MainRouter';


function App() {
  return (
    <Container style={{overflow:'none', scrollBehavior:'unset'}}>
      <MainRouter />
    </Container>

  );
}

export default App;
