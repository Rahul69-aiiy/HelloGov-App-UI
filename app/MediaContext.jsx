import React, { createContext, useContext, useState } from 'react';

const MediaContext = createContext(null);

export const MediaProvider = ({ children }) => {
  const [images, setImages] = useState([]); // array of URIs

  const addImages = (newImages = []) => {
    if (!Array.isArray(newImages)) newImages = [newImages];
    setImages(prev => [...prev, ...newImages]);
  };

  const clearImages = () => setImages([]);

  return (
    <MediaContext.Provider value={{ images, setImages, addImages, clearImages }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const ctx = useContext(MediaContext);
  if (ctx === null) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return ctx;
};

export default MediaContext;
