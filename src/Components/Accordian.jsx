import React, { useEffect, useState, useRef } from 'react';
import { accordian_Data_Api } from '../utils/constants';
import gsap from 'gsap';

const Accordian = () => {
  const [showIndex, setShowIndex] = useState([]);
  const [showans, setShowans] = useState(null);
  const followerRef = useRef(null);
  const [modal, setModal] = useState(false);

  const toggleModelBtn = () => {
    setModal(!modal);
  };

  const toggleButton = (index) => {
    setShowans(showans === index ? null : index);
  };

  const fetchapi = async () => {
    const data = await fetch(accordian_Data_Api);
    const json = await data.json();
    setShowIndex(json?.results || ['cant able to fetch']);
  };

  useEffect(() => {
    fetchapi();

    const moveFollower = (e) => {
      const { clientX, clientY } = e;
      gsap.to(followerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.2,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', moveFollower);

    return () => {
      window.removeEventListener('mousemove', moveFollower);
    };
  }, []);

  return (
    <div className='relative'>
      {/* Background Content */}
      <div
        className={`h-screen w-screen bg-gray-700 text-white overflow-auto relative transition-all duration-300 ${
          modal ? 'blur-sm' : ''
        }`}
      >
        <div
          ref={followerRef}
          className='fixed top-0 left-0 w-5 h-5 rounded-full bg-blue-500 pointer-events-none z-50'
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <div className='border border-white p-2 w-full flex flex-col items-center relative z-10'>
          {showIndex.map((items, index) => (
            <div key={index} className='w-full max-w-[600px]'>
              <button
                className='flex justify-center items-center p-2 border border-x-lime-300 rounded-lg m-2 bg-slate-100 hover:bg-slate-300 text-black font-bold text-xl w-full'
                onClick={() => toggleButton(index)}
              >
                Q-{items.question || items}
              </button>
              {showans === index && (
                <div className='transition-all duration-500 ease-in-out bg-yellow-100 text-black font-bold p-5 rounded-lg'>
                  {items.correct_answer || ''}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='border border-black h-32 w-36 bg-slate-600 flex justify-center items-center rounded-lg m-16'>
          <button
            className='px-4 py-2 bg-green-700 hover:bg-green-800 text-black font-bold text-xl rounded-2xl'
            onClick={toggleModelBtn}
          >
            Click Me!
          </button>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className='fixed inset-0 flex justify-center items-center z-50'>
          <div className='w-96 border border-white flex flex-col justify-center items-center rounded-lg p-5 bg-gray-900 text-white shadow-2xl'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsum
              officiis error modi veritatis. Earum amet voluptat sit amet
              consectetur adipisicing elit. Non ipsum officiis error modi
              veritatis. Earum amet voluptates quo harum ducimus.
            </p>
            <button
              className='px-4 py-2 bg-green-700 hover:bg-green-800 text-black font-bold text-xl rounded-2xl m-5'
              onClick={() => setModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordian;
