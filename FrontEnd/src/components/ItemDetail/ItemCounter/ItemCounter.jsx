import { IoPersonAddSharp } from "react-icons/io5";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";

const ItemCounter = ({ initial, stock, people, setCount }) => {

	const decrease = () => {
		setCount(initial - 1);
	};

	const increase = () => {
		setCount(initial + 1);
	};

	useEffect(() => {
		setCount(parseInt(initial));
	}, [initial]);

  return (
    <div>
      <button className="btn btn-danger btn-number" disabled={initial <= 1} onClick={decrease}>
        <TiMinus />
      </button>
      <div className="d-inline p-2 border border-white rounded mx-2">
        <IoPersonAddSharp />
        <span>
          {initial} / {people}{" "}
        </span>
      </div>
      <button className="btn btn-success btn-number" disabled={initial >= people} onClick={increase}>
        <FaPlus />
      </button>
    </div>
  );
};

export default ItemCounter;
