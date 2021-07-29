import React from "react";

export const PageNavigation = ({
  apiReqPageNumber,
  setApiReqPageNumber,
  apiReqMaxPageNumber,
}) => {
  const handlePageChange = (direction) => {
    const newPageNumber = apiReqPageNumber + direction;
    if (newPageNumber < 1 || newPageNumber > apiReqMaxPageNumber) {
    } else {
      setApiReqPageNumber(newPageNumber);
    }
  };

  return (
    <div className='page-navigation'>
      <span
        className='button'
        onClick={() => {
          handlePageChange(-1);
        }}
      >
        {"<--"}
      </span>
      {" | "}
      <span
        className='button'
        onClick={() => {
          handlePageChange(1);
        }}
      >
        {"-->"}
      </span>
    </div>
  );
};
