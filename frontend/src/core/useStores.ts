import * as React from 'react'
import { storesContext } from './storesContext'

export const useStores = () => React.useContext(storesContext);