// REACT
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// MATERIAL UI
import 'typeface-roboto';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

// REDUX STORE
import store from './state/store';

// COMPONENTS
import ErrorBoundary from './components/ErrorBoundary';
import App from './components/App';

render(
    <ErrorBoundary>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('main'),
);
