import React, { useState, useEffect } from 'react';

const WordGenders = ({ outChange, data = [{ word: '', gender: "0", singular:{nominative: "", genitive:"", accusative:""}, plural: {nominative: "", genitive:"", accusative:""} }]} ) => {
    const [wordPairs, setWordPairs] = useState(data);
    const [wordGenders, setWordGenders] = useState(["to","tou","to","ta","twv","ta"]);

    const addWordPair = () => {
        const newWordPairs = [...wordPairs, { word: '', gender: 0 }];
        setWordPairs(newWordPairs);
        outChange(newWordPairs);
    };

    const handleWordPairChange = (index, field, value, sub = "nominative") => {
        const newWordPairs = [...wordPairs];
        if((field == "singular") || (field == "plural"))
            newWordPairs[index][field][sub] = value;
        else
            newWordPairs[index][field] = value;
        setWordPairs(newWordPairs);
        outChange(newWordPairs);

        if(field == "gender"){
            if(value == "0")
                setWordGenders(["το","του","το","τα","των","τα"]);
            else if(value == "1")
                setWordGenders(["ο","του","τον","οι","των","τους"]);
            else if(value == "2")
                setWordGenders(["η","της","την","οι","των","τις"]);
        }
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

                <label>{wordGenders[0]}</label>
                <input
                type="text"
                placeholder="Nominative"
                value={pair.english}
                onChange={(e) => handleWordPairChange(index, 'singular', e.target.value, 'nominative')}
                className="pairs-input"
                />
                <label>{wordGenders[1]}</label>
                <input
                type="text"
                placeholder="genitive"
                value={pair.english}
                onChange={(e) => handleWordPairChange(index, 'singular', e.target.value, 'genitive')}
                className="pairs-input"
                />
                <label>{wordGenders[2]}</label>
                <input
                type="text"
                placeholder="accusative"
                value={pair.english}
                onChange={(e) => handleWordPairChange(index, 'singular', e.target.value, 'accusative')}
                className="pairs-input"
                />


                <label>{wordGenders[3]}</label>
                <input
                type="text"
                placeholder="Nominative"
                value={pair.english}
                onChange={(e) => handleWordPairChange(index, 'plural', e.target.value, 'nominative')}
                className="pairs-input"
                />
                <label>{wordGenders[4]}</label>
                <input
                type="text"
                placeholder="genitive"
                value={pair.english}
                onChange={(e) => handleWordPairChange(index, 'plural', e.target.value, 'genitive')}
                className="pairs-input"
                />
                <label>{wordGenders[5]}</label>
                <input
                type="text"
                placeholder="accusative"
                value={pair.english}
                onChange={(e) => handleWordPairChange(index, 'plural', e.target.value, 'accusative')}
                className="pairs-input"
                />
            </div>
            ))}
            
        </div>
    );
};

export default WordGenders;
