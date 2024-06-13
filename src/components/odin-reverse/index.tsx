import React, {useState} from 'react'
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
    navigator.clipboard.writeText(text).then(() => {
      setMessage('Copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  const handleReverseAndCopy = () => {
    const encoded = reverseNode(input)
    setOutput(encoded)
    copyToClipboard(encoded)
  }

  return (
    <div className="flex flex-col items-center mt-12 w-full max-w-4xl mx-auto">
      <textarea
        rows={3}
        className="w-full mb-5 p-2 border rounded bg-gray-800 text-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{resize: 'none'}}
      />
      <div className="flex space-x-4 mb-5">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleReverseNode}>Reverse
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleReverseAndCopy}>Reverse
          & Copy
        </button>
      </div>
      <textarea
        rows={3}
        className="w-full p-2 border rounded bg-gray-800 text-white"
        value={output}
        readOnly
        style={{resize: 'none'}}
      />
      {message && <Message message={message} onClose={() => setMessage('')}/>}
    </div>
  )
}

export default OdinReverse
