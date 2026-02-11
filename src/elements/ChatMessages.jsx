import { useEffect, useRef } from "react";

const ChatMessages = ({ theme, messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3 ${theme === "dark" ? "bg-dark" : ""}`}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`d-flex ${
            msg.role === "user"
              ? "justify-content-end"
              : "justify-content-start"
          }`}
        >
          <div
            className={`rounded-3 px-3 py-2 text-sm
               ${ theme === "light"
                 ? msg.role === "user"
                   ? "bg-secondary text-white"
                   : "bg-dark-subtle text-dark"
                 : 
                  msg.role === "user"
                    ? "bg-dark-subtle text-dark"
                    : "bg-secondary text-white"
            }`}
            style={{ maxWidth: "70%" }}
          >
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;