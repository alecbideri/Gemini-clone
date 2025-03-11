import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Main from './components/Main.jsx';

const App = () => {
    const [extended, setExtended] = useState(false);

    return (
        <div className="flex h-screen w-screen bg-white text-gray-700 overflow-hidden">

            <Sidebar extended={extended} setExtended={setExtended} />


            <main
                className={`flex-1 transition-all duration-300 ease-in-out overflow-auto ${
                    extended
                        ? 'ml-[200px] sm:ml-[220px] md:ml-[250px] max-[575px]:ml-0 max-[575px]:w-0 max-[575px]:overflow-hidden'
                        : 'ml-[60px] sm:ml-[80px]'
                }`}
            >
                <Main />
            </main>
        </div>
    );
};

export default App;