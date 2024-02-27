const Tag = require('./model');

const store = async (req, res) => {
  try {
    const payload = req.body;
    const newTag = await Tag.create(payload);
    return res.status(201).json({
      message: 'New tag added!',
      data: newTag
    });
  } catch (error) {
    return res.json({
      message: error.message
    });
  };
};

const index = async (req, res) => {
  try {
    const tags = await Tag.find();
    return res.status(200).json({
      message: 'Tags fetched!',
      data: tags
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

module.exports = { store, index };