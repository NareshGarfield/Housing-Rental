'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
      <div className="flex justify-between items-center gap-x-4">    
        <motion.img src="/images/mysite.ico" alt="my site" height={40} width={40} 
          drag dragSnapToOrigin
          whileDrag={{scale:1.8}}
          whileHover={{scale:1.2}}
          className="rounded-full cursor-pointer"
          onDoubleClick={()=> window.open("https://portfolio-ndt.vercel.app/", "_blank")}/>  
        </div>
        <div 
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 
            px-4 rounded-full hover:bg-neutral-100 transition 
            cursor-pointer">
          SS Real Estate
        </div>
        <div 
        onClick={toggleOpen}
        className="p-4 md:py-1 md:px-2 border-[1px] 
          border-neutral-200 flex flex-row items-center 
          gap-3 rounded-full cursor-pointer hover:shadow-md 
          transition">
            <motion.div
            whileHover={{scale:1.2}}
            >
          <AiOutlineMenu />
          </motion.div>
          <motion.div 
          whileHover={{scale:1.2}}
          className="md:w-auto">
            <Avatar src={currentUser?.image} />
          </motion.div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="absolute rounded-xl shadow-md
            w-[40vw] md:w-3/4 bg-white 
            overflow-hidden right-0 
            top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="My trips" 
                  onClick={() => router.push('/trips')}
                />
                <MenuItem 
                  label="My favorites" 
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem 
                  label="My reservations" 
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem 
                  label="My properties" 
                  onClick={() => router.push('/properties')}
                />
                <MenuItem 
                  label="Your Home" 
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;