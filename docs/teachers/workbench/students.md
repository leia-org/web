---
sidebar_position: 3
tags:
  - teachers
  - workbench
  - students
keywords:
  - LEIA
  - student
  - join code
  - chat
  - voice
  - solution editor
  - timer
  - consent
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# What students see

:::info Who can do this
Students need no account. Teachers can walk the same path with the **Demo / test link** of a replication, which creates a throwaway identity that is excluded from the results.
:::

This page follows a student from the join code to the end of the session, so you know what to explain in class and what each switch of the replication changes on their screen.

## Steps to give your students

Copy this list into your course page and add the link or the code.

1. Open the link your teacher gave you, or [workbench.leia.ovh](https://workbench.leia.ovh).
2. Type your **Email** and the **Replication code** and press **Start session**.
3. Read the instructions and press **Continue Task**.
4. Talk to the LEIA. Type your message and press **Send**.
5. When you are ready, press the main button at the top. It reads **Go to Editor**, **Send Solution** or **Finish Session**, depending on the activity.
6. If the editor opens, write your solution, press **Send Solution** and confirm with **Conclude Problem**.
7. Read the evaluation if there is one, and press **Open Form** if it appears.

To come back to an unfinished session, repeat the first two steps with the same email.

## Walk the path yourself

1. Open the replication and choose **General** in its sub-menu.
2. Click the **Demo / test link** to copy it.
3. Open it in a new private browser window.
4. Follow the steps above as a student would.

Your test session never appears in the results.

## Join

Students open [workbench.leia.ovh](https://workbench.leia.ovh) or the **Student link** you copied from the replication, which prefills the code.

1. Type the **Email** (1).
2. Type the **Replication code** (2). The **Student link** fills it in.
3. Press **Start session** (3).

The instructions appear. To resume an unfinished session, repeat these steps with the same email.

![Student login](../../img/teachers/students/01-login.webp)

| # | Field or button | What it does |
|---|---|---|
| 1 | **Email** | The identifier of the student. It is not verified and never contacted. The same address must be used to resume a session. |
| 2 | **Replication code** | The code of the replication, the same for the whole class. |
| 3 | **Start session** | Creates the session, or resumes an unfinished one with the same email. |

What can go wrong at this step.

| Message | Cause |
|---|---|
| "Please fill in all fields" | A field is empty. |
| The code is unknown | A typo in the code, or the replication was deleted. |
| The replication is not active | The **Active** switch of the replication is off. |
| The session was already completed | The student finished and the replication is not **Repeatable**. |

In an activity with several LEIAs and **Single LEIA assignment**, each new student receives the LEIA with the fewest sessions so far.

## Consent

The Workbench has a consent dialog, but it does not appear at the moment, because the server has no support for consent. Students go straight to the instructions. If your institution requires consent, collect it outside LEIA. See [Data Usage](replication-settings.md#data-usage).

## Instructions

![Instructions dialog](../../img/teachers/students/03-instructions.webp)

| # | Item | What it is |
|---|---|---|
| 1 | Statement | The **Description** of the problem. |
| 2 | **Continue Task** | Closes the dialog and starts the conversation. In voice modes the microphone is unmuted at this moment. |

## The chat

![Student chat](../../img/teachers/students/04-chat.webp)

| # | Control | What it does |
|---|---|---|
| 1 | Timer | Counts down the **Duration** of the replication. It turns orange in the last minute and red at zero. Shown only when a duration is set. |
| 2 | **Notes** | A floating notepad saved in the student's browser only. It is not sent to you. |
| 3 | **Instructions** | Reopens the statement. A **Guidance** button appears next to it when **Show during exercise** is on and the LEIA has a student infographic. |
| 4 | **Go to Editor**, **Finish Session** or **Send Solution** | The main button. **Go to Editor** opens the solution editor when **Ask for student solution** is on. **Finish Session** ends the session when no solution is asked for. **Send Solution** appears instead when the LEIA has a code editor widget. The button stays disabled until the student has sent a first message. |
| 5 | Message box | Enter sends, Shift+Enter adds a line. |
| 6 | **Send** | Sends the message. |

![Try typing hint](../../img/teachers/students/04b-try-typing.webp)

Before the first message a **Try typing** hint (1) suggests an opening line taken from the behaviour's **Tooltip**. **Click to copy to input** pastes it into the box.

The LEIA answers in the **Language** of the replication. If an answer is slow a **Retry** button appears in the LEIA's bubble. When the student scrolls up, a **New messages** button brings them back down.

### Voice modes

With **Audio mode** set to **Luke**, the chat is replaced by a full-screen stage with the character's avatar, a microphone button and a **Show transcript** panel. With **Legacy (OpenAI Realtime)**, a floating card shows **Mute Microphone**, a visualiser and the connection state. In both cases the student speaks, the LEIA answers with a voice, and the text of the exchange is saved as a transcript unless you enabled **Hide audio transcription**. See [LEIA settings in a replication](leia-settings.md#runner).

### Widgets

![Code editor widget as seen by the student](../../img/teachers/students/06-widgets.webp)

| # | Item | What it is |
|---|---|---|
| 1 | Editor | The code editor configured in the problem, with the statement and the starter code. |
| 2 | Test strip | "not run yet" until the LEIA runs the tests, then the number of passed tests and the failures with the expected and obtained values. |
| 3 | **Send Solution** | Sends the content of the editor as the solution and ends the session. |

There is no run button. Students ask the LEIA to check their code, the LEIA runs the tests and answers with hints, as Ada does in the example after four of five tests passed.

### MultiLEIA

![MultiLEIA conversation](../../img/teachers/students/07-multileia.webp)

Each LEIA message carries the name of the character who speaks, Helen (1) and Omar (2) in the example. After one student message one or more characters answer, up to the limit set in the activity. If a character fails to answer, an amber notice says that the round ended early and the conversation continues.

### Supervisor nudge

![Supervisor nudge](../../img/teachers/students/08-supervisor-nudge.webp)

When the supervisor is enabled with nudges, the student may receive a short amber card (1) with a coaching message. It can be dismissed. The flags themselves never reach the student.

## Submit a solution

1. Press **Go to Editor** (4 in the chat screenshot above).
2. Write the solution in the editor (1).
3. Check the live preview (2).
4. Press **Send Solution** (3).
5. Press **Conclude Problem** (1 in the confirmation below).

The evaluation appears when **Automatic evaluation** is on, or otherwise a simple confirmation.

![Solution editor of the student](../../img/teachers/students/09-solution-editor.webp)

| # | Control | What it does |
|---|---|---|
| 1 | Editor | The solution in the **Solution Format** of the problem. It starts with the **Initial Solution**, or with a sample diagram for Mermaid when there is none. For LEIAs with the code editor widget the code is carried over. |
| 2 | Preview | Live rendering of diagrams, Markdown and HTML, syntax colours for the rest. |
| 3 | **Send Solution** | Asks for confirmation, then submits. |
| 4 | Timer | The same countdown as in the chat. **Notes** is available here too. |

![Conclude Problem confirmation](../../img/teachers/students/09b-conclude-confirm.webp)

The confirmation says "This action will conclude the problem and you will not be able to continue working on it". **Conclude Problem** (1) submits, **Cancel** (2) returns to the editor.

:::caution The timer and the editor
If the time runs out while the student is in the editor, the session is closed without submitting the editor content. Tell students to submit a minute before the end.
:::

### Finish without a solution

1. Press **Finish Session** (4 in the chat screenshot above).
2. In the **Session Completed** dialog, press **Home**, or **Open Form** if it appears.

## After submitting

![Evaluation shown to the student](../../img/teachers/students/10-evaluation.webp)

| # | Item | What it is |
|---|---|---|
| 1 | Evaluation | The automatic evaluation, when **Automatic evaluation** is on. Otherwise a simple "Solution submitted successfully". |
| 2 | Conversation viewer link | A link to a read-only view of the conversation, valid for one year, with a **Copy Link** button. Students can keep it or hand it in. |
| 3 | **Home** | Returns to the login page. |
| 4 | **Open Form** | Opens the questionnaire. Shown only when the replication has an **External form URL**. |

Once the dialog is closed the editor shows the reference **Problem Solution** next to **Your Solution**, so the student can compare.

When no solution is asked for, **Finish Session** shows a simpler **Session Completed** dialog with the same **Home** and **Open Form** buttons.

![Login refused after finishing](../../img/teachers/students/11-session-completed.webp)

A student who enters the code again after finishing is stopped at the login form with the message "User has already finished this replication. Replication is not repeatable." (1). If the replication is **Repeatable**, entering the code again starts a fresh session instead. A student who reopens the address of a finished chat sees **Session Already Completed** with a countdown back to the login page.

## What students never see

- The **Details**, **Solution** and **Evaluation Prompt** of the problem, except the solution after submitting.
- The supervisor flags.
- The infographic with the solution.
- Other students' sessions.
