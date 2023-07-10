import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import BlockLeft from "./BlockLeft";
import BlockRight from "./BlockRight";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BlockLeft.css";

const DataContext = React.createContext();

const Block_LR = () => {
  //DataPokemon
  const [dataPoke, setDataPoke] = useState("");
  const [errApi, setErrApi] = useState("T");
  const [loading, setLoading] = useState(false);

  //idPokemon
  const [id_pokemon, setId_pokemon] = useState(1);

  //Searc_name_pokemon
  const [namePoke, setNamePoke] = useState("");

  //Data BlockRight
  const [dataBlockRight, setDataBlockRight] = useState([]);

  //Data BlockLight datalikepoke
  const [datalikepoke, setDataLikePoke] = useState([]);

  useEffect(() => {
    // signal abortController เพื่อยกเลิกการเรียก API
    let abortController = new AbortController();
    setLoading(true);
    const loadPoke_id = () => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id_pokemon}`, {
          signal: abortController.signal,
        })
        .then((response) => {
          // ดำเนินการกับข้อมูลที่ได้รับจากเรียก API ได้ที่นี่
          setDataPoke(response.data);
          setLoading(false);
          setErrApi("");
        })
        .catch((error) => {
          // จัดการข้อผิดพลาดที่เกิดขึ้นในการเรียก API ได้ที่นี่
          setLoading(false);
          setErrApi("Error Api : " + error?.message);
        });
    };

    loadPoke_id();

    return () => abortController.abort();
  }, [id_pokemon]);

  useEffect(() => {
    if (namePoke !== "") {
      // signal abortController เพื่อยกเลิกการเรียก API
      let abortController = new AbortController();
      setLoading(true);
      const loadPoke_name = async () => {
        try {
          let responepoke_name = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${namePoke}`,
            {
              signal: abortController.signal,
            }
          );

          setDataPoke(responepoke_name.data);
          setId_pokemon(responepoke_name.data.id);
        } catch (err) {
          setLoading(false);
          setErrApi("Error Api : " + err?.message);
          toast.error("ไม่มีชื่อ Pokemon ที่ค้นหา", {
            delay: 0, // เริ่มแสดงทันที
            autoClose: 3000,
            className: "toast-error",
            closeButton: <FaTimes />,
          });
        } finally {
          setLoading(false);
          setErrApi("");
        }
      };

      loadPoke_name();
      return () => abortController.abort();
    }
  }, [namePoke]);

  const nextPoke = () => {
    setId_pokemon((id_pokemon) => id_pokemon + 1);
  };

  const backPoke = () => {
    if (id_pokemon > 1) {
      setId_pokemon((id_pokemon) => id_pokemon - 1);
    }
  };

  return (
    <DataContext.Provider
      value={{
        dataPoke,
        nextPoke,
        backPoke,
        setNamePoke,
        datalikepoke,
        dataBlockRight,
        setDataBlockRight,
        setDataLikePoke,
      }}
    >
      <section>
        <ToastContainer />
        {/* ตรวจว่า get api error มั้ย */}
        {errApi === "" ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2">
            <div className="md:border-r-2 md:border-blue-950 xl:border-r-2 xl:border-blue-950">
              {loading ? (
                <div>
                  <div
                    role="status"
                    className="flex flex-col justify-center items-center block-container-left"
                    style={{
                      fill: "#172554",
                    }}
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
                    <span><b>Loading Data Api...</b></span>
                  </div>
               
                </div>
               ) : (
                <BlockLeft />
              )} 
            </div>
            <div>
              <BlockRight />
            </div>
          </div>
        ) : (
          <div className="text-center text-rose-700">
            {/* <h1 className="text-2xl">{errApi}</h1> */}
          </div>
        )}
      </section>
    </DataContext.Provider>
  );
};

export { DataContext };
export default Block_LR;
