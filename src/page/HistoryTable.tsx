import { useNavigate } from "react-router-dom";
import { API_URL } from "../global";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalProvider";

const HistoryTable = () => {
  const navigate = useNavigate();

  const { setLoading } = useGlobalState();

  const [historyCaseData, setHistoryCaseData] = useState([]);

  useEffect(() => {
    const initCaseData = async () => {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/get-history?uid=${localStorage.getItem("ownerId")}`
      );
      setHistoryCaseData(res.data);
      setLoading(false);
    };

    if (localStorage.getItem("ownerId")) {
      try {
        initCaseData();
      } catch (error) {
        setLoading(false);
      }
    }
  }, []);

  return (
    <div
      className="w-full min-h-[calc(100vh-90px)] flex justify-center items-center"
      style={{
        backgroundImage: "url('/chatbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-8/12 p-6 rounded-xl bg-white">
        <h3 className="font-semibold text-2xl">History</h3>

        <div className="w-full flex flex-col gap-4 p-2 mt-4 max-h-[70vh] overflow-y-auto">
          {historyCaseData.map((item: any) => (
            <div className="w-full p-4 px-4 rounded-lg bg-gray-100">
              <div className="text-lg font-bold text-primary-500 mb-2">
                {item.name}
              </div>

              <div>
                <span className="font-semibold">Answer:</span>{" "}
                {item.answer != null ? (
                  item.answer
                ) : (
                  <span className="text-red-500">Not answered</span>
                )}
              </div>

              <div>
                <span className="font-semibold">Date:</span> {item.created_at}
              </div>

              {item.answer !== null && (
                <button
                  onClick={() => navigate(`/history/case/${item.case_id}`)}
                  className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-primary-600 transition duration-300 cursor-pointer"
                >
                  View Chat History & Score
                </button>
              )}
            </div>
          ))}

          {historyCaseData.length === 0 && (
            <div className="w-full p-4 px-4 rounded-lg bg-gray-100">
              <p className="text-center text-gray-500">No history found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
