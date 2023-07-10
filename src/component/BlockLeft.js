import React, { useContext, useState, useEffect } from "react";
import { FaSearch, FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";
import { DataContext } from "./Block_LR";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BlockLeft.css";

const BlockLeft = () => {
  const {
    dataPoke,
    nextPoke,
    backPoke,
    setNamePoke,
    setDataBlockRight,
    setDataLikePoke,
    datalikepoke,
  } = useContext(DataContext);

  const [loadingimg, setLoadingImg] = useState(true);
  const [inputValue, setInputValue] = useState("");

  //like Pokemon
  const [likepoke, setLikePoke] = useState(false);

  const filteredData = datalikepoke.filter((poke) => poke.id === dataPoke.id);

  const handleInputChange = (event) => {
    setInputValue(event.target.value.toLowerCase());
  };

  const handleClick = () => {
    if (inputValue !== "") {
      setNamePoke(inputValue);
      setInputValue("");
    }else{
      toast.error("กรุณากรอกชื่อ Pokemon ที่ค้นหา", {
        delay: 0, // เริ่มแสดงทันที
        autoClose: 3000,
        className: "toast-error",
        closeButton: <FaTimes />,
      });
    }
  };

  const onkeydownhandleinput = (event) => {
    if(inputValue === "" && event.key === "Enter"){
      toast.error("กรุณากรอกชื่อ Pokemon ที่ค้นหา", {
        delay: 0, // เริ่มแสดงทันที
        autoClose: 3000,
        className: "toast-error",
        closeButton: <FaTimes />,
      });
    }
    if (inputValue !== "" && event.key === "Enter") {
      setNamePoke(event.target.value);
      setInputValue("");
    }
  };

  const handleLikePoke = () => {
    setLikePoke(!likepoke);
    setDataLikePoke((oldState) => [...oldState, dataPoke]);
    setDataBlockRight((oldState) => [...oldState, dataPoke]);
  };

  const handleDisLikePoke = () => {
    setLikePoke(!likepoke);
    setDataLikePoke((oldState) =>
      oldState.filter((poke) => poke.id !== dataPoke.id)
    );
    setDataBlockRight((oldState) =>
      oldState.filter((poke) => poke.id !== dataPoke.id)
    );
  };



  useEffect(() => {
   
    setLoadingImg(true);

    const img = new Image();
    img.onload = () => {
      setLoadingImg(false);
    };
    img.src = dataPoke?.sprites?.other.home?.front_default;

    return () => {
      img.onload = null;
    };
  
  }, [dataPoke]);

  if (loadingimg) {
    return (
      <div
      role="status"
      className="flex flex-col justify-center items-center block-container-left"
      style={{ fill: "#172554" }}
    >
      <svg
        aria-hidden="true"
        style={{
          fill: "#172554",
          width: "4.5rem",
          height: "5.5rem",
        }}
        className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
      <span><b>Loading Image...</b></span>
    </div>
    );
  }

  return (
    <div className="text-center text-blue-950">
      <div className="flex justify-center items-center">
        <p className="font-bold text-2xl capitalize">{dataPoke?.name}</p>
        <ToastContainer />
        {filteredData.length > 0 ? (
          filteredData
            .filter((poke) => poke.id === dataPoke.id)
            .map((item, index) => (
              <div key={index}>
                <p
                  className="font-bold text-2xl ml-3 cursor-pointer text-red-700"
                  onClick={handleDisLikePoke}
                >
                  <FaHeart />
                </p>
              </div>
            ))
        ) : (
          <p
            className="font-bold text-2xl ml-3 cursor-pointer"
            onClick={handleLikePoke}
          >
            <FaRegHeart />
          </p>
        )}
      </div>

      <div className="flex justify-center items-center mt-3">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative w-80" style={{ maxWidth: "80%" }}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Pokemon Name"
            onChange={handleInputChange}
            value={inputValue}
            onKeyDown={onkeydownhandleinput}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
      </div>

      <img
        style={{ maxWidth: "70%", height: "auto", margin: "auto" }}
        src={dataPoke?.sprites?.other.home?.front_default}
        alt={dataPoke.name}
      />

      <div>
        {/* <div>
          <p>ความสามารถ:</p>
          <ul className="list-disc">
            {dataPoke.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div> */}
        <div className="mt-3 flex justify-center items-center">
          <p className="font-bold text-1xl">Type : </p>
          {dataPoke.types.map((type) => (
            <span key={type.type.name}>
              &nbsp;<span className="capitalize">{type.type.name}</span>
            </span>
          ))}
        </div>

        <div className="mt-3">
          <button
            onClick={() => {
              backPoke();
              setLikePoke(false);
            }}
            className="bg-transparent hover:bg-blue-950 text-blue-950 font-semibold hover:text-white py-2 px-6 border border-blue-950 hover:border-transparent rounded"
          >
            Back
          </button>
          &nbsp;
          <button
            onClick={() => {
              nextPoke();
              setLikePoke(false);
            }}
            className="bg-transparent hover:bg-blue-950 text-blue-950 font-semibold hover:text-white py-2 px-6 border border-blue-950 hover:border-transparent rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockLeft;
