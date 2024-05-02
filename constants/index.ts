import { SlHome } from "react-icons/sl";
import { TbCalendarShare } from "react-icons/tb";
import { TbCalendarCheck } from "react-icons/tb";
import { LuCalendarMinus } from "react-icons/lu";
import { LuCalendarPlus } from "react-icons/lu";
import { CiVideoOn } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";
import { GoCodespaces } from "react-icons/go";
import { GoHistory } from "react-icons/go";
export const sidebarLinks = [
  {
    title: 'Video',
    subLinks: [
      {
        imgURL: SlHome,
        route: '/',
        label: 'Home',
      },
    
      {
        imgURL: TbCalendarShare,
        route: '/upcoming',
        label: 'Upcoming',
      },
      {
        imgURL: LuCalendarMinus,
        route: '/previous',
        label: 'Previous',
      },
      {
        imgURL: CiVideoOn,
        route: '/recordings',
        label: 'Recordings',
      },
      {
        imgURL: IoAdd,
        route: '/personal-room',
        label: 'Personal Room',
      },
    ]
  },
  {
    title: 'Code Editor',
    subLinks: [
      {
        imgURL: IoCodeSlash,
        route: '/code-editor',
        label: 'Code Editor',
      },
      {
        imgURL: GoHistory,
        route: '/saved-codes',
        label: 'Saved Codes',
      },
    ]
  }
];

export const avatarImages = [
  '/images/avatar-1.jpeg',
  '/images/avatar-2.jpeg',
  '/images/avatar-3.png',
  '/images/avatar-4.png',
  '/images/avatar-5.png',
];
