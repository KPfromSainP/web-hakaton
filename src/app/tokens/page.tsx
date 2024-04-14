'use client'

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";


async function getTokens(token_type: string | null, token: string | null) {
  let response = await fetch('http://127.0.0.1:8000/tokens/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `${token_type} ${token}`
    },
    cache: "reload",
  });
  return await response.json()
}

const TokensPage = () => {
  const [tokens, setTokens] = useState([])
  const [userToken, setUserToken] = useState()
  const [userTokenType, setUserTokenType] = useState()

  const [createToken, setCreatetoken] = useState()

  useEffect(() => {
    const session: Storage = window.localStorage
    setUserToken(session.getItem('token'))
    setUserTokenType(session.getItem('token_type'))

    getTokens(session.getItem('token'), session.getItem('token_type')).then(val => setTokens(val))
  }, [])

  const handleClick = (e:any) => {
    var foo = document.getElementsByClassName('hideToken');

    for (var i = 0; i < foo.length; i++) {
      foo[i].classList.remove("active");
    }

    e.currentTarget.classList.add("active");
  };

  const handleDelete = async (id : string) => {
    let response = await fetch('http://127.0.0.1:8000/tokens/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `${token_type} ${token}`
      },
      cache: "reload",
    }); 
  } //todo допилить удаление кнопки

  const tokens_list = tokens.map((token) => {
    return (
      <li key={token['id']} style={{listStyleType: 'none', display: 'inline'}}>
          <p>{token['name']} - </p>
          <div className="hideToken" onClick={handleClick}>{token['token']}</div>
          <div className="delete_token" onClick={handleClick}>{token['token']}</div>
      </li>
  )
  })

  async function create_token( prevState: { error: undefined | string }, formData: FormData ) {
    const formName = formData.get("name") as string;

    const response = await fetch('http://127.0.0.1:8000/tokens/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `${userTokenType} ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name": formName})
    });
  }

  const [state, formAction] = useFormState<any, FormData>(create_token, undefined);

  return (
    <div className="table_of">

      <button></button>
      {createToken && <form action={formAction}> <input type="text" name="name" required placeholder="Название токена" /><input type="submit" /></form>}
      <ul>
        {tokens_list}
      </ul>
    </div>
  );
};

export default TokensPage;
