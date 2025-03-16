import { FilePlus2, Search } from "lucide-react";

const TodoForm = ({ onCreateDocument }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateDocument();
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 items-center">
      <button
        type="submit"
        className="flex bg-black text-white px-4 py-2 rounded-md gap-2 items-center"
      >
        <FilePlus2 size={20} />
        <span>TODO</span>
      </button>

      <div className="ml-auto w-10 h-10 flex items-center justify-center bg-white rounded-md shadow">
        <Search className="text-black" size={20} />
      </div>
    </form>
  );
};

export default TodoForm;
