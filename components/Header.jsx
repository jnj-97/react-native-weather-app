import * as React from 'react';
import {Appbar, Title} from 'react-native-paper';

export default Header = () => {
  return (
    <Appbar.Header style={{backgroundColor: 'skyblue'}}>
      <Title style={{color: 'white'}}>Weather App</Title>
    </Appbar.Header>
  );
};
