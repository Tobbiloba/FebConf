"use client";

import MeetingTypeList from '@/components/MeetingTypeList';
import Link from 'next/link';
import Image from "next/image";
import {
  PiArrowRight,
  PiBookOpenTextLight,
  PiFileThin,
  PiSparkleLight,
  PiTargetLight,
  PiEyeLight, 
  PiPaletteLight,
} from "react-icons/pi";


const tabs = [
  {
    text: "1M+",
    subtext: "monthly users",
    className: 'bg-blue-1 text-blue-500',
    
  },
  {
    text: "150+",
    subtext: "community groups",
    className: 'bg-[#391a03] text-red-500'
  },
  {
    text: "50+",
    subtext: "countries represented",
    className: 'bg-[#4d0576] text-purple-500'
  },

  // {
  //   header: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  //   subheading:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",

  //   image: "/assets/DumpingDoodle.svg",
  // },

  // {
  //   header: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  //   subheading:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",

  //   image: "/assets/CoffeeDoddle.svg",
  // },

];


const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <section className="flex lato size-full lato flex-col gap-5 text-white">

      <div className="md:items-center flex flex-col mb-8">
      <div
        className="
          font-medium
          lg:px-0
          px-8
  text-5xl   
            flex
            justify-center
            xl:font-medium
            
            text-center 
            pt-6
            lato
            "
      >
        FebConf Virtual Meetings
      </div>

      <p
        className="
            text-md
            pt-4
            w-2/3
            mx-auto
            text-center
            text-gray-500
            "
      >
        FebConf Virtual Meetings is an advanced video conferencing platform designed to streamline communication and collaboration for individuals and teams across distances. 
      </p>

      <div className="flex gap-4 pt-6 items-center justify-center">
        <Link href="/">
          <button className="py-2 px-5 rounded-md bg-blue-1">
            <div className="flex items-center justify-center">
              <div className="text-lg">Get Started</div>
              <div>
                <PiArrowRight className="ml-2 " />
              </div>
            </div>
          </button>
        </Link>
      </div>

      <div className="pt-4 lato flex w-[100%] justify-center items-center flex-col ">
        <div className="grid grid-cols-12 md:row-span-2 gap-4 xl:gap-6 mt-8 px-8  md:px-16 xl:px-0 mx-auto w-[100%]">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`
              col-span-12 w-[100%]
              ${
                index <= 2
                  && `md:col-span-6 lg:col-span-4 p-6 rounded-xl flex ${tab.className}`
                  
              }
            `}
            >
              {index <= 2 && (
                <div className={`flex flex-col`}>
                  <div className=" text-5xl font-medium">
                    {tab.text}
                  </div>
                  <div className="text-sm text-white">{tab.subtext}</div>
                </div>
              ) 
              }
            </div>
          ))}
        </div>
      </div>

    
    </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
