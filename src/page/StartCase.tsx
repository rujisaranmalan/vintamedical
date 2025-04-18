import { useNavigate } from "react-router-dom";
import { API_URL } from "../global";
import axios from "axios";
import { useGlobalState } from "../context/GlobalProvider";

const StartCase = () => {
  const navigate = useNavigate();

  const { setCaseData, setLoading } = useGlobalState();

  const handleStartCase = async () => {
    const data = {
      owner: localStorage.getItem("ownerId") || "",
    };

    setLoading(true);

    localStorage.removeItem("caseData");
    localStorage.removeItem("answerText");
    localStorage.removeItem("chat");
    localStorage.removeItem("correct_answer");

    try {
      const response = await axios.post(`${API_URL}/chat/create`, data);
      const responseData = response.data;

      console.log(responseData);

      setCaseData(responseData);

      localStorage.setItem("caseData", JSON.stringify(responseData));

      setLoading(false);

      navigate(`/continue-case/${responseData.case_id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
      setLoading(false);
      return;
    }
  };

  return (
    <div
      className="w-full min-h-[calc(100vh-90px)] flex justify-center items-center"
      style={{
        backgroundImage: "url('/chatbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-3/12 text-center p-8 rounded-xl bg-white">
        <div className="text-xl">Welcome to</div>
        <div className="text-4xl font-bold my-6">Study Case</div>

        <button
          className="w-1/2 bg-red-500 text-white px-6 py-2 text-xl rounded-lg mt-2 hover:bg-red-600 transition duration-300 cursor-pointer"
          onClick={handleStartCase}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartCase;
