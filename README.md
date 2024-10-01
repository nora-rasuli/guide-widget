# Car Guide Widget

A simple Vue.js widget for interactive car problem diagnosis. The widget guides users through a set of questions based on their car issue, records their answers, and provides a solution. The widget also allows admin customization and is easily embeddable on any webpage.

## Live Demo

You can check out the live version of the widget here: [Guide Widget Live Demo](https://guide-widget.vercel.app/)

## Features

- **Problem Description**: Users describe the problem they're facing with their car.
- **Question Flow**: If the problem matches the expected input, users are guided through diagnostic questions.
- **Solution Page**: Displays a solution based on the answers provided.
- **Fallback Message**: If the input does not match, users are directed to contact support.
- **Admin Customization**: Allows customization of the widget's appearance (colors, fonts, and logo).
- **Responsive Design**: Works across various screen sizes and is embeddable on any webpage.

## Project Description

Design and implement a widget for interactive guidance that meets the following requirements. Reasonable assumptions were made for anything not specified.

1. The widget must first ask the user for a description of the problem they are trying to solve.
2. The widget must present questions to the end user and record the answers they provide.
3. The widget must be able to present questions one at a time or more than one at a time, based on what the backend service provides.
4. Answers can be of the following types:
   - **Text enumerated form**: Show text options, and the user picks one.
   - **Image enumerated form**: Show a few images, and the user picks one.
   - **Text box**: Freeform text box to type.
   - **Numerical answer**: Freeform text box that accepts only numbers.
5. All answered questions must be displayed under an "Answered" section.
6. Users must be able to click on an answered question and change their answer.
7. After answering a few questions, the system will provide a solution to the problem.
8. The widget must allow the user to provide feedback on whether the answer was helpful or not.
9. The widget must be embeddable in any web page.
10. The widget should allow an admin to easily change colors, fonts, and font sizes.
11. The widget should feature a small logo on the top right-hand corner, and the admin should be able to easily change the logo.
12. The widget must be responsive and fit different screen dimensions and sizes available on a webpage.
13. The project must be implemented in **Vue.js 3** and **Vuetify**.
14. There is no server-side for this project, so mock all server inputs.

## Tech Stack

- **Vue.js 3**
- **Vuetify**
- **Vuex**
- **Vue Router**

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your machine.

### Steps

## Clone the repository

```
git clone https://github.com/your-username/car-guide-widget.git
cd car-guide-widget
```

## Install dependencies

```
npm install
```

### Run the app

```
npm run serve
```

### Build for production

```
npm run build
```

### Run linting

```
npm run lint
```

## How It Works

1. Enter a problem description.
2. If the description is **“My car is broken.”**, the user is guided through questions.
3. If the description differs, the app redirects to the solution page with the message:
   _"Sorry, we can’t help you with this specific problem. Please contact our experts."_

## Customization

Admins can adjust:

- **Background color**
- **Font size**
- **Font family**
- **Logo**

Access customization via the **setting icon** in the header.

## Project Structure

/src
├── /assets
├── /components
│ ├── FeedbackForm.vue
│ ├── ProblemDescription.vue
├── /data
│ ├── questions.json
├── /pages
│ ├── AdminCustomization.vue
│ ├── QuestionsPage.vue
│ ├── SolutionPage.vue
├── /services
│ ├── api.js
├── /store
│ ├── index.js
├── router.js
├── App.vue
└── main.js
