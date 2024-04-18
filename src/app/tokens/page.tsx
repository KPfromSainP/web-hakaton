'use client'

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";


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

  const { push } = useRouter();

  const [tokens, setTokens] = useState([])
  const [userToken, setUserToken] = useState('')
  const [userTokenType, setUserTokenType] = useState('')

  const [createToken, setCreatetoken] = useState<boolean>()

  useEffect(() => {
    const session: Storage = window.localStorage
    if (typeof session.getItem('token') === 'string') {
      setUserToken(session.getItem('token')!)
      setUserTokenType(session.getItem('token_type')!)

      console.log(userToken)
      console.log(userTokenType)

      getTokens(session.getItem('token_type'), session.getItem('token')).then(val => setTokens(val))
      console.log(tokens)

    }
    else {
      push('/login')
    }

  }, [])

  const handleClick = (e: any) => {
    var foo = document.getElementsByClassName('hideToken');

    for (var i = 0; i < foo.length; i++) {
      foo[i].classList.remove("active");
    }

    e.currentTarget.classList.add("active");
  };

  const handleDelete = async (id: string) => {
    let response = await fetch(`http://127.0.0.1:8000/tokens/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `${userTokenType} ${userToken}`
      },
      cache: "reload",
    });
    getTokens(userTokenType, userToken).then(val => setTokens(val))
  } //todo допилить удаление кнопки


  async function create_token(prevState: { error: undefined | string }, formData: FormData) {
    const formName = formData.get("name") as string;

    const response = await fetch('http://127.0.0.1:8000/tokens/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `${userTokenType} ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "name": formName })
    });
    getTokens(userTokenType, userToken).then(val => setTokens(val))
  }

  const [state, formAction] = useFormState<any, FormData>(create_token, undefined);

  return (
    <div className="table_of">

      <button style={{ width: '150px' }} onClick={() => { setCreatetoken(true) }}>Создайте токен</button>
      {createToken && <form action={formAction}> <input type="text" name="name" required placeholder="Название токена" /><input type="submit" /></form>}
      <ul>
        {tokens.map((token) => {
          return (
            <li key={token['id']} style={{ listStyleType: 'none', display: 'flex' }}>
              <p>{token['name']} - </p>
              <div className="hideToken" onClick={handleClick}>{token['token']}</div>
              <div className="delete_token" onClick={() => handleDelete(token['id'])}> &nbsp;  Удалить токен</div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default TokensPage;
