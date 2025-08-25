import { createContext, useContext } from 'react';

// This context will hold a boolean value indicating if the row is hovered.
export const RowHoverContext = createContext(false);

// A custom hook to make it easier to use the context.
export const useRowHover = () => useContext(RowHoverContext);
