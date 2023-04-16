# Winter 2023 CSCI 2020U Systems Project Group 8

## Developers:
* #### David Houle-Tymeczko
* #### Sheida Ebrahimi Siaghi 
* #### Siddhant Das
* #### Adam Orfao

## Requirements
* #### Intellij IDEA
* #### GlassFish 7.0.0

## How to run

1. Clone this repository on your device
2. Open the repository using Intellij
3. On the top right menu, click on 'Configurations' and then 'Edit configurations'
4. Click on 'Add configuration' then select Glassfish with a local server
5. Add 'domain1' on the 'Server Domain' box
6. On the Deployment tab click on the plus sign and add 'webboards: war exploded'
7. Click 'OK' and then click on the green arrow to run the server
8. An HTML webpage will be loaded on your browser with the URL: <http://localhost:8080/webboards-1.0-SNAPSHOT/>

## How to use
You will have to sign up by typing in a new username and password.
![signup.png](signup.png)
If your sign up is successful, you will be sent to the home page. On this page, you can create cards by clicking on the 'Add a card' button. You can add a title and multiple messages to each card. You can also delete a message or card if you wish. If a different user joins, they will be able to see the changes to the message board once they log in.
![home.png](home.png)
You can also sign in by clicking on the 'Sign in' link if you've already made an account.
![signin.png](signin.png)

## External Resources
For our project, the primary requirements were `jakarta` for websockets and `org.json` for interpreting JSON documents on the server end. The `pom.xml` file, which can be found in the main directory of the repository, contains a list of all the dependencies used in the project.
