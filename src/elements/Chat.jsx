import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Spinner from "./Spinner";
import FeedbackForm from "./FeedbackForm";

const Chat = (theme ,alpha,tau) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attemps,setAttemps] = useState(0);

  const handleSend = async (prompt) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt }
    ]);
  };

  const modelResponse = async (answer) => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: answer.response }
    ]);
  };

  return (
    <div className="d-flex flex-column h-100">
      <FeedbackForm messages={messages} setAttemps={setAttemps} value={attemps}/>

      <ChatMessages  messages={messages} theme={theme} />
      {loading && (
        <div className="d-flex justify-content-center my-2">
          <Spinner />
        </div>
      )}
      <ChatInput
        theme={theme}
        setLoading={setLoading}
        onSend={handleSend}
        modelResponse={modelResponse}
        setAttemps={setAttemps}

        alpha={alpha}
        tau={tau}
      />
    </div>
  );
};

export default Chat;
