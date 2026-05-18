import { Course } from "../models/course.model.js";
import { Modules } from "../models/module.model.js";
export const createModule = async(req,res)=>{
    try {
        const {courseId,  title, content}= req.body;
        if(!courseId || !title || !content){
            return res.status(401).json({
                message:"Please provide all the details"
            })
        }

        const module = await Modules.create({
            courseId,
            title,
            content
        })
        module.save()

        await Course.findByIdAndUpdate(courseId,{
            $push:{modules:module._id}
        })


        return res.status(201).json(module)
    } catch (error) {
        console.log(`error from create module, ${error}`)
    }
}


export const getSingleCourseModule = async(req,res)=>{
    try {
        const moduleId = req.params.id;
        if(!moduleId){
            return res.status(401).json({
                message:"Please provide module id"
            })
        }

        const singleModule = await Modules.findById(moduleId)

        if(!singleModule){
            return res.status(401).json({
                message:"Module not found"
            })
        }

        // Check if user has purchased the course
        const courseId = singleModule.courseId;
        if (!req.user.purchasedCourse.includes(courseId)) {
            return res.status(403).json({
                message: "You must purchase this course to access modules"
            })
        }

        return res.status(201).json(singleModule)
    } catch (error) {
        console.log(error ,"from get single course module")
    }
}

