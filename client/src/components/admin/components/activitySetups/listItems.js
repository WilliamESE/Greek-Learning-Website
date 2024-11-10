import React, { useState, useEffect } from 'react';

const ItemList = ({ outChange, data = []} ) => {
    const [items, setItems] = useState(data);

    const addItem = () => {
        const newItems = [...items, [""]];
        setItems(newItems);
        outChange(newItems);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
        outChange(newItems);
    };

    // Remove a word input
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="setup-container">
            <label>Define all items in order the user must enter them</label>
            <button type="button" className="pairs-btn" onClick={addItem}>
                Add Item
            </button>
            <br></br>
            {items.map((pair, index) => (
            <div key={index} className="pairs-input-container">
                <label>{index+1}: </label>
                <input
                type="text"
                value={pair}
                onChange={(e) => handleItemChange(index, 'A', e.target.value)}
                className="text-words-text"
                />
                <button type="button" onClick={() => removeItem(index)} className="text-words-remove">
                -
                </button>
            </div>
            ))}
        </div>
    );
};

export default ItemList;
