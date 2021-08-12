const { Videos } = require("../models");

/**
 * Get Video by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getVideoById = async (id) => {
    return Videos.findById(id);
};

const filteredVideos = async (q, sortingBy) => {
    console.log(sortingBy, q);
    let videos = Videos.find(q).sort({ [sortingBy]: 1 })
    return videos
}

const getVideos = async (sortingBy) => {
    return Videos.find({}).sort({ [sortingBy]: -1 });
};


const updateVotes = async (id, votes) => {
    let video = await getVideoById(id);

    let count = 0
    console.log(video.id);
    if (votes === 'upVote') {
        // await Videos.updateOne({ "_id": video.id }, { $inc: { "votes.upVotes": 1 } });
        // let idvideo = Videos.findOne({ _id: video.id })
        // console.log(idvideo, video.id);
        // return idvideo;
        count = parseInt(video.votes.upVotes) + 1;
        video.votes.upVotes = count;

    }
    else if (votes === 'downVote') {
        // await Videos.updateOne({ "_id": video.id }, { $inc: { "votes.downVotes": 1 } })
        // let idVideo = Videos.findOne({ _id: video.id })
        // console.log(video.id);
        // return idVideo;
        count = parseInt(video.votes.downVotes) + 1;
        video.votes.downVotes = count;
    };
    await video.save();
};

const updateViews = async (id) => {
    let video = await getVideoById(id);
    let count = parseInt(video.viewCount) + 1;
    video.viewCount = count;
    await video.save();
};

const postingVideo = async (body) => {
    let video = await Videos.create(body);
    return video;
}

module.exports = {
    getVideoById,
    getVideos,
    filteredVideos,
    updateVotes,
    updateViews,
    postingVideo
};