# DisSLackNoti

A project made to send Discord and Slack notifications from your repo's actions.
---
- You must specify your Slack or Discord token in your Repo secrets, a Slack channel too.
- This is template to use:
```yaml
name: 'Send Notifications'
on:
  pull_request:
  push:
    branches:
      - main
  workflow_dispatch:
  
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
    - name: Send Notification to slack
      uses: AngelVDev/DisSlackNoti@v1.0.3
      with:
        githubToken: ${{ secrets.YOUR_GITHUB_TOKEN }}
        messageType: 'slack' 
        slackToken: ${{ secrets.YOUR_SLACK_API_TOKEN }}
        slackChannel: ${{ secrets.YOUR_SLACK_CHANNEL}}

    - name: Send notification to Discord
      uses: AngelVDev/DisSlackNoti@v1.0.3
      if: always()
      with:
        githubToken: ${{ secrets.YOUR_GITHUB_TOKEN }}
        messageType: 'discord'
        discordWebhookUrl: ${{ secrets.YOUR_DISCORD_WEBHOOK_URL }}


```
