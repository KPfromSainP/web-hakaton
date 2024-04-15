"use client"

import { useFormState } from "react-dom"

import TestingTextAPI from "./testText";
import TestingVideoAPI from "./testVideo";
import TestingAudioAPI from "./testAudio";
import TestingParsingAPI from "./testParsing";
const TestingAPI = ({isLoggedIn}:any) => {

    async function handleSubmit( prevState: { error: undefined | string }, formData: FormData ) {

        if (typeof formData.get('text') === 'string') {
            
        }

        let response = await fetch('http://127.0.0.1:8000/tokens/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `token=${formData.get("token_id")}&text=${formData.get("text")}&video=${formData.get("video")}&audio=${formData.get("audio")}`
        });
    }

    const [state, formAction] = useFormState<any, FormData>(handleSubmit, undefined);

  return (
    <div style={{width: '100vw', display: 'flex', justifyContent: 'space-around'}}>
        <div>
            <TestingTextAPI />
        </div>
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