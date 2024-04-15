"use client"

import { useState } from "react";
import { useFormState } from "react-dom"


const TestingParsingAPI = () => {

    async function handleSubmit( prevState: { error: undefined | string }, formData: FormData ) {
        let response = await fetch(`http://127.0.0.1:8000/model/journalCommentsFilter?path=${formData.get("ref")}&type=blur`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-API-Key': formData.get("token_id")
            },
        });
        let answer = await response.json();
        setText(answer)

    }

    const [state, formAction] = useFormState<any, FormData>(handleSubmit, undefined);
    const [text, setText] = useState('');

  return (
    <form action={formAction}>
        <input type="password" name="token_id" required placeholder="Токен" />

        <input name="ref" required placeholder="Ссылка на ТЖ статью"/>

        <button type="submit">Отправить</button>
        <div style={{overflow:'hidden'}}>{text}</div>
        {state?.error && <p>{state.error}</p>}
    </form>
    )
}

export default TestingParsingAPI