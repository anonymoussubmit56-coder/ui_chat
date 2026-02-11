import { useState } from "react";

const ChatInput = ({ onSend, modelResponse, setLoading, setAttemps, alpha,tau }) => {
  const [prompt, setPrompt] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);


  const handleChange = (value) => {
    setPrompt(value);
  };

  const handleClick = () => {
    if (!prompt.trim()) return;

    setWaitingForResponse(true);
    onSend(prompt);
    makeRequest(prompt);
    setPrompt("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleClick();
    }
  };

  const makeRequest = async (prompt) => {
    const request = {
      question: prompt,
      alpha: alpha,
      tau: tau
    };

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      modelResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setWaitingForResponse(false);
      setAttemps(prev => prev + 1);
    }
  };

  return (
    <div className="border rounded-3 p-2 d-flex align-items-center gap-2 bg-white">
      <textarea
        className="form-control border-0 shadow-none resize-none"
        rows={1}
        value={prompt}
        disabled={waitingForResponse}
        placeholder="Write your question..."
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="btn btn-dark d-flex align-items-center justify-content-center"
        onClick={handleClick}
        disabled={waitingForResponse}
      >
        ➤
      </button>
    </div>
  );
};

export default ChatInput;
