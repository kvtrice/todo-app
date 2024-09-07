![](/docs/to-do-hero.jpg)

# Full Stack To Do App

[![Backend Tests](https://github.com/kvtrice/todo-app/actions/workflows/backend-tests.yml/badge.svg)](https://github.com/kvtrice/todo-app/actions/workflows/backend-tests.yml)
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/kats-todo-app?name=Vercel+Deployment)

## Table of Contents

-   [View the live site](https://kats-todo-app.vercel.app/)
-   [Overview](#overview)
-   [Installation](#installation-instructions)
-   [Key Features](#key-features)
-   [Tech Stack](#tech-stack)
-   [Next Steps](#next-steps)

## Overview

This project is a fullstack to-do list application that helps you with task management. It provides a user-friendly interface to add, edit, and archive tasks (soft delete), as well update the tasks status ('To do', 'In Progress', 'Done').

## Installation Instructions

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/kvtrice/todo-app.git
    ```

2. Navigate into the backend directory:

    ```bash
    cd todo-app/backend/todo
    ```

3. Setup a PostgreSQL database:

    ```sql
    psql -U postgres
    CREATE DATABASE <DB_NAME>;
    CREATE USER <USERNAME> WITH PASSWORD '<PASSWORD>';
    GRANT ALL PRIVILEGES ON DATABASE <DB_NAME> TO <USERNAME>;
    ```

4. Copy the `.env.example` file and create a `.env` file

    ```bash
    cp .env.example .env
    ```

5. Update the `.env` with your PostgreSQL database details:

    ```bash
    DB_DATASOURCE=jdbc:postgresql://localhost:5432/<DB_NAME>
    DB_USERNAME=<YOUR_POSTGRES_USERNAME>
    DB_PASSWORD=<YOUR_POSTGRES_PASSWORD>
    ```

6. Run the following command to install Java dependencies:

    ```bash
    mvn clean install
    ```

7. Run the backend server

    ```bash
    mvn spring-boot:run
    ```

The backend should now be running on `http://localhost:8080`

### Frontend Setup

1. Navigate to the root directory, if in the backend directory then this will mean going back up to 2 directories:

    ```bash
    # If in backend directory
    cd ../../

    # If navigating to the root directory
    cd todo-app
    ```

2. Copy the `.env.example` file and create a `.env` file

    ```bash
    cp .env.example .env
    ```

3. Update the `.env` with your PostgreSQL database details:

    ```bash
    VITE_APP_API_BASE_URL=http://localhost:8080
    ```

4. Run the following command to install dependencies:

    ```bash
    npm install
    ```

5. Run the frontend server:

    ```bash
    npm run dev
    ```

The frontend should now be running on `http://localhost:5173`

## Key Features

### Add and edit tasks

New tasks can be easily added from any swimlane by clicking the 'Add new card button'. Existing cards can be edited by clicking the pen icon on the relevant card.

### Fast Duplication of Tasks

By clicking the duplicate button on a card, this will quickly duplicate all fields of the card followed by `(copy)`. The card will have the same category, status and description as the original card.

### Archive and Restore tasks

When editing a card, the card is able to be archived, this will hide it from view unless the suer specifically shooses to display archived cards. Any cards that have been archived are also able to be restored through editing an archived card.

### Add and remove categories

Categories are able to be added and removed through the 'Manage Categories' button. Categories that are already associated with a card are unable to be deleted so as to prevent a situation where there are cards that have no category.

### Task Filtering

Tasks are able to be filtered by category through the filter bar drop down, or by archived status through the 'SHow archived' checkbox. These filters can also be used in conjunction with one another, so you can filter by both parameters simultaneously (Eg: Show all cards inclsuing Archived where the Category = Coding)

## Tech Stack

-   **Frontend:** Typescript, React (Vite), SCSS with BEM
-   **Backend:** Java Spring Boot, PostgreSQL

## Next Steps

1. Toast Notifications

    - When changes are made to a card display a toast notification to the user for better feedback if changes were successful or not

2. Drag and Drop functionality

    - Drag and drop is a common design pattern for task-based applications and something users are used to being able to do. This could be implemented using something like the [pangea dnd library](https://github.com/hello-pangea/dnd)

3. Custom Sort Orders
    - Currently tasks are displayed in order of creation (based on their id number), but it would provide better a better user experience if user were able to sort their cards in a custom way, so they can have a meaningful order within each swimlane.
