---
sidebar_position: 2
tags:
  - tutorial
  - scenario
  - requirements
keywords:
  - LEIA
  - requirements elicitation
  - interview
  - client
  - UML
  - Mermaid
  - scenario
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Scenario, a requirements elicitation interview

The classic LEIA. The student plays the analyst, the LEIA plays a client who knows what they need but does not know how to say it, and the deliverable is a model of what the student discovered. The example used throughout the teacher guide is Helen Park, the manager of a small university library who wants a room booking and lending application.

## What you need

- An account with the advanced role.
- An OpenAI key or a system key.
- A reference solution in mind. For a class diagram, sketch the classes and relationships you expect before you start.

## 1. Design the LEIA

Open **Design** and describe the interview.

> Create a requirements-elicitation activity about a library booking system. The persona is Helen Park, the manager of a small university library. She wants a web application so students can book study rooms and borrow books. Students must interview Helen to discover the requirements and deliver a UML class diagram in Mermaid syntax as their solution.

The assistant produces a persona, a behaviour that answers questions without volunteering the whole picture, and a problem with a Mermaid solution.

![Problem editor](../img/teachers/components/02-problem-editor.webp)

Open the **Problem** card and shape the exercise.

- **Description** (3) is the brief students read. Say who they are meeting and what they must deliver.
- **Details** (5) lists the facts the client knows. The more concrete the list, the more consistent the interview. Mention the facts the client should only reveal when asked.
- **Solution** (6) is the reference class diagram. The preview under the field shows it, so you can check the Mermaid syntax.
- **Evaluation Prompt** (9) tells the grader what matters. For example "Check that the diagram contains bookings, rooms, books, loans and users, with sensible multiplicities. Do not penalise different class names if the meaning is the same".
- **Initial Solution** (7) can hold a skeleton such as `classDiagram` with one class, so students start from valid syntax. It must not be left empty.

Open the **Behaviour** card and read the description. A good client behaviour answers only what is asked, stays in role, gives realistic answers and never produces a list of requirements on request. The **Tooltip** can be "Hello Helen, could you tell me about your library?".

Finish the LEIA with a clear name and a label for your course.

## 2. Test the interview and the grading

Test the LEIA from the library. Ask open questions and check that the character reveals the facts in **Details** gradually. Then open the **Solution Editor**, paste a partial diagram and evaluate it. Repeat with the full reference solution. The scores should be clearly different. See [Test a LEIA](../teachers/designer/test-leia.md).

![Evaluation result](../img/teachers/test-leia/03-evaluation.webp)

## 3. Replicate

Use **Quick replication** on the row or create an activity and publish it. In the Workbench configure the replication.

| Setting | Suggested value | Why |
|---|---|---|
| **Ask for student solution** | on | The diagram is the deliverable. |
| **Automatic evaluation** | on | Students get feedback at once and you get a score. |
| **Duration** | 30 to 45 minutes | Enough for an interview and a diagram. |
| **Repeatable** | off | One interview per student. Turn it on for practice sessions. |
| **Language** | the language of your class | The client answers in it and the evaluation is written in it. |
| **Show during exercise** | on, if you generated the student infographic | Students can re-read the brief without leaving the chat. |

See [Replication settings](../teachers/workbench/replication-settings.md) and [LEIA settings in a replication](../teachers/workbench/leia-settings.md).

## 4. During the class

Open the **Live** dashboard to see who has started, how many messages each student has exchanged and the supervisor flags if you enabled one. **Watch live** opens any conversation in real time. See [Live dashboard and spectating](../teachers/workbench/live-and-spectate.md).

## 5. Grade

In **Conversations** read each transcript, the submitted diagram, which is rendered, and the evaluation. Adjust the score if you disagree with the grader. Download the CSV for your records. See [Results, grading and export](../teachers/workbench/results-and-export.md).

## Voice variant

The same LEIA can be run as a spoken interview. In the replication set **Audio mode** to **Luke** or **Legacy (OpenAI Realtime)** and pick a voice that matches the persona's pronouns. Students then talk to Helen through the microphone and still write the diagram in the editor at the end. Voice uses the platform's keys and the transcript is saved like a text conversation, unless you enable **Hide audio transcription**. See [LEIA settings in a replication](../teachers/workbench/leia-settings.md#runner).

## Variations

- Two clients with conflicting needs in one activity with **MultiLEIA conversation**. See [Scenario, a group simulation with several LEIAs](multi-leia-simulation.md).
- A transcript to analyse instead of an interview to conduct. Put the LEIA in **transcription** mode in the activity and let the platform generate the conversation. See [Activities](../teachers/designer/activities.md#transcription-mode).
- A process discovery interview. Change the deliverable to a Mermaid flowchart or sequence diagram and adapt the evaluation prompt.
