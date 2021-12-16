import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

test('renders meowstagram', () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );

  expect(getByText(/Meowstagram/i)).toBeInTheDocument();
});
