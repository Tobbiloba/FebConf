'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { IoIosSearch } from "react-icons/io";
const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 border-r-[1px] border-[#3a3f42] top-0 flex h-screen w-fit flex-col  justify-between lato bg-dark-1 p-2 pt-20 text-white max-sm:hidden lg:w-[264px]">
      <div className='relative flex justify-center items-center'>
      <IoIosSearch className='absolute left-2 z-10 mt-1 text-[#3a3f42] text-[22px]'/>
        <input placeholder='search' className='border text-[18px] font-[300] placeholder:text-[#3a3f42] text-[#3a3f42] h-10 w-[100%] pl-8 border-[#3a3f42] rounded-md bg-transparent' />
        
      </div>
      <div className="flex flex-1 flex-col gap-8 mt-4">
        {sidebarLinks.map((item) => {
          // const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (

            <div>
              <h1 className='text-gray-500'>{item.title}</h1>
              <div className='mt-2'>
                {item.subLinks.map((items) => {
                  const isActive = pathname === items.route || pathname.startsWith(`${items.route}/`);

                  return (
                    <Link
                      href={items.route}
                      key={items.label}
                      className={cn(
                        'flex gap-4 items-center text-gray-400 px-4 py-2 rounded-lg justify-start',
                        {
                          'bg-blue-1 text-blue-400': isActive,
                        }
                      )}
                    >

                      <items.imgURL className='tex-xl' />
                      <p className="text-[16px] max-lg:hidden">
                        {items.label}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
