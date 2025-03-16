import { fetchDocumentById } from "../../action";
import ClientTodoDetail from "./ClientTodoDetail";

export default async function TodoDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const todoData = await fetchDocumentById(id);

  return <ClientTodoDetail initialTodo={todoData} id={id} />;
}
