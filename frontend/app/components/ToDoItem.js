const TodoItem = ({ doc, isSelected, onClick }) => {
  return (
    <div
      className={`mb-4 p-3 rounded shadow cursor-pointer transition-colors ${
        isSelected
          ? "bg-white border-2 border-black"
          : "bg-white hover:bg-gray-50"
      }`}
      onClick={() => onClick(doc)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{doc.title}</h3>
          <p className="text-gray-700 mb-2 text-sm line-clamp-2">
            {doc.description}
          </p>
        </div>
        <div className="flex items-end self-center ml-2 mt-1">
          <small className="text-gray-500">{doc.date}</small>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
