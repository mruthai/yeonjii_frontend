import React from 'react'
import { Link } from 'react-router-dom'

const Login:React.FC = () => {
  return (
    <form className="max-w-[700px] md:mx-auto mx-3 my-16 md:p-4 p-6 border rounded-lg " >
        <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-lg">
          Login to your account
        </h2>
        <p>Don't have an account?<Link to='/signup' className="underline text-blue-500"> Sign up</Link> </p>
      </div>
    <div className='flex flex-col py-2'>
      <label className='py-2 font-medium'>Email Address</label>
      <input
        id="email address"
        onChange={(e) => (e.target.value)}
        className='border p-3'
        type='email'
        placeholder="email address"
        autoComplete="email address"
      />
    </div>
    <div className='flex flex-col py-2'>
      <label className='py-2 font-medium'>Password</label>
      <input
        id= "password" 
        onChange={(e) => (e.target.value)}
        className='border p-3'
        type="password"
        placeholder="Password required"
        autoComplete="current-password"
      />
    {/*  {error && <p className="text-center text-red-600">{error}</p>} */}
    </div>
    <button className='rounded-lg bg-primary-1 hover:bg-primary-2 w-full p-4 my-7 text-white'>
      Login
    </button>
   

  </form>
    
  )
}

export default Login