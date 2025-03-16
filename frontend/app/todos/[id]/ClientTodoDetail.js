"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateDocument } from "../../action";
import { Trash2 } from "lucide-react";
import { Icons } from "../../components/Icons";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

const ClientTodoDetail = ({ initialTodo, id }) => {
  const [todo, setTodo] = useState(initialTodo);
  const [title, setTitle] = useState(initialTodo.title);
  const [description, setDescription] = useState(initialTodo.description);
  const [saveStatus, setSaveStatus] = useState("");
  const saveTimeoutRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        router.push(`/?todoId=${id}`);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [router, id]);

  const autoSave = (newTitle, newDescription) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      if (!todo) return;
      try {
        setSaveStatus("saving");
        const updatedTodo = await updateDocument(todo._id, {
          title: newTitle,
          description: newDescription,
        });

        localStorage.setItem("lastUpdatedTodo", JSON.stringify(updatedTodo));

        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(""), 3000);
      } catch (error) {
        console.error("Failed to update todo:", error);
        setSaveStatus("error");
      }
    }, 1000);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col  ">
      <div className="bg-gray-100 p-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center text-lg text-base text-black font-bold"
          >
            <MoveLeft size={20} className="mr-2" strokeWidth={2} />
            <span>Back</span>
          </Link>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-white h-screen mx-4 ">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">New Additions</h1>
          <button className="p-2">
            <Trash2 size={20} className="text-black" />
          </button>
        </div>

        <Icons />
        <hr className="border border-black w-full" />

        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            autoSave(title, e.target.value);
          }}
          className="w-full pt-6 border-none focus:outline-none resize-none bg-transparent"
          placeholder="Description"
          style={{ minHeight: "200px" }}
        />
      </div>

      {saveStatus && (
        <div
          className={`fixed bottom-4 right-4 text-xs px-2 py-1 rounded ${
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
    </div>
  );
};

export default ClientTodoDetail;
