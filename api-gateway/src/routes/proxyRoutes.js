import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

/*
  Public Routes (No JWT required)
*/
router.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "" },
  }),
);

/*
  Protected Routes (JWT required)
*/
router.use(
  "/bookings",
  verifyToken,
  createProxyMiddleware({
    target: process.env.BOOKING_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/bookings": "" },
  }),
);

router.use(
  "/inventory",
  verifyToken,
  createProxyMiddleware({
    target: process.env.INVENTORY_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/inventory": "" },
  }),
);

router.use(
  "/search",
  createProxyMiddleware({
    target: process.env.SEARCH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/search": "" },
  }),
);

router.use(
  "/users",
  verifyToken,
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/users": "" },
  }),
);

export default router;
