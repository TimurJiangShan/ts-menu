ts-menu
====
Overview
----
1. A nested menu on the left side(Default).
2. User can type the JSON in the input with given format(By clicking the submitting button).
3. By clicking login button, the website will pop a modal with a login form.
4. Input the username(default is 'admin'), password(default is 'password'),clicking Login, it can send the form data to a fake endpoint.
5. Clicking cancel can back to your previous menu.
6. The website can show error message when the username or password is incorrect.
7. Testing is in the ``./src/LoginForm/__tests__ ``folder

Project Folder and demo
----

![Alt text](https://github.com/TimurJiangShan/NodeJS/blob/master/Screen%20Shot%202020-12-07%20at%2012.34.08%20am.png)<br>

<img src="https://github.com/TimurJiangShan/NodeJS/blob/master/first-app/Overview.png" width="500" alt="Pics" /><br>

<img src="https://github.com/TimurJiangShan/NodeJS/blob/master/first-app/NextedMenu.png" width="300" alt="Pics" /><br>

Instruction
----
#### 1. Download the project and enter the project
```
git clone https://github.com/TimurJiangShan/ts-menu
cd ts-menu
```

1. Go to the project source code folder dictionary where ``package.json`` exists.
2. Run the following command to install dependencies:
```
yarn install
```

#### 2. Start the backend server
Using the following command to start the server
```
nodemon server.js
```
The backend runs on the ``http://localhost:8000``
#### 3. Start the frontend server
1. Go to the project source code folder dictionary where ``package.json`` exists as Step1 mentioned.
2. Using following command 
```
yarn start
```
You will find the frontend running on the ``localhost:3000``

#### NOTE
Make sure the ``port`` 3000 and 8000 is available.