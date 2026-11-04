---
sidebar_position: 0
tags:
  - teachers
  - designer
  - library
keywords:
  - LEIA
  - library
  - search
  - filters
  - labels
  - test LEIA
  - design from this
  - delete LEIA
authors:
  - name: Dangalcan
    url: https://github.com/Dangalcan
    image_url: https://github.com/Dangalcan.png
---

# The LEIA library

:::info Who can do this
Every role can browse, test and design from the library. **Add to activity** and **Quick replication** appear only for the advanced and admin roles. Deleting is reserved to the owner of the LEIA and to administrators.
:::

The library is the home page of the Designer. It lists every LEIA you are allowed to see, which means the public ones plus your own. Each row is a LEIA, and the buttons on the row cover everything you can do with it without opening it.

## Find a LEIA

1. Type a word in **Search by name or description** (1). The list refreshes a moment after you stop typing.
2. To narrow the list, choose a **Label** (2).
3. To see only your own LEIAs, set **Visibility** (3) to **Private**.
4. To include the older versions of a LEIA, set **Version** (4) to **All versions**.

The LEIAs that match appear as rows (7).

![The LEIA library](../../img/teachers/library/01-overview.webp)

| # | Control | What it does |
|---|---|---|
| 1 | **Search by name or description** | Filters the list as you type, on the name of the LEIA and on the description of its problem. The list refreshes a moment after you stop typing. |
| 2 | **Label** | Shows only the LEIAs that carry the chosen label. **All labels** removes the filter. |
| 3 | **Visibility** | **All**, **Private** (your own unpublished LEIAs) or **Public** (published by an administrator). |
| 4 | **Version** | **Latest only** hides older versions of a LEIA that has several. **All versions** shows them all. |
| 5 | **Design tour** | A guided tour of the library and the design screen. It skips the steps your role cannot use. |
| 6 | **New LEIA** | Opens the design screen with an empty workspace. See [Create a LEIA with the AI assistant](create-leia.md). |
| 7 | A LEIA row | The avatar, the name, the version chip, the publication state, the labels, the first lines of the problem description and the email and role of the owner. |

:::tip Finding your own work quickly
Combine **Visibility** set to **Private** with a label of your own. The library of a busy server holds hundreds of public LEIAs.
:::

## What you can do with a row

Move the mouse over a row to reveal its buttons.

### Test a LEIA at once

1. Move the mouse over the row.
2. Press **Test LEIA** (6).

The chat opens with your default key and its model. See [Test a LEIA](test-leia.md).

### Start a new LEIA from this one

1. Move the mouse over the row.
2. Press **Design from this** (4). The design screen opens with the persona, the behaviour and the problem loaded.
3. Change what you want. See [Create a LEIA with the AI assistant](create-leia.md).
4. Press **Review LEIA**, type a new **New LEIA name** and press **Finish LEIA**.

The new LEIA appears in the library and the original stays as it was.

### Add a LEIA to an activity

1. Move the mouse over the row.
2. Press **Add to activity** (8).
3. Choose one of your unpublished activities in **Select an Activity**, or type a new name.
4. Press **Add to Activity**.

