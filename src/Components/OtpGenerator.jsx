import React, { useState } from 'react';

const OtpGenerator = () => {
  const [getOtp, setGetOtp] = useState(0);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const generateOtp = (length) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    console.log('Generated OTP:', otp);
    setGeneratedOtp(otp); 
  };

  return (
    <div className='flex justify-center items-center flex-col'>
      <button
        onClick={() => generateOtp(getOtp)}
        className='p-4 bg-gray-500 font-bold hover:bg-gray-300 text-black rounded-lg mt-10'
      >
        Generate Otp
      </button>
      <div className='text-red-700 font-normal pt-10'>
        <input
          className='h-10 w-20 ml-9 bg-yellow-300 border border-black'
          type='number'
          placeholder='Digits'
          onChange={(e) => setGetOtp(Number(e.target.value))} 
        />
      </div>
      <div className='mt-5 text-xl font-bold text-green-500'>
        {generatedOtp && `Generated OTP: ${generatedOtp}`}
      </div>
    </div>
  );
};

export default OtpGenerator;
