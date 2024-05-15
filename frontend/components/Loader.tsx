import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex-center h-screen bg-dark-1 w-full">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loader;
