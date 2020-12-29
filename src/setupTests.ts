// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';

window.env = {
  ENVIRONMENT: 'development',
  CONTACT_US: 'CONTACT_US',
  BACKEND_ENDPOINT: 'BACKEND_ENDPOINT',
  CONTEXT_PATH: '',
};
