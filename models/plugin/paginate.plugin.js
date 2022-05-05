const paginate = (schema) => {
  schema.statics.paginate = async function (query) {
    let { limit, page, sortBy, ...filter } = query;

    let sort = "";

    if (sortBy) {
      const sortingCriteria = [];

      sortBy.split(",").forEach((sortOption) => {
        const [key, order] = sortOption.split(".");
        sortingCriteria.push((order === "desc" ? "-" : "") + key);
      });

      sort = sortingCriteria.join(" ");
    } else {
      sort = "createdAt";
    }

    limit = limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    page = page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();

    let docsPromise = this.find(filter)
      .select(["+"])
      .sort(sort)
      .skip(skip)
      .limit(limit);

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };

      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
