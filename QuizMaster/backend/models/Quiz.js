const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Quiz = new Schema({
    category: {
        type: String,
        enum: ['Science', 'History', 'Sports', 'Television'],
        required: true
    },
    question: {
        type: String,
        required: true
    },
    questionNo: {
        type: Number,
        min: 1, 
        max: 5, 
        required: true
    },
    answerA: {
        type: String,
        required: true
    },
    answerB: {
        type: String,
        required: true
    },
    answerC: {
        type: String,
        required: true
    },
    answerD: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
}, {
    collection: 'quizzes'
});

module.exports = mongoose.model('Quiz', Quiz);