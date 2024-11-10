import React, { useState, useEffect } from 'react';
import "./addactivities.css"; 
import WordPairs from './activitySetups/wordPairs';
import TextWithWordList from "./activitySetups/textWords"
import ItemList from './activitySetups/listItems';
import WordGenders from "./activitySetups/wordGenders"
import SentPairs from './activitySetups/sentPairs'

const AddActivites = () => {
    const [currentState, setCurrentState] = useState(0);
    const [outJSON, setoutJSON] = useState({name:"", section: 0, type:"", data:[]});
    const [componet, setComponent] = useState();
    


    const questions = [
        { id: 1, question: 'Section', type:'buttons'},
        { id: 2, question: 'Activity Name', type:'text'},
        { id: 3, question: 'Activity Setup', type:''}
    ];

    const handleDataChange = (out) => {
        setoutJSON({
            ...outJSON,
            data: out,
        });
    };

    const activityType = [
        [
            {name: "Write", type:"listSound", section:0},
            {name: "Match", type:"listSound", section:0},
            {name: "Order", type: <ItemList outChange={handleDataChange} data={outJSON.data.length > 0 ? outJSON.data : [""]}/>, section:0}], //Alphabet
        [
            {name: "Convert", type: <WordPairs outChange={handleDataChange} data={outJSON.data.length > 0 ? outJSON.data : [{A:"",B:""}]}/>, section:1},
            {name: "Match", type: <WordPairs outChange={handleDataChange} data={outJSON.data.length > 0 ? outJSON.data : [{A:"",B:""}]}/>, section:1},
            {name: "Fill in the Blanks", type: <TextWithWordList outChange={handleDataChange} initialText={outJSON.data.length > 0 ? outJSON.data.text : ""} initialWords={outJSON.data.length > 0 ? outJSON.data.words : []}/>, section:1}], //Vocabulary
        [
            {name: "Convert", type: <SentPairs outChange={handleDataChange}/>, section:2},
            {name: "Structure", type:"sentElements", section:2}], //Sentences
        [
            {name: "Gender", type: <WordGenders outChange={handleDataChange}/>, section:3},
            {name: "Plural", type: <WordPairs outChange={handleDataChange} options = {{A: "Singular", B: "Plural"}} data={outJSON.data.length > 0 ? outJSON.data : [{A:"",B:""}]}/>, section:3},
            {name: "Word NGA", type: "wordNGA", section:3},
            {name: "Sentence NGA", type: "sentNGA", section:3}], //Tenses
        [
            {name: "Topic", type:"text", section:4},
            {name: "Word Practice", type:"list", section:4}], //Writing
        [
            {name: "Text", type:"none", section:5}] //Reading
    ];
    
    const handleSectionInput = (id) => {
        setoutJSON({
            ...outJSON,
            section: id,
            type: activityType[id][0].name
        });

        var read = activityType[id].find(item => item.name === activityType[id][0].name);
        setComponent(read.type);
    };

    const handleNameChange = (e) => {
        const { value } = e.target;
        setoutJSON({
            ...outJSON,
            name: value,
        });
    };

    const handleTypeChange = (e) => {
        const { value } = e.target;
        setoutJSON({
            ...outJSON,
            type: value,
        });

        var read = activityType[outJSON.section].find(item => item.name === value);
        setComponent(read.type);
    };
    
    const goToNext = () => {
        if (currentState < questions.length - 1) {
            setCurrentState(currentState + 1);
        }
    };

    const goToPrevious = () => {
        if (currentState > 0) {
            setCurrentState(currentState - 1);
        }
    };

    const buildCombobox = (items) => items.map((i, id) => {
        return (
            <option
                value={i.name}
            >
            {i.name}
            </option>
        );
    });

    console.log(outJSON);
    return (
        <div className="add-container">
          <h2>{questions[currentState].question}</h2>
          <form>
            {currentState == 0 ? ( //Initial buttons to select section
              <div className="add-btn-container">
                <button type="button" onClick={() => handleSectionInput(0)} className={outJSON.section == 0 ? "add-btn-section-active" : "add-btn-section" }>
                    <img src={`/images/alphIcon.PNG`} alt="Route icon" className="add-btn-section-button-img"/>
                    <label>Alphabet</label>
                </button>
                <button type="button" onClick={() => handleSectionInput(1)} className={outJSON.section == 1 ? "add-btn-section-active" : "add-btn-section" }>
                    <img src={`/images/wordIcon.png`} alt="Route icon" className="add-btn-section-button-img"/>
                    <label>Vocabulary</label>
                </button>
                <button type="button" onClick={() => handleSectionInput(2)} className={outJSON.section == 2 ? "add-btn-section-active" : "add-btn-section" }>
                    <img src={`/images/sentenceIcon.png`} alt="Route icon" className="add-btn-section-button-img"/>
                    <label>Sentences</label>
                </button>
                <button type="button" onClick={() => handleSectionInput(3)} className={outJSON.section == 3 ? "add-btn-section-active" : "add-btn-section" }>
                    <img src={`/images/tensesIcon.png`} alt="Route icon" className="add-btn-section-button-img"/>
                    <label>Tenses</label>
                </button>
                <button type="button" onClick={() => handleSectionInput(4)} className={outJSON.section == 4 ? "add-btn-section-active" : "add-btn-section" }>
                    <img src={`/images/writingIcon.png`} alt="Route icon" className="add-btn-section-button-img"/>
                    <label>Writing</label>                </button>
                <button type="button" onClick={() => handleSectionInput(5)} className={outJSON.section == 5 ? "add-btn-section-active" : "add-btn-section" }>
                    <img src={`/images/readingIcon.png`} alt="Route icon" className="add-btn-section-button-img"/>
                    <label>Reading</label>
                </button>
              </div>
            ) : currentState == 1 ? ( //Enter activity name
                <div className="add-name-container">
                    <input
                    className="add-name-input"
                    type={questions[currentState].type}
                    value={outJSON.name || ''}
                    onChange={handleNameChange}
                    autoFocus
                    />
                    <div className="add-combobox">
                        <select onChange={handleTypeChange}>
                            {buildCombobox(activityType[outJSON.section])}
                        </select>
                    </div>
                </div>
            ) : ( //Data Input
              <div>
                {componet}
              </div>
            )}

            <div className="add-btns-form">
                {currentState > 0 && (
                    <button type="button" onClick={goToPrevious} className="add-btn-previous">
                    Previous
                    </button>
                )}
                
                {currentState < questions.length - 1 ? (
                    <button type="button" onClick={goToNext} className="add-btn-next"> 
                    Next
                    </button>
                ) : (
                    <button type="button" onClick={() => console.log('Form submitted:', outJSON)} className="add-btn-submit">
                    Submit
                    </button>
                )}
            </div>
          </form>
        </div>
    );
};

export default AddActivites;