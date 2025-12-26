import mongoose from "mongoose";

const FrontEndWebDevelopmentCourseVideoSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true,

    },

    VideoRecordDate: {

        type: Date,
        default: Date.now,
        
    },

    videoLink: {

        type: String,
        unique: true,
    
    }



});


const FrontEndWebDevelopmentCourseVideoModel = mongoose.model('FrontEndWebDevelopmentCourseVideoModel', FrontEndWebDevelopmentCourseVideoSchema);


export default FrontEndWebDevelopmentCourseVideoModel;