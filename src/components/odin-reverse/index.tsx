import React, { useState } from 'react'
import Message from '../message'

const OdinReverse: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [message, setMessage] = useState('')

  const reverseNode = (value: string) => {
    return value.split('.').reverse().join('.')
  }

  const handleReverseNode = () => {
    const encoded = reverseNode(input)
    setOutput(encoded)
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

  const handleReverseAndCopy = () => {
    const encoded = reverseNode(input)
    setOutput(encoded)
    copyToClipboard(encoded)
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
        <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600' onClick={handleReverseNode}>
          Reverse
        </button>
        <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600' onClick={handleReverseAndCopy}>
          Reverse & Copy
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

export default OdinReverse
