import React from 'react'
import Restaurent from './Components/Basics/Restaurent';

const App = () => {
  return (
    <div>       {/* or <></> --- react fragment  */}
      <Restaurent/>
      <p className='Description'>now,you entered project {5+3}</p>
      <MyApp/> 
    </div>
  )
};
const MyApp =() =>{
  return(
    <>
    <p>here we are decleare our main code </p>
    </>
  )
};

export default App
