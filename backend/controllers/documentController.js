import Document from "../models/document.js";
import mongoose from "mongoose";

export const createDocument = async (req, res) => {
  try {
    const newDocument = new Document(req.body);
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ error: "Failed to create document" });
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Document.countDocuments({});

    const documents = await Document.find({})
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      documents,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch documents", error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const documentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return res.status(400).json({ error: "Invalid document ID format" });
    }

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error("Failed to fetch document by ID", error);
    res.status(500).json({ error: "Failed to fetch document" });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const documentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return res.status(400).json({ error: "Invalid document ID format" });
    }

    const updatedDocument = await Document.findByIdAndUpdate(
      documentId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error("Failed to update document", error);
    res.status(500).json({ error: "Failed to update document" });
  }
};

 
