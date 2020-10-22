"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Database {
    constructor() {
        this.connection = this.init();
    }
    init() {
        return new sequelize_1.Sequelize(database_1.default);
    }
}
exports.default = new Database();
