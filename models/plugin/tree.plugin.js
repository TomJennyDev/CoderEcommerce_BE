const tree = (schema) => {
  // Get all category
  schema.statics.getAllCategory = async function () {
    try {
      const categories = await this.find({
        $or: [
          { _id: "62787ed42be5911f1bb9e08c" },
          { parent: "62787ed42be5911f1bb9e08c" },
        ],
        idDeleted: false,
      });
      console.log(categories);
      if (!categories) return [];
      return nestedCategories(categories);
    } catch (err) {
      console.log(err);
    }
  };
  // Get all category
  schema.statics.getChildCategoryById = async function (_id) {
    try {
      const categories = await this.find({
        $or: [{ _id }, { parent: _id }],
        idDeleted: false,
      });
      console.log(categories);
      if (!categories) return [];
      return nestedCategories(categories);
    } catch (err) {
      console.log(err);
    }
  };

  function nestedCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parent == null);
    } else {
      category = categories.filter(
        (cat) => String(cat.parent) == String(parentId)
      );
    }

    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        children: nestedCategories(categories, cate._id),
      });
    }
    return categoryList;
  }
};

module.exports = tree;
