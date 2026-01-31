---
title: "January 2026 Updates: BYOK, Custom Agents, and More"
description: "This month's SiteBuilder updates bring user-controlled API keys, customizable agent behavior, real-time activity indicators, and improved project management."
author: "Manuel Kießling"
published_time: "2026-01-24T10:00:00+00:00"
tags: [SiteBuilder, Features, BYOK, UX]
readTime: "4 min read"
---

We've shipped several features this month that give you more control over your SiteBuilder experience. Here's what's new.

# Bring Your Own Key (BYOK)

The most requested feature is here: you can now use your own LLM API keys instead of relying on a shared platform key.

![SiteBuilder Edit project: GitHub access key and LLM API key — bring your own keys](https://dx-tooling.org/sitebuilder-assets/webapp-screenshots/web-versions/SiteBuilder-edit-project-GitHub-access-key-and-LLM-API-key-bring-your-own-keys-1291x1600.png)

**Why this matters:**
- **Cost control**: Pay only for what you use, directly to your provider
- **Usage visibility**: See exactly what you're spending in your own dashboard
- **No rate limiting**: Your keys, your limits

**How it works:**

When creating or editing a project, you'll see a new "LLM API Key" section. Paste your OpenAI or Anthropic key, and SiteBuilder will:

1. Verify the key is valid in real-time
2. Auto-detect whether it's an OpenAI or Anthropic key
3. Store it securely with your project

You can also reuse keys across projects—if you've already configured a key for one project, you can select it when setting up another.

The verification happens against the actual provider APIs, so you'll know immediately if there's an issue with your key before you start an editing session.

# Custom Agent Configuration

Different projects need different AI behaviors. A marketing landing page might need a friendly, sales-oriented tone, while technical documentation needs precision and accuracy.

You can now customize the AI agent's behavior per project with three instruction types:

**Background Instructions**: Set the context for the agent. What kind of project is this? What's the brand voice? What should the agent know before starting?

**Step Instructions**: Guide how the agent approaches each editing task. Should it be conservative or creative? Should it ask clarifying questions or make reasonable assumptions?

**Output Instructions**: Control the final output. What format should responses use? What should be included or excluded?

We've included sensible defaults based on your project type—a landing page project gets different defaults than a documentation project. But you can customize everything in the "Agent Configuration (Advanced)" section of the project form.

# Activity Indicators

Ever wondered what the AI is doing during a longer editing session? Now you can see.

We've added two activity badges to the chat interface:

**Working Badge**: Shows how many tool calls the agent has made. When the agent is actively using tools (reading files, making edits, running commands), the badge pulses to show activity.

**Thinking Badge**: Displays accumulated processing time in seconds. This helps you understand how long complex operations are taking.

Both badges remain visible after a session completes, showing you the final stats. For historical conversations, you'll see the tool count and a "—" for thinking time.

It's a small UX improvement, but it makes the editing experience feel more transparent and responsive.

# Project Management Improvements

Managing your projects just got easier with a complete deletion lifecycle:

**Soft Delete**: When you delete a project, it's not gone forever. The project moves to a "Deleted projects" section (collapsed by default) where you can see when it was deleted.

**Restore**: Changed your mind? Click restore and your project returns to the active list, exactly as it was.

**Permanent Delete**: When you're sure you want a project gone, permanent delete removes it and its associated workspace from the database entirely.

This three-stage approach prevents accidental data loss while keeping your project list clean. The deleted projects section shows a count in the header, so you always know if there's anything in the trash.

# Coming Up

We're continuing to improve SiteBuilder based on your feedback. On the roadmap:

- GitLab and Bitbucket support
- Team collaboration with role-based permissions
- More project type templates

Have a feature request? Open an issue on [GitHub](https://github.com/dx-tooling/sitebuilder-webapp) or reach out directly.

---

Try these new features at [sitebuilder.dx-tooling.org](https://sitebuilder.dx-tooling.org).
