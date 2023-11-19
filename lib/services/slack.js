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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSlackMessage = void 0;
const web_api_1 = require("@slack/web-api");
function sendSlackMessage(token, slackChannel, context, commit) {
    return __awaiter(this, void 0, void 0, function* () {
        // Styling the message
        const runUrl = `https://github.com/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`;
        const message = {
            text: 'GitHub Actions Workflow Execution Details',
            blocks: [
                {
                    type: 'divider' // divider at the top
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Workflow Name:* ${context.workflow}`
                    }
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Event:* ${context.eventName}`
                    }
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Run URL:* <${runUrl}>`
                    }
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Triggered By:* ${context.actor}`
                    }
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Commit URL:* <https://github.com/${context.repo.owner}/${context.repo.repo}/commit/${context.sha}>`
                    }
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Commit Message:* ${commit.data.commit.message}`
                    }
                },
                {
                    type: 'divider' // divider at the top
                }
            ]
        };
        const web = new web_api_1.WebClient(token);
        yield web.chat.postMessage({
            channel: slackChannel,
            text: message.text,
            blocks: message.blocks
        });
    });
}
exports.sendSlackMessage = sendSlackMessage;
