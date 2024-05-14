import React, { useState } from 'react';
import Message from '../message';

const UrlEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [message, setMessage] = useState('');

  const encodeUrl = () => {
    const encoded = encodeURIComponent(input);
    setOutput(encoded);
  };

  const decodeUrl = () => {
    let decoded = input;
    let previous = '';
    while (decoded !== previous) {
      previous = decoded;
      decoded = decodeURIComponent(previous);
    }
    setOutput(decoded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setMessage("Copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  const encodeAndCopyUrl = () => {
    const encoded = encodeURIComponent(input);
    setOutput(encoded);
    copyToClipboard(encoded);
  };

  const decodeAndCopyUrl = () => {
    let decoded = input;
    let previous = '';
    while (decoded !== previous) {
      previous = decoded;
      decoded = decodeURIComponent(previous);
    }
    setOutput(decoded);
    copyToClipboard(decoded);
  };

  return (
    <div className="flex flex-col items-center mt-12 w-full max-w-4xl mx-auto">
            <textarea
              rows={3}
              className="w-full mb-5 p-2 border rounded bg-gray-800 text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ resize: 'none' }}
            />
      <div className="flex space-x-4 mb-5">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={encodeUrl}>Encode</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={decodeUrl}>Decode</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={encodeAndCopyUrl}>Encode & Copy</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={decodeAndCopyUrl}>Decode & Copy</button>
      </div>
      <textarea
        rows={3}
        className="w-full p-2 border rounded bg-gray-800 text-white"
        value={output}
        readOnly
        style={{ resize: 'none' }}
      />
      {message && <Message message={message} onClose={() => setMessage('')} />}
    </div>
  );
};

export default UrlEncoderDecoder;
