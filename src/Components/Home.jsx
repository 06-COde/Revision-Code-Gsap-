// src/Components/Home.js
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { togglePageButton } from '../utils/toggleSlice';

function Home() {
  const [xValue, setXvalue] = useState(0);
  const [yValue, setYvalue] = useState(0);
  const [roti, setRoti] = useState(0);
  const imgRef = useRef();
  const dispatch = useDispatch();

const togglePage = useSelector((state) => state.togglebtn.togglePage);


  useGSAP(() => {
    gsap.to(imgRef.current, {
      x: xValue,
      y: yValue,
      duration: 0.5,
      rotate: roti,
    });
  }, [xValue, roti, yValue]);

  const toggleB =()=>{
    dispatch(togglePageButton());
  }

  return (
    <>
    <nav className=' p-6 relative z-10 h-36 w-full flex justify-between items-center bg-slate-800 text-white'>
        <h1 className='font-bold text-3xl ' >
          Stake
        </h1>
        <div className='flex justify-evenly items-center font-bold'>
          <ul className='flex text-xl  gap-16'>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Login</li>
          </ul>
        </div>
    </nav>
    <button onClick={toggleB} className='p-4 m-5 rounded-lg translate-x-1 transform hover:transition duration-300 font-bold bg-slate-700 hover:bg-gray-500 text-white'>
      TogglePage
    </button>
   { togglePage && <main className='absolute '>
      <button
        className="h-20 w-44 m-10 rounded-lg bg-green-400 text-black font-bold"
        onClick={() => {
          const randomX = gsap.utils.random(-300, 800, 100);
          const randomRotate = gsap.utils.random(-360, 720, 0);
          const randomY = gsap.utils.random(-200, 500, 100);
          setXvalue(randomX);
          setRoti(randomRotate);
          setYvalue(randomY);
        }}
      >
        Animate
      </button>

      <img
        ref={imgRef}
        className="h-20 w-20 rounded-xl"
        src="https://img.freepik.com/free-psd/green-fly-detailed-macro-insect-wings-nature-close-up_84443-40428.jpg?semt=ais_hybrid&w=740"
        alt="fly"
      />
    </main>}
    </>
  );
}

export default Home;
