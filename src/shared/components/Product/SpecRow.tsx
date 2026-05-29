import { Box, Typography } from "@mui/material";

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "baseline",
      columnGap: 1,
    }}
  >
    <Box sx={{ display: "flex", gap: 1, alignItems: "baseline", minWidth: 0 }}>
      <Typography sx={{ fontSize: 13, color: "#8A8A8A", whiteSpace: "nowrap" }}>
        {label}:
      </Typography>
      <Box
        sx={{
          flex: 1,
          borderBottom: "1px dotted #D9D9D9",
          transform: "translateY(-2px)",
        }}
      />
    </Box>
    <Typography sx={{ fontSize: 13, color: "#4E4E4E", whiteSpace: "nowrap" }}>
      {value}
    </Typography>
  </Box>
);

export default SpecRow;
