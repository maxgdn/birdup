import * as React from 'react'
import {BirdStore, SightingStore} from './stores';

export const storesContext = React.createContext({
    birdStore: new BirdStore(),
    sightingStore: new SightingStore(),
  });