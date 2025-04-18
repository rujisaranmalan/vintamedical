const ChatContainerModal = ({
  messages,
  isOpen,
  onClose,
}: {
  messages: any[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="w-8/12 flex flex-col">
        <div className="bg-white w-full p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Chat History</h2>

          <div
            className="flex-1 overflow-y-auto px-2 w-full h-[calc(100vh-300px)] bg-secondary-100 py-4 rounded-lg"
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.map((message: any, index: number) => {
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

          <div className="w-full mt-4">
            <button
              onClick={onClose}
              className="bg-red-500 text-white w-full py-2 rounded-lg cursor-pointer hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainerModal;
