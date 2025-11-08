import { useState } from "react";
import styles from "./SearchInput.module.css";
import { useCitySuggestion } from "../../hooks/useCitySuggestion"


function SearchInput({ setCity }) {
  const [value, setValue] = useState("");
  const { suggestion, completion } = useCitySuggestion(value);

  const confirm = (name) => {
    setCity(name);
    setValue(name);
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.inputOverlay}>
        <input
          type="text"
          placeholder="Search City..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Tab") {
              e.preventDefault();
              confirm(suggestion || value);
            }
          }}
        />
        {completion && (
          <span className={styles.suggestion}>
            {value}
            <span className={styles.suggestionFaded}>{completion}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default SearchInput;
