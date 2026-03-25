"""
Static integration directory manifest.

Each entry describes a third-party integration supported by the platform.
"""

INTEGRATION_DIRECTORY: list[dict] = [
    {
        "id": "slack",
        "name": "Slack",
        "description": "Send notifications and receive commands via Slack channels and DMs.",
        "logo_url": "https://cdn.brandfetch.io/slack.com/w/400/h/400",
        "category": "communication",
        "docs_url": "https://docs.codepilot.dev/integrations/slack",
    },
    {
        "id": "github",
        "name": "GitHub",
        "description": "Sync pull requests, issues, and code reviews directly from GitHub repositories.",
        "logo_url": "https://cdn.brandfetch.io/github.com/w/400/h/400",
        "category": "vcs",
        "docs_url": "https://docs.codepilot.dev/integrations/github",
    },
    {
        "id": "gitlab",
        "name": "GitLab",
        "description": "Connect GitLab projects to automate MR workflows and CI/CD pipeline tracking.",
        "logo_url": "https://cdn.brandfetch.io/gitlab.com/w/400/h/400",
        "category": "vcs",
        "docs_url": "https://docs.codepilot.dev/integrations/gitlab",
    },
    {
        "id": "agents",
        "name": "Agents",
        "description": "Deploy autonomous AI agents to plan, code, review, and ship features end-to-end.",
        "logo_url": "https://cdn.brandfetch.io/anthropic.com/w/400/h/400",
        "category": "ai",
        "docs_url": "https://docs.codepilot.dev/integrations/agents",
    },
    {
        "id": "figma",
        "name": "Figma",
        "description": "Import design specs and component tokens directly from Figma files.",
        "logo_url": "https://cdn.brandfetch.io/figma.com/w/400/h/400",
        "category": "design",
        "docs_url": "https://docs.codepilot.dev/integrations/figma",
    },
    {
        "id": "intercom",
        "name": "Intercom",
        "description": "Surface customer conversations and feature requests as actionable tickets.",
        "logo_url": "https://cdn.brandfetch.io/intercom.com/w/400/h/400",
        "category": "support",
        "docs_url": "https://docs.codepilot.dev/integrations/intercom",
    },
    {
        "id": "zendesk",
        "name": "Zendesk",
        "description": "Convert Zendesk support tickets into engineering tasks with full context.",
        "logo_url": "https://cdn.brandfetch.io/zendesk.com/w/400/h/400",
        "category": "support",
        "docs_url": "https://docs.codepilot.dev/integrations/zendesk",
    },
    {
        "id": "jira",
        "name": "Jira",
        "description": "Bi-directional sync with Jira issues, epics, and sprints.",
        "logo_url": "https://cdn.brandfetch.io/atlassian.com/w/400/h/400",
        "category": "custom",
        "docs_url": "https://docs.codepilot.dev/integrations/jira",
    },
    {
        "id": "sentry",
        "name": "Sentry",
        "description": "Turn Sentry error events into prioritized bug tickets with stack trace context.",
        "logo_url": "https://cdn.brandfetch.io/sentry.io/w/400/h/400",
        "category": "custom",
        "docs_url": "https://docs.codepilot.dev/integrations/sentry",
    },
    {
        "id": "notion",
        "name": "Notion",
        "description": "Pull requirements and specs from Notion databases into your workflow.",
        "logo_url": "https://cdn.brandfetch.io/notion.so/w/400/h/400",
        "category": "custom",
        "docs_url": "https://docs.codepilot.dev/integrations/notion",
    },
    {
        "id": "pagerduty",
        "name": "PagerDuty",
        "description": "Escalate on-call incidents to engineering tickets and track resolution.",
        "logo_url": "https://cdn.brandfetch.io/pagerduty.com/w/400/h/400",
        "category": "support",
        "docs_url": "https://docs.codepilot.dev/integrations/pagerduty",
    },
    {
        "id": "linear",
        "name": "Linear",
        "description": "Sync Linear issues and projects with automated status updates from agents.",
        "logo_url": "https://cdn.brandfetch.io/linear.app/w/400/h/400",
        "category": "custom",
        "docs_url": "https://docs.codepilot.dev/integrations/linear",
    },
]