The LEIA is listed inside the activity. [Add LEIAs](activities.md#add-leias) explains a current limitation of this dialog.

### Open a LEIA to students with a quick replication

1. Move the mouse over the row.
2. Press **Quick replication** (9).
3. If the dialog **Replicate activity** appears, an activity with that name already exists. Keep the name it proposes or type another one, and press **Replicate**.

The replication opens in the Workbench in a new tab. It starts inactive, so follow [Replication settings](../workbench/replication-settings.md) before you share it.

![Buttons of a LEIA row](../../img/teachers/library/02-row-actions.webp)

| # | Control | What it does |
|---|---|---|
| 1 | Name and version | The name you gave the LEIA and its version. Every LEIA created from the Designer is version 1.0.0. |
| 2 | **Published** or **Unpublished** | Published LEIAs are visible to everyone. Only an administrator can publish. |
| 3 | **+ Label** | Attach existing labels or create a new one. Shown on your own LEIAs. See [Labels](#labels). |
| 4 | **Design from this** | Opens the design screen with this persona, behaviour and problem already loaded, so you can change what you want and save a new LEIA. Nothing is copied until you finish. This is the path of the [quick start](../../tutorials/create-leia/index.md). |
| 5 | **View** | Opens a read-only view of the problem, the persona and the images. See [below](#view-a-leia). |
| 6 | **Test LEIA** | Starts a test conversation immediately with your default key and its model. See [Test a LEIA](test-leia.md). |
| 7 | **Test settings** | Lets you choose the model and the key before testing. Hidden when you have no active key. |
| 8 | **Add to activity** | Adds the LEIA to one of your unpublished activities, or to a new one you name on the spot. See [Activities](activities.md). |
| 9 | **Quick replication** | Creates an activity with this single LEIA, publishes it, creates a replication in the Workbench and opens that replication in a new tab. The activity and the replication get the name of the LEIA. The fastest way from a LEIA to a class. |
| 10 | **Delete** | Removes the LEIA after you type its name. Refused while an activity uses it. |

If a quick replication fails because an activity with that name already exists, a dialog named **Replicate activity** proposes the same name with the suffix `-v2`. Change it if you like and press **Replicate**.

### Test settings

1. Move the mouse over the row.
2. Press **Test settings** (7 in the row buttons above).
3. Choose the **Model** (1).
4. Choose the **API Key** (2).
5. Press **Start** (3).

The chat opens with that model and key.

![Try settings popover](../../img/teachers/library/04-test-settings.webp)

| # | Control | What it does |
|---|---|---|
| 1 | **Model** | The model that will play the LEIA during the test. The icon shows the provider. |
| 2 | **API Key** | The key that pays for the test. Only active keys of the selected model's provider are listed. |
| 3 | **Start** | Opens the chat. |

When the LEIA has a code editor widget the popover adds the note "This activity uses widgets, so its tool functions only run on a tool-capable provider" and lists OpenAI models only.

## View a LEIA

1. Move the mouse over the row.
2. Press **View** (5 in the row buttons above).
3. Switch between the tabs (1) to read the **Problem**, the **Persona** and the **Infographics**.
4. Close the dialog when you finish.

![View LEIA content dialog](../../img/teachers/library/03-view-modal.webp)

| # | Control | What it does |
|---|---|---|
| 1 | Tabs | **Problem** shows the description, the details, the solution, the initial solution, the evaluation prompt and the process. **Persona** shows the character sheet. **Infographics** shows the two generated images. Administrators also see a **Behaviour** tab. |
| 2 | **Regenerate all** | Creates new avatar and infographic images with a Gemini key. The arrow next to it lets you choose which images to regenerate. |
| 3 | Content | Everything is read only. To change something, use **Design from this** and save a new LEIA. |

The two infographics are a summary of the exercise for students and a version with the solution for you. In the Workbench you decide whether students may open the student version during the activity. See [LEIA settings in a replication](../workbench/leia-settings.md).

### Regenerate the images

You need a Gemini key. See [API keys and models](../api-keys.md).

1. Move the mouse over the row and press **View**.
2. To regenerate everything, press the regenerate button (2).
3. To choose the key or a single image, press the arrow next to that button, choose the **Gemini API key** and click the image.

The new images replace the old ones. "Select a Gemini API key before generating images" means that no key is selected.

## Labels

Labels are coloured tags. Press **+ Label** on one of your LEIAs to open the **Manage labels** dialog.

- **Current labels** lists the labels already attached. Each chip has a cross to remove it.
- **Add label** searches the labels you can use and attaches the one you click.
- **Create new label** needs a name, a background colour and a text colour. The preview chip shows the result. **Save label** creates it immediately.
- **Save changes** applies the attachments.

Your labels are private. Administrators can also create **global** labels that everyone can use, and they can rename, merge and delete labels from **Manage labels** in the account menu.

### Attach or remove a label

1. Move the mouse over the row of one of your LEIAs and press **+ Label**.
2. To attach a label, search for it in **Add label** and click it.
3. To remove a label, press the cross of its chip in **Current labels**.
4. Press **Save changes**.

The row shows the new labels.

### Create a label

1. Move the mouse over the row of one of your LEIAs and press **+ Label**.
2. Press **Create new label**.
3. Type the **Name**.
4. Choose the **Background colour** and the **Text colour**. The preview chip shows the result.
5. Press **Save label**.
6. Press **Save changes**.

The label is ready to use on all your LEIAs.

## Delete a LEIA

1. Move the mouse over the row.
2. Press **Delete** (10 in the row buttons above).
3. Type the exact name of the LEIA in the confirmation field (1).
4. Press **Delete LEIA** (2).

The row disappears from the library. If the LEIA belongs to an activity, an error lists those activities instead.

![Delete LEIA dialog](../../img/teachers/library/05-delete-dialog.webp)

| # | Control | What it does |
|---|---|---|
| 1 | Confirmation field | Type the exact name of the LEIA. The dialog repeats it above the field. |
| 2 | **Delete LEIA** | Enabled only when the name matches. The deletion cannot be undone. |
| 3 | **Cancel** | Closes the dialog. **Reset** clears the field. |

A LEIA that belongs to an activity cannot be deleted. The error lists the activities, so remove the LEIA from them first or delete those activities. The persona, behaviour and problem of a deleted LEIA remain in the library of components and can be reused by other LEIAs.
