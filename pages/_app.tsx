import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { WorkspaceProvider } from './contexts/useWorkspace';
import '../styles/globals.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <WorkspaceProvider>
          <TaskProvider>
            <Component {...pageProps} />
          </TaskProvider>
        </WorkspaceProvider>
      </ThemeProvider>
    </Provider>
  );
}