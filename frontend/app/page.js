import { fetchDocuments } from "./action";
import ClientHomePage from "./components/ClientHomePage";

export default async function HomePage() {
  const initialData = await fetchDocuments(1, 4);

  // Pass data to client component
  return <ClientHomePage initialData={initialData} />;
}
