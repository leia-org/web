---
sidebar_position: 5
tags:
  - teachers
  - workbench
  - results
  - grading
  - export
keywords:
  - LEIA
  - conversations
  - transcript
  - evaluation
  - score
  - CSV
  - export
  - supervisor flags
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Results, grading and export

:::info Who can do this
The owner of the replication, administrators and anyone with its share link. Editing a score is reserved to administrators in the current interface.
:::

The **Conversations** section of a replication is where you read what happened, check the automatic evaluation, change a score and download everything. Test sessions, those started with **Test session** or with the **Demo / test link**, are not listed and are not exported.

## The conversations page

### Open the results

1. Open a replication and choose **Conversations** in its sub-menu.
2. Press **Open conversations**. **Conversations** on the replications list opens the same page.
3. Read the counters (1).
4. Type an email in **Search by email** (2) to find one student.

![Conversations page](../../img/teachers/results/01-conversations.webp)

| # | Control | What it shows or does |
|---|---|---|
| 1 | Counters | **Total sessions**, **Completed** and **Avg score**, the average of the sessions that have a score. |
| 2 | **Search by email** | Filters the list by the student identifier. |
| 3 | A session | A green dot for finished sessions and an amber one for sessions in progress, the email or **Anonymous**, the number of messages, the score and the start time. |
| 4 | **Download CSV** | Downloads every session of the replication as one file named after the replication. See [The CSV file](#the-csv-file). |

**Live** in the header jumps to the live dashboard.

## A session in detail

1. Click a session (3 in the conversations page above).
2. Read the transcript (1).
3. Read the **Evaluation** (2), when there is one.
4. Scroll down to **Supervisor flags** and **Submitted result**, when they have content.
5. Press **Configuration** or **Data Usage** to switch the detail view, and **Conversation** to come back.

![Session detail](../../img/teachers/results/02-session-detail.webp)

| # | Item | What it is |
|---|---|---|
| 1 | Transcript | Every message with its time. In MultiLEIA sessions each message carries the name of the character. |
| 2 | **Evaluation** | The text produced by the automatic evaluation, when it was enabled. |

Two more blocks follow the evaluation when they have content.

![Supervisor flags of a session](../../img/teachers/results/02b-supervisor-flags.webp)

**Supervisor flags** (1) lists the flags raised during the session, each with its severity, category, note and quoted message. See [The supervisor](../designer/supervisor.md).

![Submitted result of a session](../../img/teachers/results/02c-submitted-result.webp)

**Submitted result** (1) is the solution sent by the student. Mermaid diagrams are drawn, other formats are shown as text.

Three buttons switch the detail view.

| View | Content |
|---|---|
| **Conversation** | The transcript, the evaluation, the flags and the submission described above. |
| **Configuration** | Meant to show a snapshot of how the replication and the LEIA were configured when the session ran. No snapshot is stored at the moment, so the view reads "No replication configuration was stored for this conversation". |
| **Data Usage** | Meant to show whether consent was required and what the student answered. Consent does not work at the moment, so the view reads "No data usage configuration was stored for this conversation". See [Data Usage](replication-settings.md#data-usage). |

![Configuration view](../../img/teachers/results/03-session-config.webp)

| # | Control | What it shows |
|---|---|---|
| 1 | **Conversation** | Switches back to the transcript. |
| 2 | **Configuration** | Switches to the snapshot view, empty at the moment. |
| 3 | **Data Usage** | Switches to the consent view, empty at the moment. |

## Scores

Only administrators can change a score.

1. Click a session in the list.
2. Click its **Score** chip.
3. Type a score from 0 to 100, with one decimal at most.
4. Press the tick to save, or the cross to discard.

The chip shows the new score, which replaces the automatic one.

Each session shows a **Score** chip. The automatic evaluation returns a score from **0 to 10** and stores it there. Administrators can click the chip to type a manual score from **0 to 100** with one decimal, which replaces the automatic one. The field refuses values outside that range with "Please enter a valid score between 0 and 100", the tick saves and the cross discards. Advanced accounts see the chip but cannot edit it.

:::caution Two scales
Automatic scores use 0 to 10, manual scores accept 0 to 100. Decide one scale for your course before you start grading, otherwise the average counter mixes both.
:::

## The CSV file

1. Press **Download CSV** (4 in the conversations page above).
2. Save the file, which is named after the replication.

**Download CSV** produces one row per message, so a session with twenty messages occupies twenty rows that share the session columns. A session with no messages gets one row with "No messages" in **Message**, and **Is LEIA** and **Timestamp** empty.

| Column | Content |
|---|---|
| Session ID | The identifier of the session. Use it to group rows. |
| User | The email the student typed, or **Anonymous**. |
| Started At, Finished At | Timestamps of the session. |
| Message | The text of the message. |
| Is LEIA | `TRUE` for messages written by the LEIA, `FALSE` for the student. |
| Timestamp | When the message was sent. |
| Score | The score of the session, repeated on every row. A score of 0 is exported as an empty cell. |
| Evaluation | The evaluation text, repeated on every row. |

The submitted solution and the supervisor flags are not in the file. Read them in the detail panel. The file has only the columns above, so nothing about the configuration of the replication.

### Analyse the file in a spreadsheet

1. Open the file in your spreadsheet.
2. Filter **Is LEIA** on `FALSE` to count the student messages.
3. Build a pivot table on **Session ID** to get one line per student with the score and the number of messages.

## Suggested grading routine

1. Open the sessions with the lowest scores first. A very low score often means an empty or malformed submission rather than a bad interview.
2. Read the transcript before the evaluation. The evaluation only sees the submission and the reference solution, not the conversation.
3. Check the supervisor flags for students who asked the character for the answer.
4. Adjust the score when you disagree with the model, or keep your own grades outside LEIA and use the CSV as evidence.
5. Download the CSV at the end of the course and keep it with your records, the replication can be deleted later.
