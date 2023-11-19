import * as core from '@actions/core'
import * as github from '@actions/github'
import * as service from './services'
import {Octokit} from '@octokit/rest'
import fetch from 'node-fetch'

async function run(): Promise<void> {
  const messageType = core.getInput('messageType')
  const githubToken = core.getInput('githubToken')

  const context = github.context
  const octokit = new Octokit({auth: `token ${githubToken}`, request: {fetch}})

  const commit = await octokit.repos.getCommit({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ref: context.sha
  })

  try {
    const token = core.getInput('slackToken')
    const slackChannel = core.getInput('slackChannel')
    if (messageType === 'slack') {
      await service.sendSlackMessage(token, slackChannel,context, commit)
    } else if (messageType === 'discord') {
      const webhookUrl = core.getInput('discordWebhookUrl')
      await service.sendDiscordMessage(webhookUrl, context, commit)
    } else {
      core.setFailed(
        'Unsupported messageType. Supported types are "slack" and "discord"'
      )
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed(`Unexpected error: ${JSON.stringify(error)}`)
    }
  }
}

run()
