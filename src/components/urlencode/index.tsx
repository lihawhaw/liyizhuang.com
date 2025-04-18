import React, { useState } from 'react'
import Message from '../message'

const UrlEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState('')

  const encodeUrl = () => {
    const encoded = encodeURIComponent(input)
    setOutput(encoded)
  }

  const decodeUrl = () => {
    let decoded = input
    let previous = ''
    while (decoded !== previous) {
      previous = decoded
      decoded = decodeURIComponent(previous)
    }
    setOutput(decoded)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage('Copied to clipboard!')
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }

  const encodeAndCopyUrl = () => {
    const encoded = encodeURIComponent(input)
    setOutput(encoded)
    copyToClipboard(encoded)
  }

  const decodeAndCopyUrl = () => {
    let decoded = input
    let previous = ''
    while (decoded !== previous) {
      previous = decoded
      decoded = decodeURIComponent(previous)
    }
    setOutput(decoded)
    copyToClipboard(decoded)
  }

  return (
    <div className='mx-auto mt-12 flex w-full max-w-4xl flex-col items-center'>
      <textarea
        rows={3}
        className='mb-5 w-full rounded border bg-gray-800 p-2 text-white'
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ resize: 'none' }}
      />
      <div className='mb-5 flex space-x-4'>
        <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600' onClick={encodeUrl}>
          Encode
        </button>
        <button className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600' onClick={decodeUrl}>
          Decode
        </button>
        <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600' onClick={encodeAndCopyUrl}>
          Encode & Copy
        </button>
        <button className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600' onClick={decodeAndCopyUrl}>
          Decode & Copy
        </button>
      </div>
      <textarea
        rows={3}
        className='w-full rounded border bg-gray-800 p-2 text-white'
        value={output}
        readOnly
        style={{ resize: 'none' }}
      />
      {message && <Message message={message} onClose={() => setMessage('')} />}
    </div>
  )
}

export default UrlEncoderDecoder
