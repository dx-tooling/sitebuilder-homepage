---
title: "UX Improvements: Conversation History and Reviewer Dashboard"
description: "View finished conversations, access PR links directly from the reviews page, and enjoy faster project loading with cached PR URLs."
author: "Manuel Kießling"
published_time: "2026-01-26T15:00:00+00:00"
tags: [SiteBuilder, UX, Performance, Reviews]
readTime: "2 min read"
---

# Better Access to Editing History

Several UX improvements make it easier to track what changed and review content edits.

# Read-Only Conversation View

Previously, when you navigated to a finished conversation, you were redirected to the project list. Not ideal when you wanted to review what changes were discussed or share a conversation with a colleague.

Now finished conversations display in a read-only view that shows the complete dialog history. You see everything that was discussed — the user's requests, the agent's responses, and the file changes that were made.

**What's different in read-only mode:**

- The chat input is hidden (the conversation is complete)
- Activity indicators and presence tracking are disabled
- No context usage polling (nothing is actively running)
- The CTA buttons for submitting changes are removed

This is useful for:
- **Onboarding new team members** — "Here's how the last campaign update went"
- **Reviewing past changes** — "What exactly did we change on the pricing page?"
- **Documentation** — Link to specific conversations in your internal docs

Viewing a finished conversation has no side effects on workspace state.

# PR and Conversation Links on Reviews Page

The reviewer dashboard now includes direct links for each workspace:

- **GitHub PR link** — Opens the pull request in a new tab for code review
- **Conversation link** — Shows what changes were discussed that led to the PR

Reviewers no longer need to hunt for the relevant PR or conversation. Everything is one click away.

# Faster Project Loading

The projects overview page was slow because it made sequential GitHub API calls to fetch PR URLs for each workspace. With multiple projects, this added noticeable delays.

**The fix:** PR URLs are now cached in the workspace entity when a pull request is created. The projects page reads from the cache instead of hitting the GitHub API on every page load.

The cache is automatically cleared when:
- A new workspace branch is created (during setup)
- The workspace is manually reset

This means the cached URL stays valid for the duration of the PR lifecycle, including after the PR is merged.

# Small but Meaningful

These aren't headline features, but they remove friction from daily workflows. Faster page loads, easier access to history, and quick navigation to the things you need to review — they add up.

---

Experience these improvements at [sitebuilder.dx-tooling.org](https://sitebuilder.dx-tooling.org).
