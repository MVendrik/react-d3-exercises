import React from "react";

const form = () => {
  const classNames = "active";

  return (
    <div className={"container section indigo"}>
      <div className={"row"}>
        <div className={"col s12 m6"}>
          <form className={"card z-depth-0"}>
            <div className={"card-content"}>
              <span className={"card-title indigo-text"}>Add item:</span>
              <div className={"input-field"}>
                <input type="text" id="name" />
                <label for="name" className={classNames}>
                  Item name
                </label>
              </div>
              <div className={"input-field"}>
                <input type="number" id="cost" />
                <label for="cost" className={classNames}>
                  Item Cost ($)
                </label>
              </div>
              <div className={"input-field center"}>
                <button className={"btn-large pink white-text"}>
                  Add Item
                </button>
              </div>
              <div className={"input-field center"}>
                <p className={"red-text"} id="error" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default form;
