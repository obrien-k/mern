import React, { useState } from "react";

const AutoComplete = ({ inputValue, suggestions, onInputChange, onSelect }) => {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  const handleInputChange = (e) => {
    onInputChange(e.target.value);
    setDropdownVisibility(true);
  };

  const handleSuggestionClick = (suggestion) => {
    onSelect(suggestion);
    setDropdownVisibility(false);
  };

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.startsWith(inputValue)
  );

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {isDropdownVisible && (
        <ul>
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
