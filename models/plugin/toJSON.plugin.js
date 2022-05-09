const toJSON = (schema) => {
  schema.methods.toJSON = function () {
    const user = this;

    const obj = user._doc;

    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
  };
};

module.exports = toJSON;
