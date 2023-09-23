import { render, screen } from '@testing-library/react';
import Search from './Search';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';

const onChange = jest.fn()

describe('Search components',()=>{
    test('Search renders component',()=>{
        render(<Provider store={store}>
            <BrowserRouter>
              <Search placeholder='input'></Search>
            </BrowserRouter>
          </Provider>)
        expect(screen.getByPlaceholderText('input')).toBeInTheDocument()
        // screen.debug()
    })
})