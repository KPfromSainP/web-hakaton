"use client"

import { useState } from "react";
import { useFormState } from "react-dom"


const TestingVideoAPI = () => {

    async function handleSubmit(prevState: { error: undefined | string }, formData: FormData) {

        if (!file){
            alert("Файл не выбран")
            return
        }

        const formData2 = new FormData();
        formData2.append('file', file);
        formData2.append('type', 'blur');

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        requestHeaders.set('X-API-Key', encodeURI(formData.get("token_id") as string));

        let response = await fetch(`http://127.0.0.1:8000/model/videoFilter?type=blur`, {
            method: 'POST',
            headers: requestHeaders,
            body: formData2
        });
        let answer = await response.json();
        setText(answer['_file'])
    }

    function handleChange(e: any) {
        setFile(e.target.files[0])
    }

    const [state, formAction] = useFormState<any, FormData>(handleSubmit, undefined);
    const [file, setFile] = useState('');
    const [text, setText] = useState('');

    return (
        <form action={formAction}>
            <input type="password" name="token_id" required placeholder="Токен" />

            <input type="file" name="video" onChange={handleChange}/>

            <button type="submit">Отправить</button>
            <div style={{ overflow: 'hidden' }}>{text}</div>
            {state?.error && <p>{state.error}</p>}
        </form>
    )
}

export default TestingVideoAPI