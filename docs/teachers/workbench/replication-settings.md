---
sidebar_position: 1
tags:
  - teachers
  - workbench
  - replication
keywords:
  - LEIA
  - replication
  - student link
  - code
  - active
  - repeatable
  - duration
  - language
  - consent
  - external form
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Replication settings

:::info Who can do this
The owner of the replication and administrators. People who received a **share link** can change the switches and regenerate the code but not rename the replication, change its language or manage sharing.
:::

A replication has three sections of settings that apply to every LEIA in it. **General** holds the links, the code and the switches that decide when and how students can join. **Settings** holds the external form. **Data Usage** holds the consent options. The per-LEIA settings, such as the model and the automatic evaluation, are on the [LEIA settings page](leia-settings.md).

## General

![General section, links and identity](../../img/teachers/replication-settings/01-general-links.webp)

| # | Control | What it does |
|---|---|---|
| 1 | **Student link** | The address to give students. It opens the Workbench with the code already filled in. Click to copy. |
| 2 | **Demo / test link** | The same address with a throwaway identity. Each visit creates a fresh test student, and test sessions never appear in the results. Use it to try the activity yourself or to demonstrate it in class. |
| 3 | **Shared access** | When on, anyone with the share link can manage this replication without an account. A **Share token** chip appears with **Copy share link** and **Regenerate**. Regenerating invalidates the previous link. |
| 4 | **Name** and **Rename** | The name of the replication in your list. Names are unique. |
| 5 | **Code** and **Regenerate code** | The code students type. Regenerating gives a new code and the old one stops working for new students. Sessions already started continue. |

Below the identity block, **Experiment**, **Created** and **Last updated** are read only.

![General section, state switches](../../img/teachers/replication-settings/02-general-controls.webp)

| # | Control | What it does |
|---|---|---|
| 1 | **Language** | The language of the conversation, the evaluation and the feedback. Free text, for example `Spanish` or `es`. The edit button is labelled **Rename**. The LEIA may still switch language if a student clearly writes in another one. |
| 2 | **Active** | Whether students can join. A new replication starts inactive. Activation checks that every LEIA has a model and a key, and refuses with a list of the LEIAs to fix otherwise. Turning it off stops new joins but does not interrupt sessions in progress. |
| 3 | **Repeatable** | Whether a student who finished may start again with the same email. When off, a finished student gets "Session Already Completed". An unfinished session is always resumed, repeatable or not. |
| 4 | **Duration** | The time limit per session. **No time limit** by default. **Add timer** opens the dialog below, **Change** edits it and **Remove** clears it. |

![Set replication duration dialog](../../img/teachers/replication-settings/03-duration-dialog.webp)

| # | Control | What it does |
|---|---|---|
| 1 | **Hours**, **Minutes**, **Seconds** | The limit, from one second up to 23 hours. |
| 2 | Quick presets | **15m**, **30m**, **45m**, **1h**, **1h 30m**, **2h**. |
| 3 | **Total** | The resulting limit. **Save** needs a total above zero. |

:::caution The timer lives in the student's browser
The countdown is shown and enforced by the student's browser. The server does not close sessions on its own, so a student who reloads at the right moment or disables the timer may continue. Use the **Started** and **Finished** times of the results to check, and treat the limit as guidance rather than as a hard wall. When the time runs out while the student is in the solution editor, the session closes without submitting.
:::

### Activation errors

![Activation refused](../../img/teachers/replication-settings/04-activation-error.webp)

When a LEIA has no model or no key, the **Active** switch stays off, a message lists the LEIAs concerned and the **Model** field of each one is outlined in red. Open the LEIA, pick a model and a key, press **Save** and try again. A MultiLEIA replication also needs at least two LEIAs, no audio mode and the same process on every LEIA.

## Settings

![External form](../../img/teachers/replication-settings/05-settings-form.webp)

| # | Control | What it does |
|---|---|---|
| 1 | **External form URL** | An optional link, for example a questionnaire, that students get as an **Open Form** button when they finish. Only addresses starting with `http` or `https` are offered to students. |
| 2 | **Change** and **Delete** | Set or clear the link. |

## Data Usage

![Data usage section](../../img/teachers/replication-settings/06-data-usage.webp)

| # | Control | What it does |
|---|---|---|
| 1 | **Data Usage Consent Acceptance** | When enabled, every student must accept or decline before the first message. The choice is stored with the session and shown in the results. |
| 2 | **Consent message** | The text of the dialog. A default text about educational and research purposes is provided, replace it with the wording your institution requires. |
| 3 | **Conversation automated removal** | When enabled, the conversation of a student who **declined** is deleted after the session ends. Only the metadata of the session is kept. Available only while consent is enabled. |
| 4 | **Save** | Writes the three settings together. Disabled while consent is on and the message is empty. |

:::caution Availability
Consent and automatic removal are present in the Workbench interface of the development version but the matching server support has not reached that version yet, so **Save** may fail there. The production version supports them. If **Save** returns an error, leave consent off and collect consent outside LEIA.
:::

Test sessions started with the **Demo / test link** or with **Test session** skip the consent dialog.

## A checklist for a class session

1. **Language** set, **Duration** decided.
2. Every LEIA has a model and a key, and **Ask for student solution** and **Automatic evaluation** match your intentions.
3. **Repeatable** on for practice, off for assessed work.
4. **External form URL** if you want feedback.
5. **Active** on, then share the **Student link** or the **Code**.
6. After the class, **Active** off, so late joiners do not create new sessions.
