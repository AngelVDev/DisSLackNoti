"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDiscordMessage = void 0;
const axios_1 = __importDefault(require("axios"));
function sendDiscordMessage(webhookUrl, context, commit) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = webhookUrl;
        const runUrl = `https://github.com/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`;
        const embed = {
            embeds: [
                {
                    title: 'Workflow Execution Details',
                    fields: [
                        {
                            name: 'Workflow Name',
                            value: context.workflow,
                            inline: true
                        },
                        {
                            name: 'Event',
                            value: context.eventName,
                            inline: true
                        },
                        {
                            name: 'Run URL',
                            value: `[Link to run](${runUrl})`,
                            inline: true
                        },
                        {
                            name: 'Triggered By',
                            value: context.actor,
                            inline: true
                        },
                        {
                            name: 'Commit URL',
                            value: `[Link to commit](https://github.com/${context.repo.owner}/${context.repo.repo}/commit/${context.sha})`,
                            inline: true
                        },
                        {
                            name: 'Commit Message',
                            value: commit.data.commit.message,
                            inline: true
                        }
                    ]
                }
            ]
        };
        const response = yield axios_1.default.post(url, embed);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Discord webhook failed with status ${response.status}`);
        }
    });
}
exports.sendDiscordMessage = sendDiscordMessage;
