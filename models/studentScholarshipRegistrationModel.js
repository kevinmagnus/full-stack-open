import mongoose from "mongoose";

const studentScholarshipRegitrationSchema = new mongoose.Schema({

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
        unique: true,
    },
    phone_number: {
        type: Number,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    }

}, {

timestamps: true

});

const studentScholarshipRegistrationModel = mongoose.model('studentScholarshipRegistrationModel', studentScholarshipRegitrationSchema);

export default studentScholarshipRegistrationModel;