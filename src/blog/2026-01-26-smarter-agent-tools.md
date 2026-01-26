---
title: "Smarter Agent Tools: Better Commits and Preview Links"
description: "The SiteBuilder editor agent now suggests meaningful commit messages and shares live preview URLs, making the editing experience more transparent."
author: "Manuel Kießling"
published_time: "2026-01-26T14:00:00+00:00"
tags: [SiteBuilder, Agent, Tools, DX]
readTime: "3 min read"
---

# Two New Agent Capabilities

We've added two new tools to SiteBuilder's editor agent that improve how you work with content changes and preview your work.

# Meaningful Commit Messages

Previously, when the agent made file changes, commits used generic messages based on your instruction. Now the agent can suggest commit messages that accurately describe what actually changed.

**How it works:**

When the agent finishes editing files, it calls `suggest_commit_message` to propose a commit message that reflects the actual changes. The system uses this message when committing to the work branch, replacing the generic instruction-based message.

For example, instead of:

```
Changes based on instruction: "Update the pricing page"
```

You might see:

```
Update enterprise tier pricing from $499 to $599/month

Adjusted pricing on the enterprise plan to reflect the new
rate structure effective February 2026.
```

The agent writes commit messages in the same language you're chatting in. If you're having a conversation in German, your commit messages will be in German too.

This makes PR reviews easier — reviewers see commit messages that actually describe the changes, not just the original request.

# Preview URLs for Shareable Links

The agent operates inside a Docker sandbox, where it sees paths like `/workspace/dist/index.html`. This works fine for the agent, but when you want to see your changes in a browser, those paths mean nothing.

The new `get_preview_url` tool translates sandbox paths into browser-accessible URLs that you can click and share.

**Example:**

When the agent runs a build and creates `/workspace/dist/pricing.html`, it can now call the tool to get a URL like:

```
https://sitebuilder.example.com/workspaces/abc123/dist/pricing.html
```

The agent's instructions now include guidance to share preview links after running builds, so you'll see messages like:

> I've rebuilt the site with your changes. You can preview the pricing page here: [preview link]

This is especially useful when you're iterating on changes — you can immediately see what the agent produced without digging through the file system.

# Implementation Notes

Both tools respect SiteBuilder's architecture boundaries:

- The tools are defined in the `WorkspaceTooling` vertical, which owns the agent execution context
- Tool results flow through the existing `AgentExecutionContext`, avoiding database changes for transient data
- The preview URL tool includes path traversal protection — attempts to access paths outside the workspace (using `..`) are rejected

# What's Next

These tools are building blocks for more agent capabilities we're planning. As the agent becomes more capable, transparent communication about what it's doing becomes increasingly important.

---

Try these features at [sitebuilder.dx-tooling.org](https://sitebuilder.dx-tooling.org).
