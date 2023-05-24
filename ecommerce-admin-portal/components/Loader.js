import React from 'react'
import { BounceLoader, ClockLoader } from 'react-spinners';

export const BounceSpinLoader=()=>{
  return (
    <BounceLoader color ={'#1E3A8A'} speedMultiplier={2}/>
  );
}

const Loader = () => {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
  return (
    <div className='flex justify-center items-center h-screen'>
        <ClockLoader 
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
      />
    </div>
  )
}

export default Loader
