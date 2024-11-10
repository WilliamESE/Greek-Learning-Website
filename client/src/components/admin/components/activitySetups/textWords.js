import React, { useState, useEffect } from 'react';

const TextWithWordList = ({outChange, initialText = '', initialWords = [] }) => {
  const [longText, setLongText] = useState(initialText);
  const [words, setWords] = useState(initialWords.length > 0 ? initialWords : []);

  // Handle text input change
  const handleTextChange = (e) => {
    setLongText(e.target.value);
    var out = [
        {text: e.target.value},
        {words: words}
    ];

    outChange(out);
  };

  // Handle individual word change
  const handleWordChange = (index, value) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);

    var out = [
        {text: longText},
        {words: newWords}
    ];
    outChange(out);
  };

  // Add a new word input
  const addWord = () => {
    setWords([...words, '']);
  };

  // Remove a word input
  const removeWord = (index) => {
    setWords(words.filter((_, i) => i !== index));
  };

  return (
    <div className="setup-container">
      <h3>Enter text here with %(#) to indicate a blank where # is the word that should be there</h3>
      <textarea
        value={longText}
        onChange={handleTextChange}
        placeholder= {longText}
        rows="10"
        className="text-longtext"
      />
        <br></br>
      <label>Word List</label>
      <button type="button" onClick={addWord} className="text-words-add">
        Add Word
      </button><br></br>
      {words.map((word, index) => (
        <div key={index} className="text-words">
            <label className="text-label">{index+1}: </label>
          <input
            type="text"
            value={word}
            className="text-words-text"
            onChange={(e) => handleWordChange(index, e.target.value)}
            placeholder={`Word ${index + 1}`}
          />
          <button type="button" onClick={() => removeWord(index)} className="text-words-remove">
            -
          </button>
        </div>
      ))}
    </div>
  );
};

export default TextWithWordList;
