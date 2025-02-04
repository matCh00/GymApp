/**
 * Context jakości pobieranych gifów
 */

import { createContext, useState } from "react";
import { QualityModel } from "../models/QualityModel";

/** 
 * stan początkowy 
 * low / high
 */
const initialState = {
  quality: 'low'
}

/** 
 * context
 */
export const QualityContext = createContext<QualityModel>(initialState);

/** 
 * provider 
 */
export const QualityProvider = ({children}: any) => {

  const [quality, setQuality] = useState("high");

  return (
    <QualityContext.Provider value={{ quality, setQuality }}>
      {children}
    </QualityContext.Provider>
  );
};
