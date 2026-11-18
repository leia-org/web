---
sidebar_position: 4
tags:
  - tutorial
  - scenario
  - programming
keywords:
  - LEIA
  - programming
  - code editor
  - Python
  - JavaScript
  - tests
  - tutor
  - scenario
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# Scenario, a programming exercise with the code editor

A LEIA with the **Editor** widget becomes a programming tutor. The student writes code in an editor next to the chat, the LEIA reads it, comments on it and runs the tests you defined. The example is the FizzBuzz function in Python with Ada Okafor, a patient tutor who asks guiding questions instead of giving the answer.

## What you need

- An account with the advanced role.
- An **OpenAI** key or a system key. The editor's tools only work with OpenAI models.

## 1. Design the LEIA

### Describe the exercise

1. Press **Design** in the sidebar of the Designer.
2. Type the exercise in the message box and press **Send message**. Mention the language, the function name and what the tutor must and must not do. For example

   > Create a Python programming exercise for first-year students. The persona is Ada Okafor, a patient programming tutor who never gives the full solution but asks guiding questions. The student must implement a function fizzbuzz(n) that returns the string Fizz for multiples of 3, Buzz for multiples of 5, FizzBuzz for multiples of both and the number itself as a string otherwise. The student writes the code in the editor and asks Ada to check it. The solution format is plain text.

3. Wait for the assistant. It writes the three components and usually adds the **Editor** widget by itself, with a set of tests.

### Check the widget

Look at the **Activity setup** panel. If no widget appears, press **Add widget** (1).

1. Check that **Language** (4) is **Python**. The assistant sometimes leaves JavaScript selected.
2. Check that **Function name** (5) is `fizzbuzz`.
3. Read **Problem description** (6), which is what the student sees above the editor.
4. Set **Starter code** (7), the content of the editor when the student arrives. A function signature with `pass` is a good start.

![Editor widget configuration](../img/teachers/widgets/01-editor-widget.webp)

### Check the tests and the tools

1. Review the tests (1). Each one calls the function with the **args** list and compares the result with **expected**. `[3]` and `"Fizz"`, `[5]` and `"Buzz"`, `[15]` and `"FizzBuzz"`, `[7]` and `"7"`.
2. Add edge cases with **Add test** (2).
3. Keep the three tools on (4 to 6).
4. Write when Ada should use them (7). "Run the tests when the student asks you to check the code" prevents the tutor from running them after every message.

![Tests and tools](../img/teachers/widgets/02-tests-tools.webp)

Full reference in [Code editor widget](../teachers/designer/widgets.md).

## 2. Check the problem

1. Click the **Problem** card.
2. Check that **Solution Format** is **Plain Text**, since the student's deliverable is the code itself.
3. Write a reference implementation in **Solution** so the automatic evaluation has something to compare with.
4. Write a signature in **Initial Solution**.
5. Press **Save**.
6. Press **Review LEIA**, type the **New LEIA name**, add a label in **Labels** and press **Finish LEIA**.

## 3. Test it

1. Press **Go to LEIAs** in the success dialog.
2. Move the mouse over the row of your LEIA and press **Test LEIA**. The editor appears on the right.
3. Write a wrong implementation and ask Ada to check it. The test strip updates.
4. Ask for a hint and make sure Ada does not paste the full solution.

See [Test a LEIA](../teachers/designer/test-leia.md).

## 4. Replicate

1. Press **Quick replication** on the row. The replication opens in the Workbench in a new tab.
2. Choose **LEIAs** in the sub-menu of the replication and open your LEIA.
3. Set **Model**, **Ask for student solution**, **Automatic evaluation** and **Audio mode** with the values below, and press **Save**.
4. Choose **General** in the sub-menu and set **Duration**.
5. Turn on **Active**.
6. Copy the **Student link** and give it to your students.

| Setting | Suggested value | Why |
|---|---|---|
| **Model** | an OpenAI model | Required by the widget tools. The list only shows OpenAI models for this LEIA. |
| **Ask for student solution** | on | The code in the editor is sent as the solution. |
| **Automatic evaluation** | on | The grader compares the code with your reference solution. |
| **Audio mode** | **None** or **Luke** | The legacy realtime voice does not support widgets. |
| **Duration** | 20 to 30 minutes | |

See [LEIA settings in a replication](../teachers/workbench/leia-settings.md).

## 5. What students see

![Editor widget as seen by the student](../img/teachers/students/06-widgets.webp)

The editor sits next to the chat. There is no run button. Students ask Ada to check their code, Ada runs the tests and the results appear under the editor. The **Send Solution** button at the top sends the editor content when they are done.

## Tips

- Give three to six tests. Too many tests make the feedback noisy.
- Name the tests by behaviour, "multiple of 3" rather than "test 1". Ada mentions test names when explaining failures.
- Tell the behaviour how much to help. "Never write more than one line of code" is a clear rule.
- Python needs a few seconds to load the first time a student runs the tests. Warn them.
