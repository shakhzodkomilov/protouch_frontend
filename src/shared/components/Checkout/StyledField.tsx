import { Box, Typography, TextField } from "@mui/material";

export const StyledField = (props: any) => (
  <Box>
    <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
      {props.label}
      {props.required && (
        <Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
      )}
    </Typography>
    <TextField
      {...props}
      label={undefined}
      fullWidth
      variant="outlined"
      InputProps={{
        sx: {
          borderRadius: "10px",
          bgcolor: "#f5f6f8",
          color: "#111",
          fontSize: 14,
          "& fieldset": { border: "none" },
          height: "48px",
        },
      }}
      InputLabelProps={{ shrink: true }}
    />
  </Box>
);
