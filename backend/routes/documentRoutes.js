import express from "express";
import {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
} from "../controllers/documentController.js";

const router = express.Router();

// Route to create a new document
router.post("/documents", createDocument);

// Route to fetch all documents with pagination
router.get("/documents", getAllDocuments);

// Route to fetch a single document by ID
router.get("/documents/:id", getDocumentById);

// Route to update a document
router.put("/documents/:id", updateDocument);

export default router;
