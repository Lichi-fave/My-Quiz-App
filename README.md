
# Quiz App – A Basic Interactive Multi-Subject Quiz Application

A simple, clean and interactive web-based Quiz Application built using HTML, CSS, and JavaScript.
Users can log in with their name, choose a subject, answer timed questions, navigate between them, and see a detailed score report at the end.

## Features

1. Login Screen

The experience begins with a neat and friendly login page where users are required to input their name and select a subject of interest. 
This step personalizes the quiz, and the simple UI ensures that users can navigate quickly without confusion.

2. Quiz Interface
   
Once the quiz begins, the user is presented with a series of questions based on the selected subject. 
Each question includes multiple-choice options and users can move between questions using Previous and Next buttons. 
The interface also includes a visible timer and a progress indicator showing which question you’re on.

3. Timer Functionality
   
The quiz includes a countdown timer to add an element of challenge. 
When the timer reaches zero, the quiz automatically ends and the results are displayed to the user.

4. Results Screen
   
At the end of the quiz, the user is taken to a results page that clearly displays their total score, the number of correct and incorrect answers.
A detailed review of each question shows the question, the user’s selected answer, the correct answer and a color-coded indication of whether the user was correct
This helps users learn immediately and understand their mistakes.

## How the app works behind the scenes

Once the user selects a subject, the relevant questions are loaded dynamically from a predefined data structure in app.js. 
As the user selects answers, they are stored internally, allowing navigation between questions without losing chosen responses.
When the quiz is submitted either by the user or automatically through the timer, the app calculates the score by comparing the user’s answers with the correct options.
