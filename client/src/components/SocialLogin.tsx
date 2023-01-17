import { useState } from 'react';

interface props {
  onSubmit: Function
}

const SocialLogins = ( {onSubmit}: props) => {
  const providers = ['google', 'github'];
  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <>
      <div className='mx-auto my-6 text-sm text-center text-gray-400'>Or login with</div>
      {providers.map((provider) => {
        return (
          <div key={provider}>
            <button
              type='submit'
              className='flex justify-center cursor-pointer rounded-full mb-5 border-2 border-[#8a8a8a] px-6 py-2 w-4/5 bg-white bg-no-repeat mx-auto'
              onClick={() => {
                setIsRedirecting(true);
                onSubmit(provider);
              }}
              key={provider}
            > 
            <img className='w-5' src={`${provider}.png`}/>
              {/* turns "google" to "Google" */}
              <p className='w-full'>{provider.replace(/^\w/, (c) => c.toUpperCase())}</p>
            </button>
          </div>
        );
      })}
      {isRedirecting && <div className='text-gray text-sm mb-1'>Redirecting...</div>}
    </>
  );
};

export default SocialLogins;
