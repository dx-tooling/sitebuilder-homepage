---
title: "Organizations and Teams: Groups, Invitations, and Access Rights"
description: "SiteBuilder now supports organizations with groups, member invitations, and access rights so teams can share projects and control who sees what."
author: "Manuel Kießling"
published_time: "2026-02-02T10:00:00+00:00"
tags: [SiteBuilder, Features, Organizations, Teams, Access]
readTime: "3 min read"
---

Until now, SiteBuilder accounts were flat: you had your projects, and access was largely per-account. As more teams adopt SiteBuilder, the need for structure grows — shared projects, clear roles, and controlled access.

We've added **organization management** so you can group people and projects and decide who can do what.

# What's New

**Organizations** — Create an organization (e.g. your company or department). Projects can belong to an organization, and members can be invited into it.

**Groups and invitations** — Invite members by email. They receive an invitation flow and join the organization. No more sharing a single account or ad-hoc access.

**Access rights** — Control who can view or manage projects within the organization. Permissions are scoped so that one organization cannot access another's projects or API keys.

This is especially useful for:

- **Marketing and engineering** — One org, shared projects, reviewers and editors with the right access.
- **Agencies** — Separate organizations per client; each client's projects and keys stay isolated.
- **Departments** — Product, support, or content teams each with their own org and project set.

# Security: Keys Stay Scoped

LLM API keys are scoped per organization. A key stored in one org cannot be used by another, so you can safely use multiple orgs (e.g. agency clients) without cross-access.

# Invitation and Password Flows

Invitation and password-reset flows have been hardened with CSRF protection and session refresh. Invited users get a secure link; once they set a password and sign in, they see the organization and its projects according to their rights.

# Getting Started

Organization management is available in the application: create an organization, invite members, and move or create projects under it. Access rights are configurable so you can align SiteBuilder with how your team actually works.
