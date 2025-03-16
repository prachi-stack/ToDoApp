import express from "express";
import {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/documents", createDocument);

router.get("/documents", getAllDocuments);

router.get("/documents/:id", getDocumentById);

router.put("/documents/:id", updateDocument);

export default router;
