"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import TodoItem from "./ToDoItem";
import Pagination from "./Pagination";
import TodoForm from "./ToDoForm";
import { createDocument, fetchDocuments } from "../action";

const TodoList = ({
  selectedTodo,
  setSelectedTodo,
  onTodoClick,
  initialDocuments = [],
  initialPagination = { total: 0, page: 1, limit: 4, pages: 0 },
  onTodoUpdate,
}) => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const paginationRef = useRef(pagination);
  const documentsRef = useRef(documents);

  useEffect(() => {
    paginationRef.current = pagination;
  }, [pagination]);

  useEffect(() => {
    documentsRef.current = documents;
  }, [documents]);

  const loadDocuments = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDocuments(page, paginationRef.current.limit);
      setDocuments(data.documents);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to load documents", error);
      setError("Failed to load documents. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pagination.page !== initialPagination.page || documents.length === 0) {
      loadDocuments(pagination.page);
    }
  }, [
    pagination.page,
    initialPagination.page,
    documents.length,
    loadDocuments,
  ]);

  useEffect(() => {
    if (!selectedTodo) return;

    const docIndex = documentsRef.current.findIndex(
      (doc) => doc._id === selectedTodo._id
    );

    if (docIndex !== -1) {
      const updatedDocuments = [...documentsRef.current];
      updatedDocuments[docIndex] = selectedTodo;
      setDocuments(updatedDocuments);
    } else {
      loadDocuments(paginationRef.current.page);
    }
  }, [selectedTodo, loadDocuments]);

  const handleCreateDocument = async () => {
    try {
      setError(null);
      await createDocument();
      await loadDocuments(1);
    } catch (error) {
      console.error("Failed to create document", error);
      setError("Failed to create document. Please try again.");
    }
  };

  const handlePageChange = (newPage) => {
    if (
      newPage < 1 ||
      newPage > pagination.pages ||
      newPage === pagination.page
    )
      return;
    loadDocuments(newPage);
  };

  return (
    <div className="w-full max-w-md mt-6 mx-auto px-2 sm:px-4 pb-5">
      <TodoForm onCreateDocument={handleCreateDocument} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 mb-4 text-sm sm:text-base">
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : documents.length > 0 ? (
          documents.map((doc) => (
            <TodoItem
              key={doc._id}
              doc={doc}
              isSelected={selectedTodo && selectedTodo._id === doc._id}
              onClick={() => onTodoClick(doc)}
            />
          ))
        ) : (
          <div className="text-center py-4">No documents found</div>
        )}
      </div>

      {pagination.pages > 1 && (
        <div className="mt-4">
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default TodoList;
