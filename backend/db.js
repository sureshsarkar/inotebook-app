const mongoose = require('mongoose');
const url = "mongodb+srv://sureshsarkar2020:YA2Nj0Wu4YpxltwG@cluster0.wx3zupi.mongodb.net/inotebook";

const connectToMongo = () => {

    const mongoose = require('mongoose');
    const mongoURL = url;// 'mongodb://127.0.0.1:27017/learnwiths2';
    mongoose.connect(mongoURL);
}

module.exports = connectToMongo;