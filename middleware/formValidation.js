/* eslint-disable prefer-regex-literals */
const Joi = require('joi');
const resData = require('../helper/response');

module.exports = {

  updateImage: async (req, res, next) => {
    const response = Joi.object({
      image: Joi.string().required(),
    }).validate(req.body);

    if (response.error) {
      return res.status(400).json(resData.failed(response.error.details[0].message));
    }

    next();
  },

  updatePassword: async (req, res, next) => {
    const response = Joi.object({
      password: Joi.string().min(6),
      retype_password: Joi.ref('password'),
    }).validate(req.body);

    if (response.error) {
      return res.status(400).json(resData.failed(response.error.details[0].message));
    }

    next();
  },

  updateUser: async (req, res, next) => {
    const response = Joi.object({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      telp: Joi.number().required(),
    }).validate(req.body);

    if (response.error) {
      return res.status(400).json(resData.failed(response.error.details[0].message));
    }

    next();
  },

  register: async (req, res, next) => {
    const response = Joi.object({
      name: Joi.string().required(),
      username: Joi.string().required(),
      image: Joi.string().allow(null).allow(''),
      telp: Joi.number().required(),
      password: Joi.string().min(6),
      confrimPassword: Joi.ref('password'),
      email: Joi.string().email().required(),
    }).validate(req.body);

    if (response.error) {
      return res.status(400).json(resData.failed(response.error.details[0].message));
    }

    next();
  },

  login: async (req, res, next) => {
    const response = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().min(6),
    }).validate(req.body);

    if (response.error) {
      return res.status(400).json(resData.failed(response.error.details[0].message));
    }

    next();
  },

  order: async (req, res, next) => {
    const response = Joi.object({
      products: Joi.array().required(),
    }).validate(req.body);

    if (response.error) {
      return res.status(400).json(resData.failed(response.error.details[0].message));
    }

    next();
  },

  statusOrder: async (req, res, next) => {
    const response = Joi.object({
      status: Joi.string().required(),
    }).validate(req.body);

    if (response.error) {
      return res.status(400).json(resData.failed(response.error.details[0].message));
    }

    next();
  },

  product: async (req, res, next) => {
    const response = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      category_id: Joi.number().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
    }).validate(req.body);

    if (response.error) {
      return res.status(400).json(resData.failed(response.error.details[0].message));
    }

    next();
  },

  category: async (req, res, next) => {
    const response = Joi.object({
      name: Joi.string().required(),
    }).validate(req.body);

    if (response.error) {
      return res.status(400).json(resData.failed(response.error.details[0].message));
    }

    next();
  },

  address: async (req, res, next) => {
    const response = Joi.object({
      province: Joi.string().required(),
      city: Joi.string().required(),
      postal_code: Joi.number().required(),
      detail: Joi.string().required(),
    }).validate(req.body);

    if (response.error) {
      return res.status(400).json(resData.failed(response.error.details[0].message));
    }

    next();
  },

};
