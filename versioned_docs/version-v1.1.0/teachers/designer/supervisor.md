---
sidebar_position: 4
tags:
  - teachers
  - designer
  - supervisor
keywords:
  - LEIA
  - supervisor
  - monitor
  - flags
  - nudge
  - sensitivity
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# The supervisor

:::info Who can do this
Every role that can finish a LEIA can enable its supervisor. It needs an **OpenAI** key.
:::

The supervisor is a second language model that reads the conversation in the background and reports what you asked it to watch for. Students never see its reports. You see them live in the Workbench and afterwards in the transcript. Optionally the supervisor may also send the student a short coaching message, called a nudge.

Typical uses are watching for students who ask the character for the answer instead of eliciting it, for leading questions in an interview, for off-topic chat or for rude language.

## Enable and configure it

The supervisor is configured in the **Review** step of the design screen, so it belongs to the LEIA. Every replication of that LEIA runs with the same supervisor settings.

![Supervisor card](../../img/teachers/supervisor/01-supervisor-card.webp)

| # | Field | What it does |
|---|---|---|
| 1 | **Enabled** | Turns the supervisor on. The other fields appear only when it is on. |
| 2 | **OpenAI API key** | The key that pays for the supervisor's calls. Only OpenAI keys are listed. |
| 3 | **Model** | The OpenAI model used by the supervisor. A small model is usually enough. |
| 4 | **What should the supervisor watch for?** | Your instructions in plain language. Describe the behaviours to flag. Be concrete, the supervisor quotes the message that triggered each flag. |
| 5 | **Sensitivity** | **Low**, **Medium** or **High**. Higher sensitivity flags weaker signals and produces more flags. |
| 6 | **When it runs** | **Every N messages** checks the conversation periodically. **Only at the end** produces a single report when the session finishes. |
| 7 | **Every N messages** | The period, from 1 to 50. The default is 4. Each pass reads the last twelve messages. |
| 8 | **Let the supervisor nudge the student** | When on, the supervisor may send the student a short message in the chat. |
| 9 | Coaching instructions | What the nudge should say or how it should sound. The nudge is written in the language of the student. |

Flags already reported are not repeated, so a student who keeps doing the same thing produces one flag, not one per message.

## Where the reports appear

| Place | What you see |
|---|---|
| **Live dashboard** of the Workbench | A red flag counter on the session and, in the detail panel, every flag with its category, severity, note and the quoted message. New flags arrive while you watch. See [Live dashboard and spectating](../workbench/live-and-spectate.md). |
| **Conversations** page of the Workbench | The same flags under the transcript, so you can review them while grading. See [Results, grading and export](../workbench/results-and-export.md). |
| The student's chat | Only the nudge, as an amber card the student can dismiss. Flags never reach the student. |

Each flag has a **category** chosen by the supervisor, a **severity** (low, medium or high), a short **note** and the **quote** of the student's message.

## Limits worth knowing

- The supervisor only works with OpenAI. If the LEIA itself runs on another provider, give the supervisor its own OpenAI key. Without one the supervisor is silently skipped.
- The nudge is delivered with the next LEIA answer, not immediately.
- It works in text sessions and in Luke voice sessions. It does not run in the legacy OpenAI Realtime voice mode.
- Supervisor settings are part of the LEIA. To change them, design a new LEIA from the existing one.
