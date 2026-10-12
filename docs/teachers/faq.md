---
sidebar_position: 5
tags:
  - teachers
  - faq
  - limitations
keywords:
  - LEIA
  - FAQ
  - limitations
  - known issues
  - troubleshooting
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Limitations and FAQ

Honest answers to the questions teachers ask most, plus the limits of the current version that are worth knowing before you plan a class.

## Accounts and roles

**I registered but I cannot see Activities or enter the Workbench.** New accounts get the instructor role. Activities, replications and the whole Workbench need the advanced role. Ask the LEIA team at [team@leia.ovh](mailto:team@leia.ovh).

**Finish LEIA fails with "Failed to create behaviour resource".** Your account is an instructor and the LEIA has a new behaviour. Only the advanced and admin roles can create behaviours. Use **Design from this** on an existing LEIA and leave the behaviour as it is, or ask for the advanced role.

**Can I make my LEIA public?** Only administrators publish. Everything you create is private until then. Private LEIAs still work in your own replications.

## Designing

**Finish LEIA fails with "Failed to create problem resource".** The most common cause is an empty **Initial Solution** written by the assistant. Open the problem and write something in **Initial Solution**, a skeleton or a one-line instruction. Removing the line in the **Code Editor** tab does not help, the visual editor sends the field as empty text anyway. See [Persona, Problem and Behaviour fields](designer/components-reference.md#problem).

**The assistant created a problem and my behaviour disappeared.** Applying a new problem clears the behaviour on purpose, because the behaviour must match the problem. Ask the assistant to apply a behaviour again.

**Can I edit a LEIA after saving it?** No. LEIAs and their components are immutable. Open it with **Design from this**, change what you need and finish a new LEIA. The old one stays in the library until you delete it.

**Why is every LEIA version 1.0.0?** The design screen always creates version 1.0.0. Version numbers are meant for programmatic use.

**Why does the assistant answer in another language?** It follows the language you write in. Write the brief in the language you want the components in.

**Can I attach a Word file to the assistant?** Only PDF files, up to 10 MB.

**Where are the AI images generated?** With a Gemini key, from the **View** dialog of the library. Avatars and infographics are optional and the LEIA works without them.

## Running a class

**One code for the whole class or one per student?** One code per replication. Every student enters the same code with a different email address. The email is only an identifier, it is never verified and never contacted.

**A student entered the wrong email and cannot resume.** The session is tied to the email. The student must use the same address again. If the replication is not repeatable and the session was finished, nothing can be done from the Workbench except creating a new replication.

**The timer ended but the student kept working.** The time limit is enforced by the student's browser, not by the server. A student who disables the timer or reloads at the right moment can continue. Treat the limit as guidance, and check the **Started** and **Finished** times in the results.

**The timer ended while the student was in the solution editor.** The session is closed without submitting the editor content. Tell students to submit before the last minute.

**Can I pause or close a student's session from the Live dashboard?** No. The dashboard is read only. Turning the replication **Active** switch off stops new students from joining but does not interrupt sessions in progress.

**Can students use voice?** Yes, with the **Audio mode** of the LEIA in the replication. Voice uses the platform's own keys, not yours, and it is not available in MultiLEIA activities. See [LEIA settings in a replication](workbench/leia-settings.md).

**Does the supervisor work with Gemini or Ollama?** No. It needs an OpenAI key of its own. Without one it is skipped silently.

**Do widgets work with every model?** No. Only OpenAI models can call the tools of the code editor.

**What does a MultiLEIA session look like for the student?** One chat where several characters answer in turn. The orchestrator decides who speaks, up to the limit you set. Text only.

**Can students see the reference solution?** Only after they finish and submit, when the solution editor turns into a comparison between the reference solution and theirs. Students who never submit never see it.

## Results

**The automatic score is from 0 to 10 but I can type 0 to 100 in the Conversations page.** The two scales are different. The automatic evaluation returns 0 to 10. The manual score field accepts 0 to 100 and overwrites the automatic one. Pick one scale for your course.

**The CSV has fewer columns than I expected.** The export has one row per message with the session id, the student, the start and end times, the message, who wrote it, the timestamp, the score and the evaluation. The configuration of the replication is not in the file. Production may include additional columns.

**Where are the supervisor flags in the export?** They are not in the CSV. Read them in the Conversations page.

**Why does a conversation say "No conversation is available because the participant did not consent"?** The replication asked for consent, the student declined and **Conversation automated removal** was on. Only the metadata of the session is kept.

**Are test sessions in the results?** No. Sessions started with **Test session** in the Workbench or through the **Demo / test link** are hidden from the Conversations page and from the CSV.

## Known problems of the development version

- **The Live dashboard sends advanced accounts back to the replications list.** Open it through the share link instead. See [Live dashboard and spectating](workbench/live-and-spectate.md).
- **Generate in transcription mode fails** with "Failed to create transcription session". Use **Auto Generate** or **JSON Edit**.
- **New replications start with a model called "default" that no longer exists**, so the first activation fails with "Some Leias have invalid runner configurations". Pick a real model in every LEIA and save.
- **Watch live and Share link do nothing**, the server refuses to create the spectate token.
- **The Configuration view of a session is empty**, "No replication configuration was stored for this conversation".
- **Data Usage settings cannot be saved**, the server answers that the route does not exist.
- **The automatic transcript generator writes in Spanish** regardless of the language of the behaviour.

## Small things you may notice

- A few dialogs and messages of the interface are in Spanish, for example the confirmation when you mark a key as default.
- The **Language** field of a replication has an edit button labelled **Rename**.
- Deleting an activity, removing a LEIA from an activity and publishing an activity happen without a confirmation dialog.
- Some links of the Designer, such as **My LEIAs** in the profile, lead back to the library.
- The student login form does not check that the email address is valid.
