"use client";

import React from "react";
import { Box, Typography, Modal, Fade, Button } from "@mui/material";

interface NewsItemData {
  title: string;
  text: string;
  icon: string;
  modalContent?: string;
}

interface NewsModalProps {
  item: NewsItemData | null;
  open: boolean;
  closeLabel: string;
  onClose: () => void;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "90vw",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

export default function NewsModal({ item, open, closeLabel, onClose }: NewsModalProps) {
  if (!item) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "#000" }}>
            {item.title}
          </Typography>
          <Typography
            sx={{ lineHeight: 1.7, whiteSpace: "pre-line", color: "#333", fontSize: { xs: "14px", md: "16px" } }}
            dangerouslySetInnerHTML={{ __html: item.modalContent?.replace(/\n/g, "<br>") || "" }}
          />
          <Box sx={{ mt: 4, textAlign: "right" }}>
            <Button variant="contained" onClick={onClose} sx={{ bgcolor: "#249FFC", color: "#fff", textTransform: "none" }}>
              {closeLabel}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export type { NewsItemData };
