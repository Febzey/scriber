import { FaEnvelope, FaTimes, FaMinus, FaArrowLeft } from 'react-icons/fa';
import Link from "next/link";
const CheckEmailComponent = () => {
  return (
    <div className="w-full h-screen absolute right-0 left-0 top-0 z-40 ">
      <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-900 bg-opacity-70 backdrop-blur fixed">
        <Link href="/" className="z-40">
          <FaArrowLeft className="absolute left-16 top-16 text-6xl text-neutral-400 duration-150 hover:text-neutral-100" />
        </Link>
        <div className="bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-border w-full lg:w-1/3 relative lg:h-[40vh] h-screen lg:rounded border-transparent lg:border-4">
          <div className="w-full h-full flex flex-col gap-3 items-center justify-center text-center bg-black bg-opacity-60 p-3">
            <h1 className="text-white text-5xl font-bakbak">Verify Your Email</h1>
            <p className="text-md text-neutral-100">A confirmation link has been sent to your email address.</p>
            <p className="text-sm text-neutral-400">You will be redirected after verification.</p>
            <div className="flex flex-row gap-0 w-full items-center justify-center text-white text-2xl">
              <FaMinus /><FaMinus /><FaMinus /><FaMinus /><FaEnvelope className="px-4 text-8xl" /><FaMinus /><FaMinus /><FaMinus /><FaMinus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckEmailComponent;
