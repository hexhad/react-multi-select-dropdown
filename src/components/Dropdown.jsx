import React, { useRef, useState, useEffect } from "react";
import "./Dropdown.scss";
import { resposnse } from "../api/uss";

export default function Dropdown() {
  const [isVisible, setIsVisible] = useState(false);
  const [apiResp, setApiResp] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [selectedItems, setSelectedItems] = useState(
    apiResp.reduce((obj, item) => ({ ...obj, [item.itm_id]: false }), {})
  );

  useEffect(() => {
    setApiResp(resposnse);
  }, []);

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
    setSearchParam(e.target.value);
    setApiResp(
      resposnse.filter((itm) =>
        itm.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <button
        className="dropdown-button"
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          const { offsetLeft, offsetTop, offsetWidth } = buttonRef.current;
          console.log(offsetLeft, offsetTop, offsetWidth);
          setIsVisible((prev) => !prev);
        }}
      >
        {!!numberOfSelected ? `selected ${numberOfSelected}` : "Click Me !"}
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
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
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
          <input
            placeholder="Search"
            value={searchParam}
            type={"text"}
            className="dropdown-search"
            onChange={filterContent}
          />
          <div className="selections">
            {apiResp.map((item) => (
              <fieldset
                key={item.itm_id}
                className={`dropdown-item ${
                  selectedItems[item.itm_id] ? "selected" : ""
                } `}
              >
                <input
                  onChange={(e) =>
                    setSelectedItems({
                      ...selectedItems,
                      [item.itm_id]: e.target.checked,
                    })
                  }
                  checked={selectedItems[item.itm_id]}
                  id={`input-${item.itm_id}`}
                  type={"checkbox"}
                />
                <label htmlFor={`input-${item.itm_id}`}>{item.name}</label>
              </fieldset>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
