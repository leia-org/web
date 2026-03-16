---
sidebar_position: 2
tags:
  - tutorial
  - leia
  - customization
keywords:
  - LEIA
  - create LEIA
  - customize
  - persona
  - tutorial
  - duplicate
authors:
  - name: pabpergas
    url: https://github.com/pabpergas
    image_url: https://github.com/pabpergas.png
  - name: japarejo
    url: https://github.com/japarejo
    image_url: https://github.com/japarejo.png
  - name: pafmon
    url: https://github.com/pafmon
    image_url: https://github.com/pafmon.png
---

# How to Create and Customize Your Own LEIA

Follow this guide to learn how to duplicate an existing LEIA, modify its problem and persona, and finally, create and test your new LEIA.

---

## **Step 1: Duplicate an Existing LEIA**

![Step 1: Duplicate LEIA](../../img/tutorials/create-leia/Step1.PNG)

To begin, we will not create a LEIA from scratch but will instead use an existing one as a template.

* On your main dashboard, locate the LEIA you want to use as a base (in this example, `game-secretWord-Pizza`).
* Click the **duplicate icon** (indicated by arrow 1) to create an editable copy.

---

## **Step 2: Edit the "Problem"**

![Step 2: Edit the Problem](../../img/tutorials/create-leia/Step2.PNG)
⬇️
![Step 2: Problem Details](../../img/tutorials/create-leia/Step3.PNG)

Now, let's define the game's rules and solution.

* On the "Step 2: Edit" screen, go to the **Problem** section and click the **Edit** button (arrow 2).
* An editor will open where you will modify the following fields:
  * **details (3):** Fill in this field to explain what the game is about. For example: "The game consists of guessing a secret word by asking the assistant questions that can only be answered with yes or no."
  * **solution (4):** Define the secret word that the user must guess. For this tutorial, the word is `skull`.
  * **personality (5):** "Extend" the base personality of the "Persona" to give it a specific theme. In this case, `"Pirates Mysterious Dark Punk"` has been added to give the game a mystery and pirate-themed atmosphere.
* When you are finished, click **Save** (6) to apply the changes.

**Problem Configuration Example:**

```json
{
  "spec": {
    "description": "You are going to play with your friend Timmy a \"Secret Word\" game. Your friend can answer only yes or no. Good luck!",
    "details": "The game consists in guessing a secret word by the user, during the game only yes or no questions should be allowed. The AI assistant can't say the secret word explicitly  until the user guesses it.",
    "solution": "the user guesses the secret word 'skull'",
    "solutionFormat": "text",
    "process": [
      "game"
    ],
    "extends": {
      "persona": {
        "spec": {
          "personality": [
            "Pirates Mysterious Dark Punk"
          ]
        }
      }
    }
  },
  "apiVersion": "v1"
}
```

---

## **Step 3: Edit the "Persona"**

![Step 3: Edit the Persona](../../img/tutorials/create-leia/Step4.PNG)
⬇️
![Step 3: Persona Details](../../img/tutorials/create-leia/Step5.PNG)

Next, we will customize the character the user will interact with.

* Back on the "Step 2: Edit" screen, go to the **Persona** section and click its **Edit** button (arrow 7).
* In the persona editor:
  * **description (8):** Describe the character to match the game's theme. For example: "Timmy is a 23-year-old guy cool drawn to skulls and the mysterious allure of pirate legends...".
  * **personality (9):** Add adjectives that define their character. In this case, `"mysterious, passionate, rebellious"` is used.
* To finish editing the character, click **Save** (10).

**Persona Configuration Example:**

```json
{
  "spec": {
    "fullName": "Timmy",
    "description": "Timmy is a 23-year-old soul drawn to skulls and the mysterious allure of pirate legends, while also enjoying parties and spending time with friends. Timmy is passionate and friendly, yet carries an enigmatic vibe.",
    "personality": "mysterious, passionate, rebellious, Pirates Mysterious Dark Punk",
    "subjectPronoum": "he",
    "objectPronoum": "his",
    "possesivePronoum": "his",
    "possesiveAdjective": "his"
  },
  "apiVersion": "v1"
}
```

---

## **Step 4: Name and Save Your LEIA**

![Step 4: Create and Name](../../img/tutorials/create-leia/Step6.PNG)

You are at the final configuration step, where you will assign the final names to all components.

* **LEIA (11):** Assign a general name to your new creation. In the example: `game-secretWord-Skull`.
* **Problem (12):** Give a name to the problem you have configured: `secretWord-skull`.
* **Persona (13):** Assign a name to the character you have created: `Timmy`.
* Review the final preview. If everything is correct, click **Finish** (14) to save your new LEIA.

---

## **Step 5: Test Your Creation!**

![Step 5: LEIA Created](../../img/tutorials/create-leia/Step7.PNG)

Congratulations, your LEIA is now created and ready to use!

* Your new LEIA, `game-secretWord-Skull`, will appear in your list.
* To interact with it, simply click the **Try button** (the white button with <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>, marked with the number 15).
* A chat window will open where "Timmy" will greet you in the pirate and mysterious style you defined, ready to play the game.

![Step 5: Final Chat Result](../../img/tutorials/create-leia/Step8.PNG)

---

## **Final Note on Privacy**

By default, all LEIAs you create will remain **private** to your account. If you wish to share your creation with the community and make it public, you can request it by contacting the team at **[team@leia.ovh](mailto:team@leia.ovh)**.
