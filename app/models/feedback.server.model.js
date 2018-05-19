const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    feedback: String,
    favouriteSport: String,
    skill: String
});

// Set the 'fullname' virtual property
FeedbackSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

FeedbackSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Feedback', FeedbackSchema);