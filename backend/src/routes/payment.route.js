import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { confirmPurchase } from "../controllers/payment.controller.js";


const paymentRoute = express.Router()

paymentRoute.post('/confirm-purchase', protectRoute, confirmPurchase)


export default paymentRoute