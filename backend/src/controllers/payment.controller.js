import { Course } from "../models/course.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

export const confirmPurchase = async(req, res) => {
    try {
        const { courseId } = req.body;

        console.log("Confirm purchase request:", { courseId, userId: req.user?._id });

        if (!courseId) {
            return res.status(400).json({
                message: "Please provide course ID"
            })
        }

        // Validate courseId format
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID format"
            })
        }

        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        const alreadyPurchased = await Order.findOne({
            user: req.user._id,
            course: courseId
        })

        if (alreadyPurchased) {
            return res.status(400).json({
                message: "You already have this course"
            })
        }

        // Create order
        const newOrder = new Order({
            user: req.user._id,
            course: courseId,
            totalAmount: course.amount,
            stripeSessionId: null // No Stripe session for mock
        })

        await newOrder.save()

        // Update user's purchased courses
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { purchasedCourse: courseId } }
        )

        return res.status(201).json({
            message: "Payment Successful",
            orderId: newOrder._id
        })

    } catch (error) {
        console.log("Error from confirm purchase:", error.message)
        console.log("Stack trace:", error.stack)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}