/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Box, Typography, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel, Alert } from "@mui/material";
import { StyledField } from "./StyledField";

type Tab = "individual" | "legal";

interface LegalFormData {
  phone: string;
  inn: string;
  companyName: string;
  region: string;
  firstName: string;
  lastName: string;
}

interface Props {
  t: (key: string) => string;
  loggedInUser: any;
  onSubmitIndividual: (data: { phone: string; firstName: string; lastName: string }) => Promise<void>;
  onSubmitLegal: (data: LegalFormData) => Promise<void>;
  prefilled?: { phone?: string; firstName?: string; lastName?: string; companyName?: string; inn?: string; region?: string; isPartner?: boolean };
}

const REGIONS = [
  "г. Ташкент", "Ташкентская область", "Республика Каракалпакстан",
  "Андижанская область", "Бухарская область", "Джизакская область",
  "Кашкадарьинская область", "Навоийская область", "Наманганская область",
  "Самаркандская область", "Сурхандарьинская область", "Сырдарьинская область",
  "Ферганская область", "Хорезмская область",
];

export default function CheckoutRegisterForm({ t, loggedInUser, onSubmitIndividual, onSubmitLegal, prefilled }: Props) {
  const [tab, setTab] = useState<Tab>(prefilled?.isPartner ? "legal" : "individual");
  const [phone, setPhone] = useState(prefilled?.phone || "+998");
  const [firstName, setFirstName] = useState(prefilled?.firstName || "");
  const [lastName, setLastName] = useState(prefilled?.lastName || "");
  const [inn, setInn] = useState(prefilled?.inn || "");
  const [companyName, setCompanyName] = useState(prefilled?.companyName || "");
  const [region, setRegion] = useState(prefilled?.region || "");
  const [loading, setLoading] = useState(false);

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^\d+]/g, "");
    if (!v.startsWith("+998")) v = "+998";
    if (v.length > 13) v = v.slice(0, 13);
    setPhone(v);
  };

  const handleInn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInn(e.target.value.replace(/\D/g, "").slice(0, 9));
  };

  const individualValid = phone.length >= 13 && firstName.trim() !== "" && lastName.trim() !== "";
  const legalValid = phone.length >= 13 && inn.length >= 9 && companyName.trim() !== "" && region !== "" && firstName.trim() !== "" && lastName.trim() !== "";
  const valid = tab === "legal" ? legalValid : individualValid;
  const buttonText = tab === "legal" ? t("submitLegal") : t("submitLead");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (tab === "legal") {
        await onSubmitLegal({ phone, inn, companyName: companyName.trim(), region, firstName: firstName.trim(), lastName: lastName.trim() });
      } else {
        await onSubmitIndividual({ phone, firstName: firstName.trim(), lastName: lastName.trim() });
      }
    } finally {
      setLoading(false);
    }
  };

  const tabStyle = (active: boolean) => ({
    pb: 1, px: 0, mr: 3,
    fontWeight: active ? 700 : 400, fontSize: 15,
    color: active ? "#111" : "#888",
    borderBottom: active ? "2px solid #2563EB" : "2px solid transparent",
    borderRadius: 0, textTransform: "none", minWidth: 0,
    "&:hover": { bgcolor: "transparent", color: "#111" },
  });

  return (
    <>
      {loggedInUser && (
        <Alert severity="success" sx={{ borderRadius: "10px", fontSize: 13, mb: 3 }}>
          {t("loggedInAs")} <strong>{loggedInUser.firstName} {loggedInUser.lastName}</strong>
        </Alert>
      )}

      <Box sx={{ display: "flex", mb: 3, borderBottom: "1px solid #eee" }}>
        <Button disableRipple sx={tabStyle(tab === "individual")} onClick={() => { setTab("individual"); setInn(""); setCompanyName(""); setRegion(""); }}>
          {t("individual")}
        </Button>
        <Button disableRipple sx={tabStyle(tab === "legal")} onClick={() => setTab("legal")}>
          {t("legal")}
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <StyledField label={t("name")} required value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} placeholder="Diyorbek" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <StyledField label={t("surname")} required value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} placeholder="Mansurov" />
          </Box>
        </Box>

        <StyledField label={t("phone")} required value={phone} onChange={handlePhone} type="tel" placeholder="+998 33 234 43 67" />

        {tab === "legal" && (
          <>
            <StyledField label={t("companyName")} required value={companyName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)} placeholder='ООО "PROTOUCH SOLUTIONS"' />
            <StyledField label={t("inn")} required value={inn} onChange={handleInn} placeholder="309876543" />
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#222", mb: 0.75 }}>
                {t("region")}<Box component="span" sx={{ color: "#e53935", ml: 0.3 }}>*</Box>
              </Typography>
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: 14, color: region ? "#2563EB" : "#999", "&.Mui-focused": { color: "#2563EB" }, "&.MuiInputLabel-shrink": { color: "#2563EB" } }} id="region-label"></InputLabel>
                <Select
                  labelId="region-label"
                  value={region}
                  label={t("selectRegion")}
                  onChange={(e) => setRegion(e.target.value as string)}
                  sx={{ borderRadius: "10px", color: region ? "#111" : "#999", bgcolor: "#f5f6f8", fontSize: 14, "& fieldset": { border: "none" }, height: "48px", "& .MuiSelect-select": { py: 1.5 } }}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300, borderRadius: "12px", mt: 0.5 } } }}
                >
                  {REGIONS.map((r) => (
                    <MenuItem key={r} value={r} sx={{ fontSize: 14, color: "#111" }}>{r}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        )}
      </Box>

      <Button
        fullWidth
        onClick={handleSubmit}
        disabled={!valid || loading}
        sx={{
          bgcolor: "#2563EB", color: "#fff", py: "14px", borderRadius: "12px",
          fontWeight: 600, textTransform: "none", fontSize: 15,
          "&:hover": { bgcolor: "#1d4ed8" },
          "&.Mui-disabled": { bgcolor: "#bfdbfe", color: "#fff" },
        }}
      >
        {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : buttonText}
      </Button>
    </>
  );
}
