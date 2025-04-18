import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../global";
import axios from "axios";

import { createContext, useContext, useEffect, useState } from "react";
import ChatContainerModal from "../components/ChatContainer";
import { useGlobalState } from "../context/GlobalProvider";

interface CardNavigationContextType {
  handleNextCard: () => void;
  handlePreviousCard: () => void;
  cardTag: number;
  caseData: any;
}

const CardNavigationContext = createContext<
  CardNavigationContextType | undefined
>(undefined);

const useCardNavigation = () => {
  const context = useContext(CardNavigationContext);
  if (context === undefined) {
    throw new Error(
      "useCardNavigation must be used within a CardNavigationProvider"
    );
  }
  return context;
};

const CardOne = () => {
  const { cardTag, handleNextCard } = useCardNavigation();

  return (
    <div className="w-7/12 p-6 rounded-xl bg-main-green">
      <div className="text-xl font-bold">Submit Chat History</div>
      <div className="text-sm  mt-3 my-2">
        <div className="">
          <ul className="text-md list-disc pl-5 space-y-2">
            <li className="text-lg font-semibold">Instruction</li>

            <ul className="list-disc pl-5 font-medium space-y-2">
              <li>
                "Please review your conversation with the patient before
                submission."
              </li>
              <li>
                "Ensure all necessary details are included, and edit if needed."
              </li>
              <li>"Once submitted, you will not be able to make changes."</li>
            </ul>
          </ul>
        </div>
      </div>

      {cardTag === 1 && (
        <div className="flex justify-end text-lg font-semibold px-6 mt-6">
          {/* <button
            onClick={handlePreviousCard}
            className="bg-gray-700 text-white w-[20%] px-4 py-2 rounded-md"
          >
            Previous
          </button> */}
          <button
            onClick={handleNextCard}
            className="bg-red-500 text-white w-[20%] px-4 py-2 rounded-md cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const CardTwo = ({ patientData }: { patientData: any }) => {
  const { cardTag, handleNextCard, handlePreviousCard } = useCardNavigation();

  return (
    <div className="w-7/12 p-6 rounded-xl bg-main-green">
      <div className="text-xl font-bold">Patient Details Section</div>

      <div className="text-lg font-semibold mt-3">
        📌 Basic Patient Information
      </div>

      {patientData && (
        <div className="ml-4 mt-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-semibold">Patient Name:</span>{" "}
              {patientData.Name}
            </li>
            <li>
              <span className="font-semibold">Sex:</span> {patientData.Sex}
            </li>
            <li>
              <span className="font-semibold">Age:</span> {patientData.Age}
            </li>
            <li>
              <span className="font-semibold">Occupation:</span>{" "}
              {patientData.Occupation}
            </li>
            <li>
              <span className="font-semibold">Chief complaint:</span>{" "}
              {patientData.CC}
            </li>
          </ul>
        </div>
      )}

      {cardTag === 2 && (
        <div className="flex justify-between text-lg font-semibold px-6 mt-6">
          <button
            onClick={handlePreviousCard}
            className="bg-gray-700 text-white w-[20%] px-4 py-2 rounded-md cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={handleNextCard}
            className="bg-red-500 text-white w-[20%] px-4 py-2 rounded-md cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
const CardThree = ({
  openChatModal,
  answerText,
}: {
  openChatModal: () => void;
  answerText: string;
}) => {
  const { caseData, cardTag, handlePreviousCard } = useCardNavigation();

  const { setLoading } = useGlobalState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      case_id: caseData.case_id,
      answer: answerText,
    };

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat/complete`, data);
      const responseData = response.data;

      localStorage.setItem("correct_answer", JSON.stringify(responseData));

      setLoading(false);

      navigate(`/submit-case/${caseData.case_id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className="w-7/12 p-6 rounded-xl bg-main-green">
      <div className="text-xl font-bold">Chat History Section</div>

      {caseData && (
        <div className="ml-4 mt-4 flex justify-center">
          <button
            onClick={openChatModal}
            className="bg-white text-black w-full px-4 py-2 rounded-md text-lg cursor-pointer font-bold"
          >
            View Chat History
          </button>
        </div>
      )}

      {cardTag === 3 && (
        <div className="flex justify-between text-lg font-semibold px-6 mt-6">
          <button
            onClick={handlePreviousCard}
            className="bg-gray-700 text-white w-[20%] px-4 py-2 rounded-md cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={() => handleSubmit()}
            className="bg-red-500 text-white w-[20%] px-4 py-2 rounded-md cursor-pointer"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

const CompleteCase = () => {
  const [caseData, setCaseData] = useState<any>(null);
  const [answerText, setAnswerText] = useState<string>("");

  const { caseId } = useParams();

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [cardTag, setCardTag] = useState(1);

  const handleNextCard = () => {
    setCardTag(cardTag + 1);
  };

  const handlePreviousCard = () => {
    setCardTag(cardTag - 1);
  };

  const handleOpenChatModal = () => {
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
  };

  useEffect(() => {
    const myCaseData = JSON.parse(localStorage.getItem("caseData")!);
    setCaseData(myCaseData);

    const myAnswerText = localStorage.getItem("answerText");
    setAnswerText(myAnswerText || "");
  }, []);

  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [patientData, setPatientData] = useState<any>(null);

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

    const initCaseSubmitData = async () => {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/get-patient?case_id=${caseId}`
      );
      setLoading(false);

      setPatientData(response.data.patient_data);
    };

    initChatLog();
    initCaseSubmitData();
  }, []);

  return (
    <div
      className="w-full min-h-[calc(100vh-90px)] flex justify-center items-center "
      style={{
        backgroundImage: "url('/chatbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ChatContainerModal
        messages={chatMessages}
        isOpen={isChatModalOpen}
        onClose={handleCloseChatModal}
      />

      <CardNavigationContext.Provider
        value={{
          handleNextCard,
          handlePreviousCard,
          cardTag,
          caseData,
        }}
      >
        <div className="w-full h-[calc(100vh-160px)] overflow-y-auto">
          {cardTag >= 1 && (
            <div className="flex justify-center mb-4">
              <CardOne />
            </div>
          )}
          {cardTag >= 2 && patientData && (
            <div className="flex justify-center mb-4">
              <CardTwo patientData={patientData} />
            </div>
          )}
          {cardTag >= 3 && (
            <div className="flex justify-center mb-4">
              <CardThree
                openChatModal={handleOpenChatModal}
                answerText={answerText}
              />
            </div>
          )}
        </div>
      </CardNavigationContext.Provider>
    </div>
  );
};

export default CompleteCase;
