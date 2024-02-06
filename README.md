# EEI-DSS Front-End

This is the front-end for **EEI-DSS**, created with [Create React App](https://github.com/facebook/create-react-app).

## How to Run the Project

### Locally

Runs the app in the development mode. The page will reload when you make changes.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser, after following these steps:

1. `Clone the project's repository`
2. `cd .\ecp-dashboard\`
3. `npm install`
4. Open the file `Keycloak.js`, which is inside the `\src` folder.
5. Uncomment the configuration which is indicated with `// local configuration` comment and comment out
   the `// ICCS deployment configuration` one.
6. `npm start`

**Alternatively**, after `step 5`, you can run `docker compose up --build` and deploy the dashboard with docker-compose
on your machine.

### Deployment on a VM

You can deploy this dashboard on a VM with docker-compose, following these steps:

1. `Clone the project's repository`
2. `cd .\ecp-dashboard\`
3. `docker compose up --build`

However, this dashboard is integrated with **I-NERGY's Security Framework**, which is based on an open-source identity
and access management solution, namely Keycloak.\
Unauthorized access is prevented when running this dashboard, and you must have a registered client in the project's
Security Framework to be able to run it on your VM.

### Application Security, Access Control Policy and User Credentials
This front-end application is fully integrated with I-NERGY's Security Framework, which is based on Keycloak, an open-source identity and access management solution. 

Thus, upon trying to access the platform without being logged-in, it automatically navigates the users to the common sign-in page (as illustrated below) created for the needs of the project.

#### If you want to acquire user credentials, please contact [contact@i-nergy.eu](mailto:contact@i-nergy.eu)

### EEI DSS main graphical user interface (UI) Documentation
You can find extensive and detailed documentation on the **EEI DSS main graphical user interface (UI)** [**here**](https://gitlab.epu.ntua.gr/i-nergy/ecp_dashboard/-/wikis/EEI-DSS-main-graphical-user-interface-(UI)-Documentation).
