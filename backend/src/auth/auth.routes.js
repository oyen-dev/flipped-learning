const { Router } = require("express");
const { loginHandler } = require("./auth.handlers");

const auth1Routes = Router();

auth1Routes.post('/login', loginHandler)

module.exports = {
    auth1Routes
}