import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="flex-between h-12 border-b-[1px] border-b-[#3a3f42] lato fixed z-50 w-full bg-dark-1 px-6 py-2 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.png"
          width={30}
          height={30}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        {/* <p className="text-[20px] text-white max-sm:hidden relative right-2">
          ebConf
        </p> */}
        <p className='text-xl space text-gray-500'>Codemeet</p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
