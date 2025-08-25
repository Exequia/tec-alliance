# TecAlliance

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0.

This is a technical test with the following instructions: https://teamtailor-production.s3.eu-west-1.amazonaws.com/uploads/dd82d48904d3d7f4ee1643fbc1175322d015f80f/programming-practice-teccom-portal-team.pdf

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Tech Requirements

Programming Practice „Web Portal“
What you can expect
01 Guide
02 What to do
03 Resources
Guide
Please read this document carefully and implement a working solution for the given problem. It is a requisite to use
Angular for the implementation of the frontend tasks. Regarding tools, you can use any IDE you’d like to use and any test
environment. Usage of frameworks, tools and libraries is possible as long as these can be used freely in commercial
environments. This is because we’d like to compile and execute your written codebase. And as we’re a company, we must
be able to do so from a legal point of view.
We would like you to do the work yourself, without any help from other persons.
If you’re finished, please provide us with the results. Make sure that we receive all files, documents, sketches, weblinks
etc. which are needed to understand your work and to compile the code into a working solution. Please describe which
environment would be needed to successfully do so.
Very simple solutions as plain single code files are fine. Same for full projects with make files etc. (i.e. Visual Studio
solutions, Eclipse projects, Amplify files, …).
What to do
Your task is to implement a web portal which lets the user create a personal ToDo list.
Only valid users are allowed to create/modify their own ToDo list, so the portal must ensure a validation based on the email of
the user. If the entered e-mail is not valid, an error message must be shown. However, if the user is valid, the home page should
be shown so the user can interact in there.
The portal user interface should be defined as follows:
▪ A header with a menu which contains two entries:
▪ Home, for managing the user´s personal ToDo list
▪ About, where some information about the tool is shown.
The ToDo list management page must contain at least:
▪ Header with the mentioned menu
▪ ToDo list (1 row per ToDo) with a checkbox and the following features:
▪ Add – General (UI & server)
▪ Description, max 250 characters, mandatory
▪ Remove – Specific for every ToDo item (UI & server)
▪ Before remove, a confirmation message must be shown, so user can cancel the operation in case he clicked the button on mistake.
▪ Modify – Specific for every ToDo item (UI & server)
▪ Description, max 250 characters, mandatory
About page can be a static HTML page with some info about the application/random text. The program should be able to store
an unlimited number of ToDo items.
Below you can find some important resources that will support you in the implementation of the practice.
Here are some examples of screens:
Resources
Fake API for testing and prototyping:
▪ https://jsonplaceholder.typicode.com/
Needed JSON:
▪ https://jsonplaceholder.typicode.com/todos
▪ https://jsonplaceholder.typicode.com/users
Guide:
▪ https://jsonplaceholder.typicode.com/guide/
HTTP methods supported:
