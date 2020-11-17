## Summary

This repository is a code challenge issued by [Tandem](https://madeintandem.com/) to apply for one of their Apprenticeship Programs. Trivia Training is is a front-end React app that presents the user 10 multiple choice questions per a round for them to practice. Questions are randomized every round and come from the provided [JSON document](https://github.com/JaysonRice/tandem-trivia-training/blob/main/api/database.json) which are served with json-server.

Deployed on Heroku [here.](https://tandem-trivia-training.herokuapp.com/)

![Trivia round example.](https://github.com/JaysonRice/tandem-trivia-training/blob/main/tandemTrivia.gif)

## Installation

You will need [json-server](https://www.npmjs.com/package/json-server) installed in order to serve the trivia questions.

To start the json server, run the following command in your terminal inside of the api directory:

```bash
json-server -p 8088 -w database.json
```
To start the application, run the following command in your terminal inside of the tandem-trivia-training directory:

```bash
npm start
```
## Application Requirements

### Assumptions
- A round of trivia has 10 Questions
- All questions are multiple-choice questions
- Your score does not need to update in real time
- Results can update on form submit, button click, or any interaction you choose

### Acceptance Criteria
- A user can view questions.
- Questions with their multiple choice options must be displayed one at a time.
- Questions should not repeat in a round.
- A user can select only 1 answer out of the 4 possible answers.
- The correct answer must be revealed after a user has submitted their answer
- A user can see the score they received at the end of the round


