"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const interaction_validation_1 = require("./interaction.validation");
const interaction_controller_1 = require("./interaction.controller");
const router = express_1.default.Router();
router.post('/like-unlike', (0, Auth_1.default)(), (0, validateRequest_1.default)(interaction_validation_1.interactionValidation.createInteractionValidationSchema), interaction_controller_1.InteractionControllers.createInteraction);
exports.interactionRouters = router;
