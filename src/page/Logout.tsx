import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("ownerId");
    localStorage.removeItem("uuid");
    localStorage.removeItem("caseData");
    localStorage.removeItem("answerText");
    localStorage.removeItem("chat");
    localStorage.removeItem("correct_answer");

    navigate("/login");
  }, []);

  return <div></div>;
};

export default Logout;
