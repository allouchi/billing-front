import React from 'react';
import { RouteComponentProps } from 'react-router';

const NotFound: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  //const contactUs = window.env.CONTACT_US && window.env.CONTACT_US;
  return (
    <h1>Page not found</h1>
  );
};

export default NotFound;
