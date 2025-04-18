import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../global";
import axios from "axios";
import ConfirmModal from "../components/ConfirmModal";
import PatientPortfolio from "../components/PatientPortfolio";

const ChatComponent = ({
  caseId,
  caseData,
}: {
  caseId: string | undefined;
  caseData: any;
}) => {
  const inputMessageRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [canSend, setCanSend] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);

  const handleChat = async () => {
    const doctorMessage = inputMessageRef.current?.value;

    const data = {
      case_id: caseId,
      message: doctorMessage,
    };

    setMessages((prev) => [...prev, doctorMessage]);

    setCanSend(false);

    if (inputMessageRef.current) {
      inputMessageRef.current.value = "";
      setTimeout(() => inputMessageRef.current?.focus(), 0); // Refocus input
    }

    try {
      const response = await axios.post(`${API_URL}/chat/continue`, data);
      const responseData = response.data;

      setMessages((prev) => [...prev, responseData.response]);
    } catch (error) {
      console.error("Error creating chat:", error);
    }

    setCanSend(true);

    if (inputMessageRef.current) {
      inputMessageRef.current.value = "";
    }
  };

  const updateLocalChat = () => {
    let localchat = messages.join("|||");
    localStorage.setItem("chat", localchat);
  };

  useEffect(() => {
    // Load existing chat messages from localStorage if available
    const savedChat = localStorage.getItem("chat");
    if (savedChat) {
      const chatMessages = savedChat.split("|||");
      setMessages(chatMessages);
    }

    // Add event listener for Enter key press
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && canSend && inputMessageRef.current?.value) {
        handleChat();
      }
    };

    // Add event listener when component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    updateLocalChat();

    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    // console.log(messages);
  }, [messages]);

  return (
    <div className="bg-white rounded-lg shadow-lg px-4 py-4 w-6/12 h-[calc(100vh-200px)]">
      <h2 className="text-xl font-bold mb-4">
        Chat With{" "}
        <span className="text-blue-500">
          {caseData && caseData!.patient_data && caseData.patient_data.Name}
        </span>
      </h2>

      <div className="w-full flex flex-col h-[calc(100vh-285px)]">
        <div
          className="flex-1 overflow-y-auto px-2 w-full bg-secondary-100 py-4 rounded-lg"
          style={{ scrollBehavior: "smooth" }}
          ref={chatContainerRef}
        >
          {messages.map((message: any, index: number) => {
            const role = index % 2 == 0 ? "doctor" : "patient";

            return (
              <div
                key={index}
                className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                  role === "doctor"
                    ? "bg-blue-100 ml-auto text-blue-900"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{message}</p>
              </div>
            );
          })}

          {!canSend && (
            <div
              className={`mb-4 p-3 rounded-lg min-w-[20%] max-w-[80%] bg-white text-gray-900`}
            >
              <div className="flex items-center">
                <span className="animate-bounce mx-0.5">.</span>
                <span className="animate-bounce mx-0.5 animation-delay-200">
                  .
                </span>
                <span className="animate-bounce mx-0.5 animation-delay-400">
                  .
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4">
          <div className="flex items-center">
            <input
              type="text"
              ref={inputMessageRef}
              placeholder="Type your message here..."
              className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleChat}
              disabled={!canSend}
              className={`bg-blue-500 text-white px-4 py-2 rounded-r-lg ${
                canSend ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnswerComponent = ({
  answerText,
  setAnswerText,
}: {
  answerText: string;
  setAnswerText: (text: string) => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg px-4 py-4 w-6/12 h-[calc(100vh-200px)]">
      <h2 className="text-xl font-bold mb-4">Answer</h2>

      <textarea
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        className="w-full h-40 border border-gray-300 rounded-lg p-2"
      />
    </div>
  );
};

const ContinueCase = () => {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState<any>(null);

  const [isAnswer, setIsAnswer] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    const myCaseData = JSON.parse(localStorage.getItem("caseData")!);
    setCaseData(myCaseData);
  }, []);

  const onOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const onCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const onOpenSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const onCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  const onConfirm = () => {
    setIsConfirmModalOpen(false);
    setIsAnswer(true);
  };

  const onSubmit = () => {
    localStorage.setItem("answerText", answerText);

    setIsSubmitModalOpen(false);

    navigate(`/complete-case/${caseId}`);
  };

  return (
    <div
      className="w-full min-h-[calc(100vh-90px)] flex justify-center items-center gap-8 p-8"
      style={{
        backgroundImage: "url('/chatbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ConfirmModal
        title="Are you sure to answer?"
        onConfirm={onConfirm}
        onCancel={onCloseConfirmModal}
        isOpen={isConfirmModalOpen}
      />

      <ConfirmModal
        title="Are you sure to submit?"
        onConfirm={onSubmit}
        onCancel={onCloseSubmitModal}
        isOpen={isSubmitModalOpen}
      />

      <div className="h-[calc(100vh-200px)] bg-white rounded-lg shadow-lg px-4 py-4 w-5/12">
        <h2 className="text-xl font-bold mb-4">Patient Portfolio</h2>

        {caseData && caseData.patient_data && (
          <PatientPortfolio patientData={caseData.patient_data} />
        )}

        <div className="pt-4">
          {!isAnswer && (
            <button
              className="bg-red-500 font-semibold text-white px-4 py-2 rounded-lg w-full"
              onClick={onOpenConfirmModal}
            >
              Answer
            </button>
          )}

          {isAnswer && (
            <button
              className="font-semibold bg-green-500 text-white px-4 py-2 rounded-lg w-full"
              onClick={onOpenSubmitModal}
              disabled={answerText.length === 0}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {!isAnswer && <ChatComponent caseId={caseId} caseData={caseData} />}

      {isAnswer && (
        <AnswerComponent
          answerText={answerText}
          setAnswerText={setAnswerText}
        />
      )}
    </div>
  );
};

export default ContinueCase;
