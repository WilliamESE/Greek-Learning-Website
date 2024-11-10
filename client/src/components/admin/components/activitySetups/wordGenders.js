import React, { useState, useEffect } from 'react';

const WordGenders = ({ outChange, data = [{ word: '', gender: 0 }]} ) => {
    const [wordPairs, setWordPairs] = useState(data);

    const addWordPair = () => {
        const newWordPairs = [...wordPairs, { word: '', gender: 0 }];
        setWordPairs(newWordPairs);
        outChange(newWordPairs);
    };

    const handleWordPairChange = (index, field, value) => {
        const newWordPairs = [...wordPairs];
        newWordPairs[index][field] = value;
        setWordPairs(newWordPairs);
        outChange(newWordPairs);
    };

    return (
        <div className="setup-container">
            <label>Define all Words to be included in this practice set</label>
            <button type="button" className="pairs-btn" onClick={addWordPair}>
                Add Word
            </button>
            <br></br>
            {wordPairs.map((pair, index) => (
            <div key={index} className="pairs-input-container">
                <label>{index+1}: </label>
                <input
                type="text"
                placeholder="Greek"
                value={pair.english}
                onChange={(e) => handleWordPairChange(index, 'word', e.target.value)}
                className="pairs-input"
                />
                <select onChange={(e) => handleWordPairChange(index, 'gender', e.target.value)}>
                    <option value="0">Object</option>
                    <option value="1">Masculine</option>
                    <option value="2">Feminimim</option>
                </select>
            </div>
            ))}
            
        </div>
    );
};

export default WordGenders;
