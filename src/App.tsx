import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [parsed, setParsed] = useState("")
  const [loading, setLoading] = useState(false)
  const textRef = useRef<string>()
  const minifyRef = useRef<boolean>(false)

  const onSubmit = () => {
    setParsed("")
    setLoading(true)

    const body = {
      tags: textRef.current,
      minify: minifyRef.current
    }

    fetch("http://localhost:3000/v1/parse/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => { setParsed(data.result) })
      .catch(err => { console.warn(err) })
      .finally(() => { setLoading(false) })
  }

  return (
    <>
      <h1>TailwindCSS Parser</h1>
      <sub>So that you don't have to install 6000 dependencies 🤨</sub>
      <div>
        <textarea
          className='textarea'
          onInput={e => textRef.current = e.currentTarget.value}
        />
      </div>
      <div>
        <div>
          <label>Minify</label>
          <input onChange={e => minifyRef.current = e.currentTarget.checked} type='checkbox' />
        </div>
        <button
          disabled={loading}
          onClick={onSubmit}
        >
          ↓
        </button>
      </div>
      <div className="card">
        <textarea
          disabled
          readOnly
          className='textarea'
          value={parsed}
        />
      </div>
      <p>NOTE: TailwindCSS provides you with a CSS reset to ensure that their styles are consistent.</p>
      <p>For an input like "w-24" the w-24 style will be right at the bottom.</p>
    </>
  )
}

export default App
