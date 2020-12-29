import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Providers: React.FC = ({ children }) => {
  return <Router basename={window.env.CONTEXT_PATH}>{children}</Router>;
};

export default Providers;
