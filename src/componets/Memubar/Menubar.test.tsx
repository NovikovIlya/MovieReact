import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import  Menubar  from './Menubar';
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';

describe('men', () => {
  it('renders menu', () => {
   render(<Provider store={store}>
        <BrowserRouter>
          <Menubar />
        </BrowserRouter>
      </Provider>);
    expect(screen.getByText('All')).toBeInTheDocument();
  });


});