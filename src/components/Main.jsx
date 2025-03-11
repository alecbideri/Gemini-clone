import React, { useContext, useState, useEffect } from 'react';
import { image } from "../assets/assets.js";
import { Code, Compass, Lightbulb, MessageCircle, ImagePlus, Mic, SendHorizonal } from "lucide-react";
import { Context } from "../context/Context.jsx";
import MarkdownRenderer from './MarkDown.jsx';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (showResult && resultData && !loading) {
            setDisplayedText('');
            const lines = resultData.split('\n');
            let lineIndex = 0;
            let currentText = '';

            const typeText = () => {
                if (lineIndex < lines.length) {
                    currentText += (lineIndex > 0 ? '\n' : '') + lines[lineIndex];
                    setDisplayedText(currentText);
                    lineIndex++;
                    setTimeout(typeText, 50);
                }
            };

            typeText();
        }
    }, [showResult, resultData, loading]);

    return (
        <div className='flex-1 min-h-screen pb-20 relative flex flex-col items-center'>
            <div className='flex items-center justify-between p-2 sm:p-4 lg:p-6 text-gray-500 w-full max-w-[1200px]'>
                <p>Gemini</p>
                <img className='h-[40px] rounded-full w-[40px]' src={image.profile} alt="" />
            </div>

            {/* Result section */}

            {!showResult ? (
                <>
                    <div className='my-10 font-semibold text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                        <p><span className='text-gradient'>Hello, Dev.</span></p>
                        <p>How can I help you today?</p>
                    </div>
                    <div className='cards w-full max-w-[900px] px-2 sm:px-4 lg:px-6'>
                        <div className='card hover:bg-gray-300 relative'>
                            <p className='text-black pr-10'>Suggest beautiful places to see on an upcoming road trip</p>
                            <Compass className='absolute bottom-4 right-4 bg-white p-1 rounded-full' size={24} />
                        </div>
                        <div className='card hover:bg-gray-300 relative'>
                            <p className='text-black pr-10'>Briefly Summarize this concept: urban planning</p>
                            <Lightbulb className='absolute bottom-4 right-4 bg-white p-1 rounded-full' size={24} />
                        </div>
                        <div className='card hover:bg-gray-300 relative'>
                            <p className='text-black pr-10'>Brainstorm team bonding activities for our work retreat</p>
                            <MessageCircle className='absolute bottom-4 right-4 bg-white p-1 rounded-full' size={24} />
                        </div>
                        <div className='card hover:bg-gray-300 relative'>
                            <p className='text-black pr-10'>Improve the readability of the following code</p>
                            <Code className='absolute bottom-4 right-4 bg-white p-1 rounded-full' size={24} />
                        </div>
                    </div>
                </>
            ) : (
                <div className='flex flex-col gap-6 max-h-[70vh] overflow-y-auto w-full max-w-[900px] mx-auto px-2 sm:px-0'>
                    <div className='flex items-center gap-5'>
                        <img className='h-[40px] rounded-full w-[40px]' src={image.profile} alt="user profile along the answer" />
                        <p className='text-gray-700'>{recentPrompt}</p>
                    </div>
                    <div className='flex items-start gap-5'>
                        <img src={image.gemini_logo} alt="Gemini logo" />
                        <MarkdownRenderer
                            markdown={displayedText}
                            isLoading={loading}
                        />
                    </div>
                </div>
            )}

            <div className='w-full max-w-[900px] mx-auto px-2 sm:px-0 mt-auto bottom-0 right-0'>
                <div className='w-full max-w-[900px] py-5 px-2 sm:px-5'>
                    <div className='relative flex items-center justify-between bg-gray-100 px-4 py-3 sm:px-5 sm:py-4 rounded-full mb-3'>
            <textarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder='Enter a prompt here'
                className='flex-1 outline-none bg-transparent text-sm sm:text-base text-gray-700 placeholder-gray-500 resize-none min-h-[40px] max-h-[70vh] overflow-y-auto pr-24 sm:pr-28'
                rows={1}
            />
                        <div className='flex gap-2 sm:gap-3 absolute right-4'>
                            <ImagePlus className='cursor-pointer text-gray-700' size={20} />
                            <Mic className='cursor-pointer text-gray-700' size={20} />
                            {input.trim() && (
                                <SendHorizonal onClick={() => onSent()} className='cursor-pointer text-gray-700' size={20} />
                            )}
                        </div>
                    </div>
                    <p className='text-xs sm:text-sm font-light text-center mt-3 text-gray-500'>
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;