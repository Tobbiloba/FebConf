import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { FaRegFileCode } from "react-icons/fa6";
const FileHeader = ({title, handleTitleChange, handleChangeCode, id, handleDeleteCode, selectedCodeIndex, setSelectedCodeIndex}: {title: string, handleTitleChange: any, id: string, key: string, handleDeleteCode: any, selectedCodeIndex: string, setSelectedCodeIndex: any, handleChangeCode: any}) => {
    const [isActive, setIsActive] = useState(false)
    const [value, setValue] = useState('')
    return (
        <button key={id} onClick={() => (handleChangeCode(id), setSelectedCodeIndex(id))} onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)} className={`${selectedCodeIndex === id && 'border-b'} h-12 py-2 text-[14px] space border-blue-1 justify-center px-3 flex gap-1 items-center`}><FaRegFileCode className="text-white mr-2 text-[14px]" /> 
        <input placeholder='Untitled-1' className='bg-transparent w-20' value={title} onChange={(e) => handleTitleChange(id, e.target.value)}/>
         <IoMdClose className={`text-white ml-2 text-[20px] p-[4px] rounded-md cursor-pointer ${isActive && 'bg-blue-1'}`} onClick={() => handleDeleteCode(id)}/></button>
    )
}

export default FileHeader