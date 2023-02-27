import React, { useRef, useState, useEffect } from "react";
import "./Dropdown.scss";
import { resposnse } from "../api/uss";

export default function Dropdown() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    resposnse.reduce(
      (obj, item) => ({ ...obj, [item.abbreviation]: false }),
      {}
    )
  );

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (e.target !== dropdownRef.current) {
        setIsVisible(false);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  const numberOfSelected = Object.values(selectedItems).filter(Boolean).length;

  const filterContent = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <button
      className="dropdown-button"
      ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          const { offsetLeft , offsetTop,offsetWidth } = buttonRef.current
          console.log(offsetLeft, offsetTop,offsetWidth);
          setIsVisible((prev) => !prev);
        }}
      >
        {!!numberOfSelected ? `selected ${numberOfSelected}` : "dropdown"}
        {isVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        )}
      </button>
      {isVisible && (
        <div
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
          className="panel"
        >
          <input type={"text"} className="dropdown-search" onChange={filterContent} />
          {resposnse.map((item) => (
            <fieldset
              key={item.abbreviation}
              className={`dropdown-item ${selectedItems[item.abbreviation] ? "selected" : ""} `}
            >
              <input
                onChange={(e) =>
                  setSelectedItems({
                    ...selectedItems,
                    [item.abbreviation]: e.target.checked,
                  })
                }
                checked={selectedItems[item.abbreviation]}
                id={`input-${item.abbreviation}`}
                type={"checkbox"}
              />
              <label htmlFor={`input-${item.abbreviation}`}>{item.name}</label>
            </fieldset>
          ))}
        </div>
      )}
    </>
  );
}
