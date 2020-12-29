/// <reference types="react-scripts" />

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

interface EnvironmentVariables {
  BACKEND_ENDPOINT: string;
  ENVIRONMENT: string;
  CONTACT_US: string;
  CONTEXT_PATH: string;
}

interface Window {
  env: EnvironmentVariables;
}
