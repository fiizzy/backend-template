const { Op } = require('sequelize');
const models = require('./models');

const OPERATORS = ['$and', '$or', '$like', '$in', '$eq', '$gt', '$lt', '$gte', '$lte', '$any', '$between'];

function sequelizeDbService (Model) {
  // parser for queries
  const queryBuilderParser = (data) => {
    if (data) {
      Object.entries(data).forEach(([key]) => {
        if (typeof data[key] === 'object') {
          queryBuilderParser(data[key]);
        }
        if (OPERATORS.includes(key)) {
          const opKey = key.replace('$', '');
          data[Op[opKey]] = data[key];
          delete data[key];
        } else if (key === '$ne') {
          data[Op.not] = data[key];
          delete data[key];
        } else if (key === '$nin') {
          data[Op.notIn] = data[key];
          delete data[key];
        }
      });
    }
    return data;
  };

  /*
   * @description : parser for query builder of sort
   * @param  {obj} input : {}
   * @return {obj} data : query
   */
  const sortParser = (input) => {
    const newSortedObject = [];
    if (input) {
      Object.entries(input).forEach(([key, value]) => {
        if (value === 1) {
          newSortedObject.push([key, 'ASC']);
        } else if (value === -1) {
          newSortedObject.push([key, 'DESC']);
        }
      });
    }
    return newSortedObject;
  };

  // create one record
  const createOne = async (data) => Model.create(data);

  // create multiple records
  const createMany = async (data, options = { validate: true }) => Model.bulkCreate(data, options);

  // update record(s) when query matches
  const update = async (query, data) => {
    query = queryBuilderParser(query);
    let result = await Model.update(data, { where: query });
    result = await Model.findAll({ where: query });
    return result;
  };

  // delete record(s) when query matches
  const destroy = async (query) => {
    query = queryBuilderParser(query);
    const result = await Model.findAll({ where: query });
    await Model.destroy({ where: query });
    return result;
  };

  // find single record
  const findOne = async (query, options = {}) => {
    query = queryBuilderParser(query);
    return Model.findOne({
      where: query,
      options,
    });
  };

  // find multiple records with pagination
  const paginate = async (query, options = {}) => {
    query = queryBuilderParser(query);
    if (options && options.select && options.select.length) {
      options.attributes = options.select;
      delete options.select;
    }
    if (options && options.sort) {
      options.order = sortParser(options.sort);
      delete options.sort;
    }
    if (options && options.include && options.include.length) {
      const include = [];
      options.include.forEach((i) => {
        i.model = models[i.model];
        if (i.query) {
          i.where = queryBuilderParser(i.query);
        }
        include.push(i);
      });
      options.include = include;
    }
    options = {
      where: query,
      ...options,
    };
    const result = await Model.paginate(options);
    const data = {
      data: result.docs,
      paginator: {
        itemCount: result.total,
        perPage: options.paginate || 25,
        pageCount: result.pages,
        currentPage: options.page || 1,
      },
    };
    return data;
  };

  // find multiple records without pagination
  const findAll = async (query, options = {}) => {
    query = queryBuilderParser(query);
    if (options && options.select && options.select.length) {
      options.attributes = options.select;
      delete options.select;
    }
    if (options && options.sort) {
      options.order = sortParser(options.sort);
      delete options.sort;
    }
    if (options && options.include && options.include.length) {
      const include = [];
      options.include.forEach((i) => {
        i.model = models[i.model];
        if (i.query) {
          i.where = queryBuilderParser(i.query);
        }
        include.push(i);
      });
      options.include = include;
    }
    options = {
      where: query,
      ...options,
    };
    return Model.findAll(options);
  };

  // count records for specified query
  const count = async (query, options = {}) => {
    query = queryBuilderParser(query);
    return Model.count({
      where: query,
      ...options,
    });
  };

  // upsert records
  const upsert = async (data, options = {}) => Model.upsert(data, options);

  return Object.freeze({
    createOne,
    createMany,
    update,
    destroy,
    findOne,
    paginate,
    findAll,
    count,
    upsert,
  });
}

module.exports = sequelizeDbService;
