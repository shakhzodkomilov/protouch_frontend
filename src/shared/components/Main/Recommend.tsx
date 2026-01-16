"use client";

import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useUnit } from "effector-react";
import {
  $loadingArrivals,
  $loadingProducts,
  $newArrivals,
  $products,
  loadArrivals,
} from "../../../entities/product/model";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import { useParams } from "next/navigation";
const BestSellers = () => {
  const [arrivals, loading, load] = useUnit([
    $newArrivals,
    $loadingArrivals,
    loadArrivals,
  ]);
  const scrollRefTop = useRef<HTMLDivElement>(null);
  const scrollRefBottom = useRef<HTMLDivElement>(null);
  const { locale } = useParams();

  useEffect(() => {
    load({ lang: "ru" }); // 🔥 API is triggered here
  }, [load]);
  const scrollTop = (dir: "left" | "right") => {
    if (!scrollRefTop.current) return;
    scrollRefTop.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };
  const scrollBottom = (dir: "left" | "right") => {
    if (!scrollRefBottom.current) return;
    scrollRefBottom.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: "84px" }}>
      <Typography sx={{ fontSize: "34px", fontWeight: 600, color: "#000" }}>
        Мы рекомендуем
      </Typography>
      <Box sx={{ position: "relative", mt: "34px" }}>
        <IconButton
          onClick={() => scrollTop("left")}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 45,
            height: 45,
          }}
        >
          <img src="/arrowleft.svg" width="40" />
        </IconButton>
        <IconButton
          onClick={() => scrollTop("right")}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 45,
            height: 45,
          }}
        >
          <img src="/arrowright.svg" width="40" />
        </IconButton>
        <Box
          ref={scrollRefTop}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollBehavior: "smooth",
            py: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {loading && <Typography>Loading...</Typography>}

          {arrivals?.results.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/product/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <Box
                key={item.id}
                sx={{
                  width: 300,
                  minHeight: "480px",
                  borderRadius: 3,
                  p: 2,
                  boxShadow: 3,
                  color: "#000",
                  bgcolor: "#fff",
                  flexShrink: 0,
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {item.is_in_stock ? (
                    <Typography
                      sx={{
                        width: "auto",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        color: "#3BB351",
                        bgcolor: "#D6F2DB",
                        fontSize: "14px",
                        border: "0px solid #DDDDDD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      В наличии
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        width: "auto",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        color: "#FF5F5F",
                        bgcolor: "#FFE4E4",
                        fontSize: "14px",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Нет в наличии
                    </Typography>
                  )}

                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Image
                      src={"/scale.svg"}
                      height={"24"}
                      width={"24"}
                      alt="scales"
                    />
                    <FavoriteBorderIcon sx={{ color: "#4E4E4E" }} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "230px",
                    mb: 2,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title || "product image"}
                    fill
                    sizes="240px"
                    style={{ objectFit: "contain" }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100px",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        mt: 1,
                        fontSize: "16px",
                        color: "#4E4E4E",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.4em",
                      }}
                    >
                      {item.short_description}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{ color: "#000", fontWeight: 700, fontSize: 18 }}
                  >
                    {new Intl.NumberFormat("ru-RU").format(item.price)} сум
                  </Typography>
                </Box>
                <Button
                  sx={{
                    bgcolor: "#249FFC",
                    width: "50px",
                    height: "60px",
                    borderRadius: "100%",
                    position: "absolute",
                    right: "10px",
                    bottom: "10px",
                  }}
                >
                  {item.is_in_stock ? (
                    <Image
                      src={"/basketIcon.svg"}
                      alt="BasketIcon"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <Image
                      src={"/call-outline_white.svg"}
                      alt="BasketIcon"
                      width={30}
                      height={30}
                    />
                  )}
                </Button>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
      <Box sx={{ position: "relative", mt: "34px" }}>
        <IconButton
          onClick={() => scrollBottom("left")}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 45,
            height: 45,
          }}
        >
          <img src="/arrowleft.svg" width="40" />
        </IconButton>
        <IconButton
          onClick={() => scrollBottom("right")}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            boxShadow: 2,
            width: 45,
            height: 45,
          }}
        >
          <img src="/arrowright.svg" width="40" />
        </IconButton>
        <Box
          ref={scrollRefBottom}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollBehavior: "smooth",
            py: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {loading && <Typography>Loading...</Typography>}

          {arrivals?.results.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: 300,
                minHeight: "480px",
                borderRadius: 3,
                p: 2,
                boxShadow: 3,
                color: "#000",
                bgcolor: "#fff",
                flexShrink: 0,
                display: "flex",
                position: "relative",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {item.is_in_stock ? (
                  <Typography
                    sx={{
                      width: "auto",
                      padding: "4px 8px",
                      borderRadius: "8px",
                      color: "#3BB351",
                      bgcolor: "#D6F2DB",
                      fontSize: "14px",
                      border: "0px solid #DDDDDD",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    В наличии
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      width: "auto",
                      padding: "4px 8px",
                      borderRadius: "8px",
                      color: "#FF5F5F",
                      bgcolor: "#FFE4E4",
                      fontSize: "14px",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Нет в наличии
                  </Typography>
                )}

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Image
                    src={"/scale.svg"}
                    height={"24"}
                    width={"24"}
                    alt="scales"
                  />
                  <FavoriteBorderIcon sx={{ color: "#4E4E4E" }} />
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "230px",
                  mb: 2,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title || "product image"}
                  fill
                  sizes="240px"
                  style={{ objectFit: "contain" }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100px",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      mt: 1,
                      fontSize: "16px",
                      color: "#4E4E4E",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: "1.4em",
                    }}
                  >
                    {item.short_description}
                  </Typography>
                </Box>

                <Typography
                  sx={{ color: "#000", fontWeight: 700, fontSize: 18 }}
                >
                  {new Intl.NumberFormat("ru-RU").format(item.price)} сум
                </Typography>
              </Box>
              <Button
                sx={{
                  bgcolor: "#249FFC",
                  width: "50px",
                  height: "60px",
                  borderRadius: "100%",
                  position: "absolute",
                  right: "10px",
                  bottom: "10px",
                }}
              >
                {item.is_in_stock ? (
                  <Image
                    src={"/basketIcon.svg"}
                    alt="BasketIcon"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    src={"/call-outline_white.svg"}
                    alt="BasketIcon"
                    width={30}
                    height={30}
                  />
                )}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default BestSellers;
