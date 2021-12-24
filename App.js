import React, { useEffect } from 'react';
import { YellowBox,   } from 'react-native';
import Navigation from './app/navigations/Navigation';
import { firebaseApp } from './app/utils/firebase';
import { decode, encode } from 'base-64';

console.disableYellowBox = true;

export default function App() {

  YellowBox.ignoreWarnings(['Setting a timer']);


  if(!global.btoa) global.btoa = encode;
  if(!global.atob) global.atob = decode;

  return (
    <Navigation/>
  );
}
