import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMagnifyingGlass,
  faListCheck,
  faBookReader,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  return (
    <div className="w-full min-h-[calc(100vh-90px)]">
      <div className="w-full flex justify-center items-center px-8 py-6 bg-secondary-100">
        <div className="w-4/12 h-full">
          <img
            className="w-[350px] h-[350px] rounded-full"
            src={"/Logo2.png"}
          />
        </div>

        <div className="w-6/12 h-full text-center">
          <div className="text-6xl font-bold">Virtual Patient</div>
          <div className="text-4xl mt-4">Learn & Practice History-taking</div>

          <div className="mt-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Type something to search..."
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary-500 rounded-full w-10 h-10 text-white">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>

            <div
              className={`mt-2 w-5/12 absolute bg-white border border-gray-300 rounded-md shadow-lg text-left ${
                searchText ? "" : "hidden"
              }`}
            >
              <div className="p-2 px-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                Peptic ulcer disease
              </div>
              <div className="p-2 px-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                Acute pancreatitis
              </div>
              <div className="p-2 px-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                Food poisoning
              </div>
              <div className="p-2 px-4 hover:bg-gray-100 cursor-pointer">
                Gastroesophageal reflux disease
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center gap-16 mt-8">
            <div className="flex flex-col items-center">
              <button
                className="w-18 h-18 bg-blue-300 rounded-full flex items-center justify-center hover:bg-blue-200 transition duration-300"
                onClick={() => navigate("/start-case")}
              >
                <FontAwesomeIcon icon={faListCheck} className="text-3xl" />
              </button>
              <span className="mt-2 text-gray-700 text-lg">Chatbot</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-18 h-18 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300">
                <FontAwesomeIcon icon={faQuestion} className="text-3xl" />
              </button>
              <span className="mt-2 text-gray-700 text-lg">Quiz</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-18 h-18 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300">
                <FontAwesomeIcon icon={faBookReader} className="text-3xl" />
              </button>
              <span className="mt-2 text-gray-700 text-lg">Research</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center mt-6">
        <div className="text-4xl font-bold">Features</div>

        <div className="w-full flex justify-center items-center gap-16 mt-6">
          <div className="">
            <img
              src={"/case-studies.png"}
              className="h-[250px]"
              alt="Case Studies"
            />

            <div className="text-xl mt-2">Chatbot</div>
          </div>
          <div className="">
            <img
              src={"/chat-history.png"}
              className="h-[250px]"
              alt="Chat History"
            />

            <div className="text-xl mt-2">Chat History</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
