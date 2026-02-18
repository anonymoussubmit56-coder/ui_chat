import { useState } from "react";
import { connection } from "../data/connection";

const ChatInput = ({
  onSend,
  modelResponse,
  setLoading,
  setAttemps,
  alpha,
  tau,
  setError,
  error
}) => {
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
      tau: tau,
    };

    setLoading(true);
    try {
      const response = await fetch(connection.url + "ask", {
        method: "POST",
        headers: connection.header,
        body: JSON.stringify(request),
      });
      const data = await response.json();
      modelResponse(data);
    } catch (er) {
      setError((prev) => [
        ...prev,
        { hasError: true, message: er.message },
      ]);
      console.error("Error fetching data:", er);
    } finally {
      setLoading(false);
      setWaitingForResponse(false);
      setAttemps((prev) => prev + 1);
    }
  };

  return (
    <>
      {error.length > 0 && error[error.length - 1].hasError && (
        <div className="alert alert-danger" role="alert">
          {error[error.length - 1].message}
          <br /> <br />
          <span className="bg-light border border-secondary rounded-2 p-1 mt-2">
            Attempts: {error.length}
          </span>
        </div>
      )}
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
    </>
  );
};

export default ChatInput;
