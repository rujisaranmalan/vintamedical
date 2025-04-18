import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../global";
import axios from "axios";
import ScoreCard from "../components/ScoreCard";
import PatientPortfolio from "../components/PatientPortfolio";
import { useGlobalState } from "../context/GlobalProvider";

const ChatComponent = ({ caseId }: { caseId: string }) => {
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const { setLoading } = useGlobalState();

  useEffect(() => {
    const initChatLog = async () => {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/get-chatlog?case_id=${caseId}`
      );
      setChatMessages(response.data);
      setLoading(false);
    };

    initChatLog();
  }, []);

  return (
    <div className="w-8/12 flex flex-col h-[calc(100vh-200px)]">
      <div className="bg-white w-full p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Chat History</h2>

        <div
          className="flex-1 overflow-y-auto px-2 w-full bg-secondary-100 py-4 rounded-lg"
          style={{ scrollBehavior: "smooth" }}
        >
          {chatMessages.map((message: any, index: number) => {
            return (
              <div
                key={index}
                className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                  message.role === "user"
                    ? "bg-blue-100 ml-auto text-blue-900"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{message.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AnswerComponent = ({ caseId }: { caseId: string }) => {
  const navigate = useNavigate();
  const [caseResultData, setCaseResultData] = useState<any>(null);

  const { setLoading } = useGlobalState();

  useEffect(() => {
    const initCaseSubmitData = async () => {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/get-result?case_id=${caseId}`
      );

      setCaseResultData(response.data);
      setLoading(false);
    };

    try {
      initCaseSubmitData();
    } catch (error) {
      navigate("/history");
    }
  }, []);

  return (
    <div className="w-8/12">
      <div className="w-full text-center p-8 rounded-xl bg-white mb-4">
        <div className="text-xl mb-2">Correct Answer</div>

        {caseResultData && (
          <div className="text-4xl font-bold">{caseResultData.case}</div>
        )}
      </div>

      {caseResultData && (
        <ScoreCard
          inputData={caseResultData}
          className="w-full h-[calc(100vh-370px)]"
        />
      )}
    </div>
  );
};

const HistoryCase = () => {
  const navigate = useNavigate();
  const { caseId } = useParams();

  const [openAnswer, setOpenAnswer] = useState(false);

  const [patientData, setPatientData] = useState<any>(null);

  const { setLoading } = useGlobalState();

  useEffect(() => {
    const initCaseSubmitData = async () => {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/get-patient?case_id=${caseId}`
      );
      setLoading(false);

      setPatientData(response.data.patient_data);
    };

    try {
      initCaseSubmitData();
    } catch (error) {
      navigate("/history");
    }
  }, []);

  return (
    <div
      className="w-full min-h-[calc(100vh-90px)] flex justify-center items-center gap-8 p-8"
      style={{
        backgroundImage: "url('/chatbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="h-[calc(100vh-200px)] bg-white rounded-lg shadow-lg px-4 py-4 w-5/12">
        <h2 className="text-xl font-bold mb-4">Patient Portfolio</h2>

        <PatientPortfolio patientData={patientData} />

        <div className="pt-4">
          <div className="flex w-full items-center justify-between gap-2">
            <button
              className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-lg w-3/12"
              onClick={() => navigate("/history")}
            >
              Back
            </button>

            {!openAnswer && (
              <button
                className="bg-red-500 font-semibold text-white px-4 py-2 rounded-lg w-9/12"
                onClick={() => setOpenAnswer(true)}
              >
                View Score
              </button>
            )}

            {openAnswer && (
              <button
                className="font-semibold bg-green-500 text-white px-4 py-2 rounded-lg w-9/12"
                onClick={() => setOpenAnswer(false)}
              >
                View Chat
              </button>
            )}
          </div>
        </div>
      </div>

      {!openAnswer && caseId && <ChatComponent caseId={caseId} />}

      {openAnswer && caseId && <AnswerComponent caseId={caseId} />}
    </div>
  );
};

export default HistoryCase;
