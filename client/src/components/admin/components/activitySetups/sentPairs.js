import React, { useState, useEffect } from 'react';

const SentPairs = ({ outChange, data = [{ A: '', B: '' }]} ) => {
    const [wordPairs, setWordPairs] = useState(data);

    const addWordPair = () => {
        const newWordPairs = [...wordPairs, { A: '', B: '' }];
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
            <label>Define all Pairs (English) (Greek)</label>
            <button type="button" className="pairs-btn" onClick={addWordPair}>
                Add Pair
            </button>
            <br></br>
            {wordPairs.map((pair, index) => (
            <div key={index} className="pairs-input-container">
                <label>{index+1}: </label>
                <input
                type="text"
                placeholder={pair.A}
                value={pair.english}
                onChange={(e) => handleWordPairChange(index, 'A', e.target.value)}
                className="pairs-input-sent"
                />
                <label> </label>
                <input
                type="text"
                placeholder={pair.B}
                value={pair.greek}
                onChange={(e) => handleWordPairChange(index, 'B', e.target.value)}
                className="pairs-input-sent"
                />
            </div>
            ))}
            
        </div>
    );
};

export default SentPairs;
