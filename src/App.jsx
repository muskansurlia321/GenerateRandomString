import React, { useState, useCallback, useEffect } from "react";

// Characters that can appear in the random string
const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const MIN_LENGTH = 1;
const MAX_LENGTH = 64;

function App() {
  // useState to store the generated random string
  const [randomString, setRandomString] = useState("");

  // useState to store the user-selected length of the string
  const [stringLength, setStringLength] = useState(16);

  // useState to store any validation error message
  const [error, setError] = useState("");

  // useCallback memoizes the random string generation function so that
  // it is only recreated when its dependencies (stringLength) change.
  const generateRandomString = useCallback(() => {
    // If the current length is invalid, do not generate a new string
    if (
      typeof stringLength !== "number" ||
      Number.isNaN(stringLength) ||
      stringLength < MIN_LENGTH ||
      stringLength > MAX_LENGTH
    ) {
      return;
    }

    let result = "";
    for (let i = 0; i < stringLength; i += 1) {
      const randomIndex = Math.floor(Math.random() * CHARSET.length);
      result += CHARSET[randomIndex];
    }

    // Update the state with the new random string
    setRandomString(result);
  }, [stringLength]); // Dependency array: function is recreated only when stringLength changes

  // useEffect automatically generates a random string:
  // - on the initial render
  // - whenever the generateRandomString function changes
  //   (which effectively means when stringLength changes)
  useEffect(() => {
    if (!error) {
      generateRandomString();
    }
  }, [generateRandomString, error]);

  // Handle changes to the length input field
  const handleLengthChange = (event) => {
    const value = event.target.value;

    // Empty input: allow typing but clear error and do not generate yet
    if (value === "") {
      setStringLength("");
      setError("Please enter a length between 1 and 64.");
      return;
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      setError("Length must be a number.");
      setStringLength("");
      return;
    }

    if (numericValue < MIN_LENGTH || numericValue > MAX_LENGTH) {
      setError(`Length must be between ${MIN_LENGTH} and ${MAX_LENGTH}.`);
      setStringLength(numericValue);
      return;
    }

    // Valid value: clear error and update length
    setError("");
    setStringLength(numericValue);
  };

  // Handle "Generate" button click: explicitly generate a new random string
  const handleGenerateClick = () => {
    generateRandomString();
  };

  const isGenerateDisabled =
    !!error ||
    typeof stringLength !== "number" ||
    Number.isNaN(stringLength) ||
    stringLength < MIN_LENGTH ||
    stringLength > MAX_LENGTH;

  return (
    <div className="app-root">
      <div className="card">
        <h1 className="title">Random String Generator</h1>
        <p className="subtitle">
          Enter the desired length and generate a random string.
        </p>

        <div className="form-group">
          <label htmlFor="length-input" className="label">
            String length (between {MIN_LENGTH} and {MAX_LENGTH})
          </label>
          <input
            id="length-input"
            type="number"
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            value={stringLength}
            onChange={handleLengthChange}
            className="input"
          />
          {error && <p className="error-text">{error}</p>}
        </div>

        <button
          type="button"
          className="button"
          onClick={handleGenerateClick}
          disabled={isGenerateDisabled}
        >
          Generate New String
        </button>

        <div className="output">
          <h2 className="output-label">Generated String</h2>
          <p className="output-value">
            {randomString || "No string generated yet."}
          </p>
        </div>
      </div>

      <footer className="footer">
        <p>
          This example demonstrates <code>useState</code>,{" "}
          <code>useCallback</code>, and <code>useEffect</code> in React.
        </p>
      </footer>
    </div>
  );
}

export default App;
