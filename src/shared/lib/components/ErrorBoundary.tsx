"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            gap: 2,
            bgcolor: "#fef2f2",
            borderRadius: 2,
            border: "1px solid #fecaca",
            minHeight: 150,
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 40, color: "#ef4444" }} />
          <Typography sx={{ fontWeight: 600, color: "#991b1b", textAlign: "center" }}>
            Something went wrong
          </Typography>
          {this.state.error && (
            <Typography sx={{ fontSize: 12, color: "#b91c1c", textAlign: "center", maxWidth: 400 }}>
              {this.state.error.message}
            </Typography>
          )}
          <Button
            onClick={this.handleReset}
            variant="outlined"
            size="small"
            sx={{ color: "#991b1b", borderColor: "#f87171", "&:hover": { borderColor: "#ef4444" } }}
          >
            Try again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
