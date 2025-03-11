import React from 'react';
import { CircleHelp, History, Menu, MessageSquareMore, Plus, Settings } from "lucide-react";

const Sidebar = ({ extended, setExtended }) => {
    return (
        <div
            className={`h-screen flex flex-col justify-between transition-all overflow-hidden ${
                extended
                    ? 'w-[200px] sm:w-[220px] md:w-[250px] max-[575px]:w-full'
                    : 'w-[60px] sm:w-[80px]'
            } bg-[#f0f4f9] p-2 sm:p-4`}
        >
            <div className='cursor-pointer flex flex-col gap-4'>
                <Menu
                    className='flex text-gray-700'
                    onClick={() => setExtended((prev) => !prev)}
                    size='20'
                />
                <div className='flex gap-2 items-center mt-4 sm:mt-8 bg-gray-200 px-2 sm:px-3 py-1 sm:py-2 rounded-full cursor-pointer transition-all overflow-hidden w-fit'>
                    <Plus size='20' className='text-gray-700' />
                    {extended ? <p className='text-sm sm:text-base text-gray-700'>New chat</p> : null}
                </div>
                {extended ? (
                    <div className='flex flex-col mt-4 sm:mt-10'>
                        <p className='text-sm sm:text-base text-gray-700'>Recent</p>
                        <div className='mt-2 sm:mt-5 flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1 sm:py-2 text-gray-700 cursor-pointer hover:bg-gray-300 rounded-full'>
                            <MessageSquareMore size='20' />
                            <p className='text-xs sm:text-sm'>What is react..</p>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className='flex flex-col gap-1 sm:gap-2'>
                <div className='flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 hover:bg-gray-300 rounded-full cursor-pointer transition-all overflow-hidden w-fit'>
                    <CircleHelp size='20' className='text-gray-700' />
                    {extended ? <p className='text-sm sm:text-base text-gray-700'>Help</p> : null}
                </div>
                <div className='flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 hover:bg-gray-300 rounded-full cursor-pointer transition-all overflow-hidden w-fit'>
                    <History size='20' className='text-gray-700' />
                    {extended ? <p className='text-sm sm:text-base text-gray-700'>Activity</p> : null}
                </div>
                <div className='flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 hover:bg-gray-300 rounded-full cursor-pointer transition-all overflow-hidden w-fit'>
                    <Settings size='20' className='text-gray-700' />
                    {extended ? <p className='text-sm sm:text-base text-gray-700'>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;