"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUnit } from "effector-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import {
  AppBar,
  Box,
  Button,
  InputBase,
  IconButton,
  Typography,
  Badge,
  Paper,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LanguageIcon from "@mui/icons-material/Language";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import {
  $categories,
  loadCategories,
  $searchProducts,
  $searchLoading,
  searchProducts,
} from "../../../entities/product/model";
import { $basket } from "../../../entities/basket/model/store";
import { $favoritesCount } from "../../../entities/favourite/model/store";
import { $isAuth, $user, logout } from "../../../entities/form/model";
import {
  CategoryType,
  PaginationType,
} from "../../../entities/product/model/types";
import { CatalogDropdown } from "./CatalogDropdown";
import DillerDialog from "./DillerDialog";
import SearchResults from "./SearchResults";
import { HeaderIcon } from "./HeaderIcon";
import { API_URL, getLangHeader } from "../../../entities/config/base";

type CategoryApi = {
  id: number;
  name?: string;
  title?: string;
  slug?: string;
  status?: string;
  placements?: string[];
  children?: CategoryApi[];
};

const NavbarCatalog = () => {
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("header");

  // Effector Units
  const categories = useUnit($categories) as CategoryType[];
  const { totalCount } = useUnit($basket);
  const favoritesCount = useUnit($favoritesCount);
  const searchProductsData = useUnit(
    $searchProducts,
  ) as unknown as PaginationType | null;
  const searchLoading = useUnit($searchLoading);
  const searchProductsEv = useUnit(searchProducts);
  const isAuth = useUnit($isAuth);
  const user = useUnit($user);
  const logoutEv = useUnit(logout);

  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(
    null,
  );
  const [insideCategories, setInsideCategories] = useState<CategoryApi[]>([]);

  // Hover state for inside-category children dropdown
  const [hoveredCatId, setHoveredCatId] = useState<number | null>(null);
  // Fixed-position anchor so the dropdown escapes overflow:hidden
  const [dropdownAnchor, setDropdownAnchor] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // One ref per category label so we can getBoundingClientRect on hover
  const catItemRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const insideScrollRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  const [dillerOpen, setDillerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Language switching
  const toggleLanguage = () => {
    const nextLocale = locale === "ru" ? "uz" : "ru";
    router.push(pathname.replace(`/${locale}`, `/${nextLocale}`));
  };

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        !mobileSearchRef.current?.contains(t) &&
        !desktopSearchRef.current?.contains(t)
      ) {
        setShowResults(false);
        setDesktopSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounced live search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        searchProductsEv({ lang: locale as string, search: searchQuery });
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, locale, searchProductsEv]);

  useEffect(() => {
    if (!desktopSearchOpen) return;
    const id = window.setTimeout(
      () => desktopSearchInputRef.current?.focus(),
      0,
    );
    return () => window.clearTimeout(id);
  }, [desktopSearchOpen]);

  // Load inside categories
  useEffect(() => {
    const currentLocale = (locale as string) || "ru";
    const controller = new AbortController();
    (async () => {
      if (!API_URL) return;
      try {
        const { data } = await axios.get(`${API_URL}/api/categories`, {
          headers: getLangHeader(currentLocale),
          signal: controller.signal,
        });
        const list = Array.isArray(data) ? (data as CategoryApi[]) : [];
        setInsideCategories(
          list.filter((c) => {
            const statusMatch = (c.status || "").toUpperCase() === "ACTIVE";
            const placements = c.placements || [];
            if (placements.length === 0) return statusMatch;
            return statusMatch && placements.includes("HEADER");
          }),
        );
      } catch {
        setInsideCategories([]);
      }
    })();
    return () => controller.abort();
  }, [locale]);

  const handleCatalogClick = () => {
    if (!isOpen) {
      loadCategories({ lang: (locale as string) || "ru" });
      setIsOpen(true);
      if (categories.length > 0) setActiveCategory(categories[0]);
    } else {
      setIsOpen(false);
    }
  };

  const handleCategoryHover = (category: CategoryType) =>
    setActiveCategory(category);

  const handleInsideCategoryClick = (slug?: string) => {
    if (!slug) return;
    router.push(`/${locale}/catalog/${slug}`);
  };

  // Hover: open dropdown, capture navbar bottom position for full-width panel
  const handleCatMouseEnter = (catId: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredCatId(catId);
    const el = catItemRefs.current[catId];
    if (el) {
      // Walk up to find the AppBar / navbar row and use its bottom edge
      // so the full-width panel appears flush below the entire navbar
      let node: HTMLElement | null = el;
      let navbarBottom = el.getBoundingClientRect().bottom + 4;
      while (node) {
        if (node.tagName === "HEADER") {
          navbarBottom = node.getBoundingClientRect().bottom;
          break;
        }
        node = node.parentElement;
      }
      setDropdownAnchor({
        left: el.getBoundingClientRect().left,
        top: navbarBottom,
      });
    }
  };

  const handleCatMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCatId(null);
      setDropdownAnchor(null);
    }, 120);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleDropdownMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCatId(null);
      setDropdownAnchor(null);
    }, 120);
  };

  // Drag-to-scroll
  const startDrag = (e: React.PointerEvent) => {
    if (!insideScrollRef.current) return;
    dragInfo.current = {
      isDown: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      scrollLeft: insideScrollRef.current.scrollLeft,
    };
    insideScrollRef.current.setPointerCapture(e.pointerId);
  };

  const onDrag = (e: React.PointerEvent) => {
    if (!insideScrollRef.current || !dragInfo.current.isDown) return;
    if (dragInfo.current.pointerId !== e.pointerId) return;
    insideScrollRef.current.scrollLeft =
      dragInfo.current.scrollLeft - (e.clientX - dragInfo.current.startX);
  };

  const stopDrag = (e: React.PointerEvent) => {
    if (dragInfo.current.pointerId !== e.pointerId) return;
    dragInfo.current.isDown = false;
    dragInfo.current.pointerId = -1;
  };

  const hoveredCat = insideCategories.find((c) => c.id === hoveredCatId);

  return (
    <Box
      sx={{ position: "relative", bgcolor: "#fff", zIndex: 100, width: "100%" }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "#fff", color: "#000", width: "100%", py: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
            px: 1,
          }}
        >
          {/* Mobile Catalog Button */}
          <Button
            onClick={handleCatalogClick}
            sx={{
              display: { xs: "flex", md: "none" },
              bgcolor: isOpen ? "#1e88e5" : "#2196f3",
              color: "#fff",
              height: "42px",
              borderRadius: 2,
              gap: 1,
              textTransform: "none",
              fontWeight: 600,
              minWidth: "170px",
              "&:hover": { bgcolor: "#1e88e5" },
            }}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
            {t("catalog")}
          </Button>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              flex: 1,
              overflow: "hidden",
            }}
          >
            <Box
              ref={insideScrollRef}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                overflowX: "auto",
                whiteSpace: "nowrap",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                userSelect: "none",
              }}
              onPointerDown={startDrag}
              onPointerMove={onDrag}
              onPointerUp={stopDrag}
              onPointerCancel={stopDrag}
              onPointerLeave={stopDrag}
            >
              {insideCategories.map((cat) => (
                <Box
                  key={cat.id}
                  ref={(el: HTMLDivElement | null) => {
                    catItemRefs.current[cat.id] = el;
                  }}
                  sx={{ flexShrink: 0 }}
                  onMouseEnter={() => handleCatMouseEnter(cat.id)}
                  onMouseLeave={handleCatMouseLeave}
                >
                  <Typography
                    onClick={() => handleInsideCategoryClick(cat.slug)}
                    sx={{
                      fontSize: "13px",
                      fontWeight: hoveredCatId === cat.id ? 600 : 500,
                      cursor: cat.slug ? "pointer" : "default",
                      color: hoveredCatId === cat.id ? "#2196f3" : "#1C1C1C",
                      px: 0.5,
                      py: 0.5,
                      display: "inline-block",
                      transition: "color 0.15s",
                      borderBottom:
                        hoveredCatId === cat.id
                          ? "2px solid #2196f3"
                          : "2px solid transparent",
                    }}
                  >
                    {cat.title || cat.name || ""}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            ref={mobileSearchRef}
            sx={{ flex: 1, display: { xs: "block", md: "none" } }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#f5f5f5",
                height: "55px",
                px: 2,
                borderRadius: 2,
                "@media (max-width:900px)": {
                  mt: "40px",
                  width: "100%",
                  position: "fixed",
                  left: 0,
                  px: 2,
                },
              }}
            >
              <SearchIcon sx={{ color: "#999", mr: 1 }} />
              <InputBase
                placeholder={t("search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                sx={{ width: "100%", fontSize: 16, color: "#000" }}
              />
              {searchLoading && (
                <CircularProgress size={20} sx={{ ml: 1, color: "#2196f3" }} />
              )}
            </Box>

            {showResults && (
              <Paper
                elevation={4}
                sx={{
                  position: "absolute",
                  top: "60px",
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  maxHeight: "450px",
                  overflowY: "auto",
                  borderRadius: 2,
                  bgcolor: "#fff",
                  color: "#000",
                  "@media (max-width:900px)": {
                    mt: "70px",
                    width: "100%",
                    position: "fixed",
                  },
                }}
              >
                <SearchResults
                  products={searchProductsData}
                  searchQuery={searchQuery}
                  noResults={t("no_results")}
                  onItemClick={() => setShowResults(false)}
                />
              </Paper>
            )}
          </Box>

          {/* Right Icons (desktop) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box ref={desktopSearchRef} sx={{ position: "relative" }}>
              <HeaderIcon
                icon={<SearchIcon />}
                label={t("search")}
                onClick={() => setDesktopSearchOpen((v) => !v)}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "72px",
                  transform: "translateY(-50%)",
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#f5f5f5",
                  borderRadius: 2,
                  overflow: "hidden",
                  width: desktopSearchOpen ? 360 : 0,
                  px: desktopSearchOpen ? 1.5 : 0,
                  transition: "width 240ms ease, padding 240ms ease",
                  pointerEvents: desktopSearchOpen ? "auto" : "none",
                }}
              >
                <InputBase
                  inputRef={desktopSearchInputRef}
                  placeholder={t("search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() =>
                    searchQuery.length >= 2 && setShowResults(true)
                  }
                  sx={{ width: "100%", fontSize: 14, color: "#000" }}
                />
                {searchLoading && (
                  <CircularProgress
                    size={18}
                    sx={{ ml: 1, color: "#2196f3" }}
                  />
                )}
              </Box>

              {showResults && desktopSearchOpen && (
                <Paper
                  elevation={4}
                  sx={{
                    position: "absolute",
                    top: "54px",
                    right: "72px",
                    width: 420,
                    zIndex: 1000,
                    maxHeight: "450px",
                    overflowY: "auto",
                    borderRadius: 2,
                    bgcolor: "#fff",
                    color: "#000",
                  }}
                >
                  <SearchResults
                    products={searchProductsData}
                    searchQuery={searchQuery}
                    noResults={t("no_results")}
                    onItemClick={() => setShowResults(false)}
                  />
                </Paper>
              )}
            </Box>

            <HeaderIcon
              icon={<LanguageIcon />}
              label="Uz/Ru"
              onClick={toggleLanguage}
            />
            <HeaderIcon
              icon={
                <Badge badgeContent={totalCount} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              }
              label={t("cart")}
              onClick={() => router.push(`/${locale}/basket`)}
            />
            <HeaderIcon
              icon={
                <Badge badgeContent={favoritesCount} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              }
              label={t("favorites")}
              onClick={() => router.push(`/${locale}/favorites`)}
            />

            <HeaderIcon
              icon={<StorefrontOutlinedIcon />}
              label={locale === "ru" ? "Стать дилером" : "Diller bo'lish"}
              onClick={() => setDillerOpen(true)}
            />

            {mounted && isAuth ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <IconButton
                  color="inherit"
                  sx={{ p: 0.5 }}
                  onClick={() => router.push(`/${locale}/checkout`)}
                >
                  <PersonOutlineIcon />
                </IconButton>
                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: 500,
                    textAlign: "center",
                    maxWidth: 80,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "#249FFC",
                  }}
                >
                  {user?.firstName || user?.phone || ""}
                </Typography>
                <Typography
                  onClick={() => logoutEv()}
                  sx={{
                    fontSize: "10px",
                    color: "#999",
                    cursor: "pointer",
                    mt: 0.3,
                    "&:hover": { color: "#e53935" },
                  }}
                >
                  {t("logout")}
                </Typography>
              </Box>
            ) : (
              <HeaderIcon
                icon={<PersonOutlineIcon />}
                label={t("login")}
                onClick={() => router.push(`/${locale}/login`)}
              />
            )}
          </Box>
        </Box>
      </AppBar>
      {hoveredCat &&
        hoveredCat.children &&
        hoveredCat.children.length > 0 &&
        dropdownAnchor && (
          <Box
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
            sx={{
              position: "fixed",
              maxWidth: "1700px",
              margin: "0 auto",
              top: dropdownAnchor.top,
              left: 0,
              right: 0,
              zIndex: 1400,
              bgcolor: "#fff",
              borderBottom: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              animation: "fadeSlideDown 0.12s ease",
              "@keyframes fadeSlideDown": {
                from: { opacity: 0, transform: "translateY(-3px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {/* Same horizontal padding as the AppBar (px:1 = 8px) */}
            <Box sx={{ px: "8px", py: "12px" }}>
              {/* Parent category title in blue */}
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#2196f3",
                  mb: "10px",
                  cursor: "pointer",
                  lineHeight: 1.4,
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => {
                  setHoveredCatId(null);
                  setDropdownAnchor(null);
                  handleInsideCategoryClick(hoveredCat.slug);
                }}
              >
                {hoveredCat.title || hoveredCat.name || ""}
              </Typography>

              {/* Children as plain text — exactly like image 2 */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {hoveredCat.children.map((child) => (
                  <Typography
                    key={child.id}
                    onClick={() => {
                      setHoveredCatId(null);
                      setDropdownAnchor(null);
                      handleInsideCategoryClick(child.slug);
                    }}
                    sx={{
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#1C1C1C",
                      cursor: "pointer",
                      lineHeight: 1,
                      py: "9px",
                      transition: "color 0.15s",
                      "&:hover": { color: "#2196f3" },
                    }}
                  >
                    {child.title || child.name || ""}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        )}

      <CatalogDropdown
        isOpen={isOpen}
        activeCategory={activeCategory ?? categories[0] ?? null}
        onCategoryHover={handleCategoryHover}
        onClose={() => setIsOpen(false)}
      />

      {/* Diller registration modal */}
      <DillerDialog open={dillerOpen} onClose={() => setDillerOpen(false)} />
    </Box>
  );
};
export default NavbarCatalog;
