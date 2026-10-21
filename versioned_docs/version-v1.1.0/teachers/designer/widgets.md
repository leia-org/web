---
sidebar_position: 3
tags:
  - teachers
  - designer
  - widgets
  - programming
keywords:
  - LEIA
  - widget
  - code editor
  - tests
  - Python
  - JavaScript
  - tools
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Code editor widget

:::info Who can do this
Every role that can edit a problem can add widgets. Widgets only run on OpenAI models, because LEIA uses tool calls to read, edit and test the code.
:::

A widget is an extra panel mounted next to the chat. The platform currently offers one widget, the **Editor**, a code editor shared between the student and the LEIA. The student writes code in it, LEIA can read the code, insert comments or corrections, and run the tests you defined. It turns a LEIA into a programming tutor.

Widgets belong to the **problem**. They are configured in the **Activity setup** panel of the design screen, and the same panel appears at the bottom of the problem editor.

## Add the editor

![Editor widget configuration](../../img/teachers/widgets/01-editor-widget.webp)

| # | Field | What it does |
|---|---|---|
| 1 | **Add widget** | Adds a widget. |
| 2 | **Widget** | The kind of widget. Only **Editor** is offered for now. |
| 3 | **Slot** | Where the panel goes on the student's screen. **Left**, **Right** or **Main (center)**. The chat takes the other half. |
| 4 | **Language** | **JavaScript**, **Python** or **Plain text**. The student cannot change it. Plain text has no tests and no execution. |
| 5 | **Function name** | The function the tests call, for example `fizzbuzz`. Hidden for plain text. |
| 6 | **Problem description** | The statement shown above the editor. For plain text it is called **Statement / instructions**. |
| 7 | **Starter code** | The content preloaded in the editor. For plain text it is called **Starter text**. |
| 8 | **Remove widget** | Deletes the widget. |

**Configure problem & tests** folds and unfolds the fields from **Language** downwards.

## Tests and tools

![Tests and tools of the editor widget](../../img/teachers/widgets/02-tests-tools.webp)

| # | Field | What it does |
|---|---|---|
| 1 | A test | **Test name**, the **args** as a JSON array with the arguments of the call, and the **expected** result as JSON. The example `[[2,7,11,15], 9]` calls the function with a list and a number. |
| 2 | **Add test** | Adds an empty test row. The bin icon next to a test removes it. |
| 3 | **Reset to default** | Restores the example problem, a `twoSum` function with three tests. |
| 4 | **Read code** | Lets LEIA read the current content of the editor. |
| 5 | **Apply edits** | Lets LEIA change the student's code with search and replace operations. LEIA uses it to add comments or fix a line. |
| 6 | **Run tests** | Lets LEIA run the test suite against the student's code and read the results. |
| 7 | **When should LEIA use this tool in this activity?** | Optional guidance per tool. For example "Only run the tests when the student asks you to check the code". |

Each tool has a switch. A tool that is off cannot be used by LEIA at all.

## What the student sees

The student gets the editor in the slot you chose, with the statement and the starter code. There is no **Run** button. The student asks LEIA to check the code and LEIA runs the tests, so the conversation stays in control of the pace. The test strip under the editor reads "not run yet, ask LEIA to check your code" until the first run and then shows how many tests passed and the failures, with the expected and the obtained values.

JavaScript runs in the browser with a five second limit per run, which catches infinite loops. Python runs in the browser too, through Pyodide, so the first run takes a few seconds while it loads.

Because LEIA writes its hints as comments inside the editor, the submitted code may contain lines that LEIA wrote. Keep that in mind when grading.

## Where it works

| Context | Behaviour |
|---|---|
| Designer test chat | The widget panel appears on the right half of the chat screen. |
| Workbench, text mode | Same layout for the student. The **Send Solution** button sends the editor content as the solution. |
| Workbench, Luke voice mode | The widget stays available while the student talks. |
| Workbench, legacy OpenAI Realtime voice | Not supported. |
| MultiLEIA activities | The shared problem's widgets are used by every LEIA of the activity. |

A replication whose LEIA has widgets only lists OpenAI models in the **Runner** block, and the design screen only lets you test it with an OpenAI key.
