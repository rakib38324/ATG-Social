"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
const mongoose_1 = require("mongoose");
const InteractionSchema = new mongoose_1.Schema({
    interactionAuthId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Candidate' },
    postId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post', required: true },
    interactionNumber: { type: Number },
});
exports.Interaction = (0, mongoose_1.model)('Interaction', InteractionSchema);
