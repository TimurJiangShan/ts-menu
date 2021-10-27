# ts-menu

## Overview

1. A button in the home page, click it can show the login form.
2. Click the back, it will back to the previous page.
3. You can register or simply login using the default account.
4. Input the username(default is 'admin'), password(default is 'password'),clicking Login, it can send the form data to a fake endpoint.
5. The website can show error message when the username or password is incorrect.
6. After login, User can type the text in the input with given format(By clicking the submit button).
7. On the left hand side, there is the nested menu, it's content depends on the json array passed.
8. Click the Log out button on the right side of the header, you can log out
9. Test coverage is 100%.

<div align=center><img src="https://github.com/TimurJiangShan/Frontend-Notes/blob/master/test-coverage.png" alt='test-coverage' width='400'/></div>

11. Home Menu

<div align=center><img src="https://github.com/TimurJiangShan/Frontend-Notes/blob/master/home-menu.png" alt='home-menu' width='400'/></div>

11. Register

<div align=center><img src="https://github.com/TimurJiangShan/Frontend-Notes/blob/master/register.png" alt='register' width='400'/></div>

12. Login and back button

<div align=center><img src="https://github.com/TimurJiangShan/Frontend-Notes/blob/master/login.png" alt='login' width='400'/></div>

12. Nested Menu 

<div align=center><img src="https://github.com/TimurJiangShan/Frontend-Notes/blob/master/Menu.png" alt='menu' width='800'/></div>

## Technical stack

1. React v16.8.6
2. TypeScript
3. React testing library
4. MSW for mocking test
5. Emotion.js and Antd for the UI library
6. Prettier and eslint for the code formatter
7. Lint-staged and commitlint to make the commit message clear.

## Instruction

#### 1. Download the project and enter the project

```
git clone https://github.com/TimurJiangShan/ts-menu
cd ts-menu
```

1. Go to the project source code folder dictionary where `package.json` exists.
2. Run the following command to install dependencies:

```
npm run install
```

#### 2. Start the backend server

Using the following command to start the server

```
nodemon server.js
```

The backend runs on the `http://localhost:8000`

#### 3. Start the frontend server

1. Go to the project source code folder dictionary where `package.json` exists as Step1 mentioned.
2. Using following command

```
npm run start
```

The frontend runs on the `localhost:3000`

#### 4. Run test

1. Go to the project source code folder dictionary where `package.json` exists as Step1 mentioned.
2. Using following command

```
npm run test -- --coverage --watchAll=false
```

The frontend runs on the `localhost:3000`

#### NOTE

Make sure the `port` 3000 and 8000 is available.
