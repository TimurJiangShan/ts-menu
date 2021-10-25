# ts-menu

## Overview

1. Register and Login
2. User can type the text in the input with given format(By clicking the submitting button).
3. By clicking menu on the header, you can see the nested menus as you want
4. Input the username(default is 'admin'), password(default is 'password'),clicking Login, it can send the form data to a fake endpoint.
5. The website can show error message when the username or password is incorrect.
6. Click the hi button b on the right side of the header, you can log out
7. Unit test is in the `./src/CustomerMenu/__tests__ `, `./src/HomePage/__tests__ `, `./src/InputText/__tests__ `, `./src/utils/__tests__ ` folder. Test coverage in the above folder is 100%.

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
