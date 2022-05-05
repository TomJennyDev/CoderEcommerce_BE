const toJSON = (schema) => {
  schema.methods.toJSON = function () {
    const user = this;

    const obj = user._doc;

    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    obj.id = obj._id;
    delete obj._id;

    return obj;
  };
};

module.exports = toJSON;
