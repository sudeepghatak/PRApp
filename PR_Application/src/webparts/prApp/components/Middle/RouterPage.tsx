import * as React from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';
export const RouterPage = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<FirstComponent/>}/>
            <Route path='/second' element={<SecondComponent/>}/>
            <Route path='/third' element={<ThirdComponent/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
