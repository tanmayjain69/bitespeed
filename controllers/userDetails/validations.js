const Joi = require("@hapi/joi");

const detailsSchema = Joi.object()
  .keys({
    phoneNumber: Joi.string()
      .required()
      .regex(/^[0-9]{10}$/),
    email: Joi.string().regex(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    ),
  })
  .unknown();

module.exports = { detailsSchema };
