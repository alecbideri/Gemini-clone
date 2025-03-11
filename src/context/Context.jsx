import { createContext, useEffect, useState } from "react";
import run from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [response, setResponse] = useState("");
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index , nextWord) =>{

    }

    const onSent = async (prompt) =>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)

        const responseText = await run(input);
        setResultData(responseText); // ✅ Changed: Ensuring only string is stored
        setLoading(false);
        setInput('');
    }



    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
