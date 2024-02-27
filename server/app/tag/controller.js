const Tag = require('./model');
const Product = require('../product/model');

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

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updatedTag = await Tag.findByIdAndUpdate(id, payload, { new: true });
    return res.status(200).json({
      message: 'Tag updated!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: updatedTag
    });
  };
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.updateMany({ tags: { $in: [id] } }, { $pull: { tags: id } });
    await Tag.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Tag deleted!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

module.exports = { store, index, update, destroy };