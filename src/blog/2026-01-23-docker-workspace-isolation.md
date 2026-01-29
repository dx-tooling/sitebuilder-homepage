---
title: "Strong Workspace Isolation with Docker Containers"
description: "SiteBuilder now executes all agent commands in isolated Docker containers, providing filesystem and process isolation between workspaces for enhanced security."
author: "Manuel Kießling"
published_time: "2026-01-23T10:00:00+00:00"
tags: [SiteBuilder, Docker, Security, Infrastructure]
readTime: "3 min read"
---

# Why Isolation Matters

When you're building a platform where AI agents can read, modify, and create files, security isn't optional—it's foundational. SiteBuilder lets multiple users edit content across different projects, and each of those editing sessions needs to be completely isolated from the others.

Without proper isolation, a bug or malicious instruction in one workspace could potentially affect other workspaces or even the host system. That's not acceptable for a production content editing platform.

# Docker-Based Execution

With our latest update, all agent shell commands now execute inside isolated Docker containers. Here's what this means in practice:

**Ephemeral Containers**: Each command runs in a fresh container that's removed after execution. There's no persistent state that could leak between operations.

**Filesystem Isolation**: Each workspace is mounted as `/workspace` inside the container. The agent sees only the files it's supposed to see—nothing more.

**Resource Limits**: Containers run with defined limits (2GB RAM, 2 CPUs) to prevent runaway processes from affecting the host system.

**Process Isolation**: Processes inside the container cannot see or interact with processes outside it.

# How It Works

When an AI agent needs to execute a shell command—say, running `npm run build` to compile a landing page—the command flows through our `IsolatedShellExecutor`:

1. The executor spins up a Docker container with the project's configured agent image
2. The workspace directory is mounted at `/workspace`
3. The command executes inside the container
4. Output is captured and returned to the agent
5. The container is removed

The agent always sees `/workspace` as its working directory, regardless of where the actual files live on the host. Our `SecurePathResolver` validates that all file operations stay within workspace boundaries, and `SecureFileOperationsService` translates paths between the agent's view and the actual filesystem.

# Per-Project Agent Images

Different projects have different needs. A Node.js landing page needs different tools than a PHP application. That's why we've added per-project agent image configuration.

When creating or editing a project, you can now specify which Docker image the agent should use. The default is `node:22-slim`, which works great for most static site projects. But if your project needs Python, Ruby, or other tools, you can configure that per-project.

# The Security Model

Our isolation model ensures:

- **No cross-workspace access**: Operations in workspace A cannot read or write files in workspace B
- **No host access**: Containers cannot access the host filesystem outside their mounted workspace
- **Predictable resources**: Resource limits prevent denial-of-service scenarios
- **Clean state**: Each command starts fresh, eliminating state-based vulnerabilities

# What's Next

This isolation layer is the foundation for more advanced features we're planning:

- Support for more complex build pipelines
- Custom tool installations per project
- Multi-container workflows for projects with backend dependencies

The goal is always the same: give content editors the power they need while maintaining the security that engineering teams require.

---

Want to try SiteBuilder? Check out the [GitHub repository](https://github.com/dx-tooling/sitebuilder-webapp) or visit [sitebuilder.dx-tooling.org](https://sitebuilder.dx-tooling.org).
