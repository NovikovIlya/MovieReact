import {render,screen} from '@testing-library/react'

import MainPage from './MainPage'
import { Provider } from 'react-redux'
import store from '../../store'
import { BrowserRouter } from 'react-router-dom'



describe('MainPage component',()=>{
    test('MainPage renders',()=>{
        render( <Provider store={store}>
            <BrowserRouter>
              <MainPage />
            </BrowserRouter>
          </Provider>)
    })
})