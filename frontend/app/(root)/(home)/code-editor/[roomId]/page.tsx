// 'use client'
// import React from 'react'
// import { useParams } from 'next/navigation';
// import Editor from '@/components/Editor';
// import { useRouter } from 'next/router';
// const page = () => {
//     const { roomId } = useParams();
//     const router = useRouter();
//     const { username } = router.query;
//     console.log(username)
//   return (
//     <div>
//         {/* <Editor /> */}
//     </div>
//   )
// }


'use client'


// Import `useRouter` from 'next/router', not 'next/navigation'
import { useParams,  useSearchParams } from 'next/navigation';
import Editor from '@/components/Editor';
import { cn } from '@/lib/utils';
const Page = () => {
    // Change `useParams` to `useRouter` for Next.js 12+
const {roomId} = useParams();

const searchParams = useSearchParams()
 
  const username = searchParams.get('username')
    // const searchParams = useSearchParams()
    // console.log(router)
    // const { roomId } = router.;
    // const { username } = router.query;

    // console.log(username);

    return (
        <div className={cn('h-[calc(100vh-48px)] relative overflow-y-hidden')}>
            <Editor />
        </div>
    );
};

export default Page;





