import React from "react";

import { HelmetProvider } from 'react-helmet-async';
const Title = ({
  title = "Chat",
  description = "This is the Chat App called Chappu",
}) => {
  return (
    <HelmetProvider>
      <title>{title}</title>
      <meta name="description" content={description} />
    </HelmetProvider>
  );
};

export default Title;
