'use client'
import React, { useState } from 'react'
import { v4 as uuid } from "uuid";
import Editor from '@/components/Editor'
import { cn } from '@/lib/utils'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
const page = () => {
  const [mode, setMode] = useState('create')
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('')
  const id = uuid()
  const router = useRouter()

  const handleGenerateId =() => {
    setRoomId(id)
  }
// const username = "Tobbie"
  const handleLinkClick = () => {
    if (username && roomId) {
        router.push(`/code-editor/${roomId}?username=${username}`);
    } else {
        alert('Please enter a username');
    }
};
  return (
    <div className={cn('h-fit container max-w-[70rem] py-20 space text-white flex items-center justify-between')}>
      {/* <Editor /> */}
      <div className='rounded-xl shadow- shadow-black h-[90%] bg-dark-1 flex flex-col items-center justify-evenly px-[2.5rem]'>
        <div className='text-center'>
          <h1 className='relative z-10 text-lg md:text-7xl font-[500] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-blue-1  text-center'>Explore Our Code Editor</h1>
          {/* <h1 className='text-5xl text-gray-400'>Explore Our Code Editor</h1> */}
          <p className='mt-6 text-gray-500'>Unlock your creativity and bring your ideas to life with our intuitive and powerful code editor. Write, edit, and debug your code seamlessly, whether you're a beginner or an experienced developer. With features designed to streamline your workflow and enhance productivity, coding has never been this enjoyable.</p>
        </div>
        <div className='flex flex-col gap-5 w-[100%] mt-16 max-w-[35rem]'>
           <div>
           <input className='w-[100%] outline-none border border-blue-1 rounded-md py-3 bg-transparent px-4' placeholder='Room ID *' value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
           {
            mode == "create" && !roomId && <button onClick={handleGenerateId} className='bg-blue-1 mt-2 px-2 py-1 text-[13px] rounded-md'>Generate ID</button>
           }
           </div>
         
          <input className='w-[100%] outline-none border mt0 border-blue-1 rounded-md py-3 bg-transparent px-4' placeholder='Username *' value={username} onChange={(e) => setUsername(e.target.value)}/>

          <div className='flex justify-evenly my-2 items-center'>
            <button onClick={() => setMode('join')} className={`${mode == "join" && "border-b"} cursor-pointer py-1`}>Join Room</button>
            <button onClick={() => setMode('create')} className={`${mode == "create" && "border-b"} cursor-pointer py-1`}>Create Room</button>
          </div>

          <button onClick={handleLinkClick}  className='rounded-xl py-3 mt-6 bg-blue-1'>{mode == "create" ? "Create" : "Join"} Room</button>
         
        </div>
      </div>

      {/* <div className='h-[100%] w-3/12 border-l-[1px] border-gray-500'></div> */}
      {/* <img src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='w-4/12 h-[80%] border object-cover rounded-2xl' /> */}
    </div>
  )
}

export default page
