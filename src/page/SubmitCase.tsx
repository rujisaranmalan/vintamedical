import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../global";
import ScoreCard from "../components/ScoreCard";

const SubmitCase = () => {
  const navigate = useNavigate();

  const { caseId } = useParams();

  const [caseResultData, setCaseResultData] = useState<any>(null);

  const resetCase = () => {
    localStorage.removeItem("caseData");
    localStorage.removeItem("answerText");
    localStorage.removeItem("chat");
    localStorage.removeItem("correct_answer");

    navigate("/");
  };

  useEffect(() => {
    const initCaseSubmitData = async () => {
      const response = await axios.get(
        `${API_URL}/get-result?case_id=${caseId}`
      );

      setCaseResultData(response.data);
    };

    try {
      initCaseSubmitData();
    } catch (error) {
      navigate("/history");
    }
  }, []);

  return (
    <div
      className="w-full h-[calc(100vh-90px)]  flex flex-col justify-center items-center overflow-y-auto"
      style={{
        backgroundImage: "url('/chatbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-6/12 text-center p-8 rounded-xl bg-white my-4">
        <div className="text-xl mb-2">Correct Answer</div>

        {caseResultData && (
          <div className="text-4xl font-bold">{caseResultData.case}</div>
        )}
      </div>

      {caseResultData && (
        <ScoreCard
          inputData={caseResultData}
          className="w-6/12 h-[calc(100vh-400px)] mb-4"
        />
      )}

      <div className="w-6/12 bg-white p-4 rounded-lg mb-4">
        <button
          className="w-full bg-red-500 text-white px-6 py-2 text-xl rounded-lg mt-2 hover:bg-red-600 transition duration-300 cursor-pointer"
          onClick={() => resetCase()}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default SubmitCase;
