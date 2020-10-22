"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./app/controllers/UserController"));
const routes = express_1.Router();
// Users
routes.post('/users', UserController_1.default.store);
routes.get('/users', UserController_1.default.index);
routes.delete('/users/:id', UserController_1.default.delete);
exports.default = routes;
