const Card = ({ title, children, theme }) => {
  return (
    <div className={`bg-${theme === "light" ? "white" : "gray-800"} border border-gray-200 rounded-xl p-4 shadow-sm`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className={`text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
