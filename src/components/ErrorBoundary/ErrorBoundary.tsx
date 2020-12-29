import React, { Component, PropsWithChildren, ComponentType, ErrorInfo } from 'react';
import ErrorComponent from '../Error';

interface ErrorBoundaryProps {
  FallbackComponent?: ComponentType<any>;
  onError?: (error: Error, componentStack: string) => void;
}

interface ErrorBoundaryState {
  error?: Error;
}

class ErrorBoundaryComponent extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error: error };
  }
  /**
   *
   */
  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { onError } = this.props;
    if (onError) {
      try {
        onError(error, info ? info.componentStack : '');
      } catch (error) {}
    }
  }

  render() {
    const { children, FallbackComponent = ErrorComponent } = this.props;
    const { error } = this.state;
    if (error != null) {
      return <FallbackComponent />;
    }

    return <>{children}</>;
  }
}

export default ErrorBoundaryComponent;
