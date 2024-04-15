"use client"

import { useFormState } from "react-dom"

import TestingTextAPI from "./testText";
import TestingVideoAPI from "./testVideo";
import TestingAudioAPI from "./testAudio";
import TestingParsingAPI from "./testParsing";
const TestingAPI = ({ isLoggedIn }: any) => {

    return (
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'space-around' }}>
            <TestingTextAPI />
            {/* <div>
            <TestingVideoAPI />
        </div>
        <div>
            <TestingAudioAPI />
        </div> */}
        </div>
    )
}

export default TestingAPI