'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';
import Editor from './Editor';
import { LiaLaptopCodeSolid } from "react-icons/lia";
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('grid');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showEditor, setShowEditor] = useState(true)
  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    // <section className="relative h-screen bg-dark-1 w-full overflow-hidden text-white">
    //   <div className='flex relative'>
    //     <div className="absolute top-3 right-3 w-[30vw] z-1000 flex items-center justify-center">
    //       <div className=" flex size-full max-w-[570px] w-[30vw]  items-center">
    //         <CallLayout />
    //       </div>
    //       <div
    //         className={cn('h-[calc(100vh-86px)] hidden ml-2', {
    //           'show-block': showParticipants,
    //         })}
    //       >
    //         <CallParticipantsList onClose={() => setShowParticipants(false)} />
    //       </div>
    //     </div>
    //     <div className='w-[100vw] h-[100vh]'>
    //       <Editor />
    //     </div>

    //   </div>


    //   <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
    //     <CallControls onLeave={() => router.push(`/`)} />

    //     <DropdownMenu >
    //       <div className="flex items-center py-1">
    //         <DropdownMenuTrigger className="cursor-pointer rounded-md h-fit bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
    //           <LayoutList size={20} className="text-white" />
    //         </DropdownMenuTrigger>
    //       </div>

          
    //       <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
    //         {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
    //           <div key={index}>
    //             <DropdownMenuItem
    //               onClick={() =>
    //                 setLayout(item.toLowerCase() as CallLayoutType)
    //               }
    //             >
    //               {item}
    //             </DropdownMenuItem>
    //             <DropdownMenuSeparator className="border-dark-1" />
    //           </div>
    //         ))}
    //       </DropdownMenuContent>
    //     </DropdownMenu>
        
    //     <CallStatsButton />

    //     <div className='bg-[#19232d] p-2 rounded-md'>
    //         <LiaLaptopCodeSolid className='text-xl'/>
    //       </div>
    //     <button onClick={() => setShowParticipants((prev) => !prev)}>
    //       <div className=" cursor-pointer rounded-md bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
    //         <Users size={20} className="text-white" />
    //       </div>
    //     </button>
    //     {!isPersonalRoom && <EndCallButton />}
    //   </div>
    // </section>

    <section className="relative h-screen w-full overflow-hidden text-white">
    <div className="relative flex size-full items- justify-center">
      <div className={`flex flex-col size-full ${showEditor ? "max-w-[450px] w-[100%] absolute z-[100] top-72 left-0" : "max-w-[1000px]"} items-center`}>
        <CallLayout />
      </div>
      <div
        className={cn('h-[calc(100vh-86px)] hidden ml-2', {
          'show-block': showParticipants,
        })}
      >
        <CallParticipantsList onClose={() => setShowParticipants(false)} />
      </div>

      {
        showEditor && <div className={cn('w-[100vw]')}>
          <Editor />
        </div>
      }
    </div>
    {/* video layout and call controls */}
    <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
      <CallControls onLeave={() => router.push(`/`)} />

      <DropdownMenu>
        <div className="flex items-center">
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
          {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
            <div key={index}>
              <DropdownMenuItem
                onClick={() =>
                  setLayout(item.toLowerCase() as CallLayoutType)
                }
              >
                {item}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-dark-1" />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <CallStatsButton />
      <div className='bg-[#19232D] p-[8px] cursor-pointer hover:bg-white/30 text-[22px] rounded-full' onClick={() => setShowEditor(!showEditor)}>
        <LiaLaptopCodeSolid />
      </div>
      <button onClick={() => setShowParticipants((prev) => !prev)}>
        <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
          <Users size={20} className="text-white" />
        </div>
      </button>
      {!isPersonalRoom && <EndCallButton />}
    </div>
  </section>
  );
};

export default MeetingRoom;
