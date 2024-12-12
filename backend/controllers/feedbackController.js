const Feedbacks = require("../models/Feedbacks");
const { feedBackBody } = require("../types");
// here is the logic related to feedbacks

const createFeedback = async (req, res) => {
  // validating the req.body using zod, it checks all fields are
  // valid, and also checks for extra(not allowed) parameters 
  const input = feedBackBody.safeParse(req.body);
  if (!input.success) {
    return res.json({
      code: 400,
      message: "Invalid Data",
      error: input.error.issues[0].message,
    });
  }

  try {
    const feedback = await Feedbacks.create(req.body);

    // if feedback is created in db
    if (feedback) {
      res.json({
        code: 200,
        message: "success",
        data: feedback,
      });
    } else {
      res.json({
        code: 500,
        message: "failed to create feedback",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "failed due to internal error",
      code: 501,
    });
  }
};

const getFeedback = async (req, res) => {
  // by default, fetching data as ascending order
  let sortOrder = 1;
  if (req.query.sort == -1) {
    sortOrder = -1;
  }

  // default category is all, we don't apply any category here
  let category = "all";

  // these are available categories
  const categories = ["suggestion", "bug", "feature"];
  if (categories.includes(req.query.category)) {
    category = req.query.category;
  }
  console.log(req.query);
  console.log(sortOrder, category);
  try {
    let feedbacks;
    if (category === "all") {
      feedbacks = await Feedbacks.find().sort({ createdAt: sortOrder }).lean();
    } else {
      feedbacks = await Feedbacks.find({ category })
        .sort({ createdAt: sortOrder })
        .lean();
    }

    res.json({
      code: 200,
      message: "success",
      data: feedbacks,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "failed to fetch feedback",
      code: 501,
    });
  }
};

module.exports = {
  getFeedback,
  createFeedback,
};
