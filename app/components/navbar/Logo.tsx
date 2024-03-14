'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      className="md:w-auto cursor-pointer" 
      src="/images/logo.png" 
      height="55" 
      width="55" 
      alt="Logo" 
    />
   );
}
 
export default Logo;
