import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import "./BlockRight.css";
import { DataContext } from "./Block_LR";

const BlockRight = () => {

  const {dataBlockRight, setDataBlockRight, setDataLikePoke} = useContext(DataContext)

  const handleLikePoke = (id) => {
    setDataBlockRight((oldState) => oldState.filter((poke) => poke.id !== id));
    setDataLikePoke((oldState) => oldState.filter((poke) => poke.id !== id));
  };

  return (
    <>
      <div className="text-center text-blue-950 pl-6">
        <p className="font-bold text-2xl">My Pokemon</p>
      </div>
      <div  
      className="grid gap-4 xl:grid-cols-3 lgl:grid-cols-3 lg:grid-cols-3 mdl:grid-cols-3 md:grid-cols-3 md:grid-cols-3 sml:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 pl-6 xl:pt-12 respone-css">
        {dataBlockRight.map((val, index) => (
          <div key={index} className="">
            <img
              style={{ maxWidth: "70%", height: "auto", margin: "auto" }}
              src={val?.sprites?.other.home?.front_default}
              alt={val.name}
            />
            <div className="flex justify-center items-center text-blue-950">
            <p className=" capitalize">{val.name}</p>

              <p
                className="font-bold text-sm ml-1 cursor-pointer text-red-700"
                onClick={() => handleLikePoke(val.id)}
              >
                <FaHeart />
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlockRight;
