import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { FormattedMessage } from 'react-intl';


const ErrorComponent: FunctionComponent<RouteComponentProps> = ({ history }) => {
  //const contactUs = window.env.CONTACT_US && window.env.CONTACT_US;
  return (
   <h1><FormattedMessage id='internalError' /></h1>
  );
};

export default ErrorComponent;
