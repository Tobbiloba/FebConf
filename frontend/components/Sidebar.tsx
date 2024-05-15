'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from 'react';
const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname.split("/")[1])
  const [showFull, setShowFull] = useState(true)
  return (
    <section className={`sticky left-0 border-r-[1px] border-[#3a3f42] top-0 flex h-screen w-fit flex-col  justify-between lato bg-dark-1 p-2 pt-20 text-white max-sm:hidden ${showFull ? "lg:min-w-[264px]" : "lg:w-[68px]"}`}>
      {
        showFull ? <div className='relative flex justify-center items-center'>
        <IoIosSearch className='absolute left-2 z-10 mt-1 text-[#3a3f42] text-[22px]'/>
          <input placeholder='search' className='border text-[18px] font-[300] placeholder:text-[#3a3f42] text-[#3a3f42] h-10 w-[100%] pl-8 border-[#3a3f42] rounded-md bg-transparent' />
          
        </div> : <div className='border border-[#3a3f42] rounded-md py-2 flex justify-center items-center'>
        <IoIosSearch className='text-[#3a3f42] text-[22px] mx-auto'/>
        </div>
      }
      <div className={`flex flex-1 flex-col gap-8 mt-4 ${
                          showFull ? '' : 'py-'
                        }`}>
        {sidebarLinks.map((item) => {
          return (

            <div key={item.title}>
              {
                showFull && <h1 className='text-gray-500'>{item.title}</h1>
              }
              <div className='mt-2'>
                {item.subLinks.map((items) => {
                  const isActive = pathname === items.route || pathname.startsWith(`${items.route}/`);

                  return (
                    <Link
                      href={items.route}
                      key={items.label}
                      className={cn(
                        `flex gap-4 items-center text-gray-400 px-4 py-2 rounded-lg justify-start ${
                          showFull ? '' : 'py-4'
                        }`,
                        {
                          'bg-blue-1 text-blue-400': isActive,
                        },
                        
                      )}
                    >

                      <items.imgURL className={` ${items.label == "Personal Room" ? "text-3xl" : "text-lg"}`} />
                      {
                        showFull && <p className="text-[16px] max-lg:hidden">
                        {items.label}
                      </p>
                      }
                    </Link>
                  )
                })}
              </div>
            </div>
          );
        })}

        <div onClick={() => setShowFull(!showFull)} className='w-fit cursor-pointer mt-auto p-4 ml-auto bg-blue-1 rounded-xl shadow-md shadow-'>
        <FaArrowLeftLong className={`${!showFull && 'rotate'}`}/>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
