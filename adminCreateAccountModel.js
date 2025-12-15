import mongoose from 'mongoose';

const adminCreateAcountSchema = new mongoose.Schema({

    firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }

  }, {
  timestamps: true

});

const adminCreateAccountModel = mongoose.model('adminCreateAccountModel', adminCreateAcountSchema);

export default adminCreateAccountModel;