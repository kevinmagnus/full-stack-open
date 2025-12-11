import mongoose from "mongoose";

const studentScholarshipRegistrationSchema = new mongoose.Schema({

    first_name: {

        type: String,
        required: true,

    },
    last_name: {

        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: false,
    },
    phone_number: {
        type: Number,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    enrolledCourses: {
        type: [String],
        default: [],
    },
    scholarshipAppliedCourses: {
        type: [String],
        default: [],
    }


}, {

timestamps: true

});

const studentScholarshipRegistrationModel = mongoose.model('studentScholarshipRegistrationModel', studentScholarshipRegistrationSchema);

export default studentScholarshipRegistrationModel;