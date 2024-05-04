'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
  buttonText?: string;
  buttonIcon?: string;
  buttonStyle?: string;
  titleStyle: string;
  smallStyle: string;
}

const HomeCard = ({ className, img, title, description, buttonText, titleStyle, smallStyle, buttonIcon, buttonStyle, handleClick }: HomeCardProps) => {
  return (
    <section
      className={cn(
        ' px-4 lato py-6 gap-8 flex flex-row justify-between items-center w-[100%] border-2 xl:max-w-[730px] min-h-[260px] rounded-[14px] cursor-pointer',
        className
      )}
    >
      <div className="flex flex-col gap-2 pl-4 w-[100%]">
        <h1 className={`text-2xl font-bold h-24 flex items-end ${titleStyle}`}>{title}</h1>
        <p className={`text-lg font-normal my-2 ${smallStyle}`}>{description}</p>
        <button onClick={handleClick} className={`${buttonStyle} w-[100%] flex gap-4 items-center justify-center py-3 `}>{buttonText}
          <img src={buttonIcon} alt='' className='h-4' />
        </button>
      </div>
      <div className="flex-center p-2 glassmorphism  rounded-[10px]">
        <img src={img} alt="meeting" className='h-[100%] rounded-xl max-w-[17.5rem] w-auto'/>
      </div>


    </section>
  );
};

export default HomeCard;
