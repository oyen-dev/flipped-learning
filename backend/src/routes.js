const { Router } = require("express");
const { auth1Routes } = require("./auth/auth.routes");
const { AppLogger } = require("./utils/logger");
const { serve, setup } = require("swagger-ui-express");
const swaggerDoc = require("./openapi.json");

const routes = Router();

// Load auth v1 routes
routes.use('/v1/auth', auth1Routes);

// Load root handlers
routes.use('/', serve, setup(swaggerDoc));

module.exports = {
    routes
};