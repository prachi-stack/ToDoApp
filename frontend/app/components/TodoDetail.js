"use client";
import React, { useState, useEffect, useRef } from "react";
import { updateDocument } from "../action";
import { Icons } from "./Icons";
import { Trash2 } from "lucide-react";

const TodoDetail = ({ selectedTodo, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
      setSaveStatus("");
    }
  }, [selectedTodo]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  const autoSave = (newTitle, newDescription) => {
    // Skip if no changes or no valid selectedTodo
    if (!selectedTodo || !selectedTodo._id) {
      return;
    }

    if (
      selectedTodo &&
      newTitle === selectedTodo.title &&
      newDescription === selectedTodo.description
    ) {
      return;
    }

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      if (!selectedTodo || !selectedTodo._id) return;
      try {
        setSaveStatus("saving");
        await updateDocument(selectedTodo._id, {
          title: newTitle,
          description: newDescription,
        });

        onUpdate({
          ...selectedTodo,
          title: newTitle,
          description: newDescription,
        });

        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(""), 3000);
      } catch (error) {
        console.error("Failed to update todo:", error);
        setSaveStatus("error");
      }
    }, 1000);
  };

  if (!selectedTodo) {
    return (
      <div className="bg-gray-100 p-4 rounded shadow-md flex items-center justify-center h-full">
        <p className="text-gray-500 text-sm sm:text-base">
          Select a todo to view and edit details
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 lg:px-8 py-4 h-[75vh] rounded shadow-md mt-6 ">
      {saveStatus && (
        <div
          className={`text-xs px-2 py-1 rounded mb-2 inline-block float-right ${
            saveStatus === "saved"
              ? "bg-green-100 text-green-700"
              : saveStatus === "saving"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {saveStatus === "saved"
            ? "Saved"
            : saveStatus === "saving"
            ? "Saving..."
            : "Error saving"}
        </div>
      )}

      <div className="flex items-center w-full mb-2  ">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            autoSave(e.target.value, description);
          }}
          className="flex-grow text-lg sm:text-xl font-semibold p-2 focus:outline-none bg-transparent"
          placeholder="Title"
        />
        <Trash2 size={20} className="text-black" />
      </div>

      <Icons />
      <hr className="border border-black w-full" />

      <textarea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          autoSave(title, e.target.value);
        }}
        rows="8"
        className="w-full mt-3 p-2  focus:outline-none resize-none bg-transparent text-sm sm:text-base"
        placeholder="Description"
      />
    </div>
  );
};

export default TodoDetail;
