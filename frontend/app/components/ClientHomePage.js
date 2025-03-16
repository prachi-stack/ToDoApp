"use client";
import React, { useState, useEffect } from "react";
import TodoList from "./ToDoList";
import TodoDetail from "./TodoDetail";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchDocumentById } from "../action";

const ClientHomePage = ({ initialData }) => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [documents, setDocuments] = useState(initialData.documents || []);
  const [pagination, setPagination] = useState(
    initialData.pagination || {
      total: 0,
      page: 1,
      limit: 4,
      pages: 0,
    }
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);

      if (newIsMobile && selectedTodo) {
        router.push(`/todos/${selectedTodo._id}`);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [selectedTodo, router]);

  useEffect(() => {
    const todoId = searchParams.get("todoId");
    if (todoId) {
      const loadTodo = async () => {
        try {
          const todo = await fetchDocumentById(todoId);
          setSelectedTodo(todo);
        } catch (error) {
          console.error("Failed to load todo:", error);
          if (
            error.status === 404 ||
            (error.message && error.message.includes("404"))
          ) {
            const newUrl = window.location.pathname;
            router.replace(newUrl);

            alert("The requested todo item was not found or has been deleted.");
          }
        }
      };
      loadTodo();
    }
  }, [searchParams, router]);

  useEffect(() => {
    const lastUpdatedTodoJson = localStorage.getItem("lastUpdatedTodo");
    if (lastUpdatedTodoJson) {
      try {
        const lastUpdatedTodo = JSON.parse(lastUpdatedTodoJson);
        setSelectedTodo(lastUpdatedTodo);
        localStorage.removeItem("lastUpdatedTodo");
      } catch (error) {
        console.error(
          "Failed to parse lastUpdatedTodo from localStorage:",
          error
        );
      }
    }
  }, []);

  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);

    if (isMobile) {
      router.push(`/todos/${todo._id}`);
    }
  };

  const handleTodoUpdate = (updatedTodo) => {
    if (
      selectedTodo &&
      (selectedTodo.title !== updatedTodo.title ||
        selectedTodo.description !== updatedTodo.description)
    ) {
      setSelectedTodo(updatedTodo);

      setDocuments((prevDocs) =>
        prevDocs.map((doc) => (doc._id === updatedTodo._id ? updatedTodo : doc))
      );
    }
  };

  return (
    <div className="bg-gray-100 opacity-100 flex gap-4 pt-4 min-h-screen px-2 sm:px-4 md:px-8 flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <TodoList
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          onTodoClick={handleTodoClick}
          initialDocuments={documents}
          initialPagination={pagination}
          onTodoUpdate={handleTodoUpdate}
        />
      </div>

      <div
        className={`w-full md:w-1/2 ${
          selectedTodo ? "block" : "hidden md:block"
        }`}
      >
        <TodoDetail selectedTodo={selectedTodo} onUpdate={handleTodoUpdate} />
      </div>
    </div>
  );
};

export default ClientHomePage;
