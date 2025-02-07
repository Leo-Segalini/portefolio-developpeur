import { render, screen, act } from '@testing-library/react';
import { LoaderProvider, useLoader } from '../LoaderContext';

// Composant de test
function TestComponent() {
  const { isLoading, progress, message, startLoading, updateProgress, stopLoading } = useLoader();

  return (
    <div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'not loading'}</div>
      <div data-testid="progress">{progress}</div>
      <div data-testid="message">{message}</div>
      <button onClick={() => startLoading('Test loading')}>Start</button>
      <button onClick={() => updateProgress(50)}>Update</button>
      <button onClick={stopLoading}>Stop</button>
    </div>
  );
}

describe('LoaderContext', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('provides loading state and functions', () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    expect(screen.getByTestId('loading-state')).toHaveTextContent('not loading');
    expect(screen.getByTestId('progress')).toHaveTextContent('0');
  });

  it('starts loading with message', () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    act(() => {
      screen.getByText('Start').click();
    });

    expect(screen.getByTestId('loading-state')).toHaveTextContent('loading');
    expect(screen.getByTestId('message')).toHaveTextContent('Test loading');
  });

  it('updates progress', () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    act(() => {
      screen.getByText('Update').click();
    });

    expect(screen.getByTestId('progress')).toHaveTextContent('50');
  });

  it('stops loading', () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    // Démarrer le chargement
    act(() => {
      screen.getByText('Start').click();
    });

    expect(screen.getByTestId('loading-state')).toHaveTextContent('loading');

    // Arrêter le chargement
    act(() => {
      screen.getByText('Stop').click();
      jest.advanceTimersByTime(300);
    });

    expect(screen.getByTestId('loading-state')).toHaveTextContent('not loading');
    expect(screen.getByTestId('progress')).toHaveTextContent('0');
  });
}); 