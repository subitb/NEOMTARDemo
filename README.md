# Deploying Multi-Target Application (MTA) to SCP Cloud Foundry 

## Learning Goal
Getting to know the deployment steps for an MTA project. In this tutorial, you'll learn how to setup CF CLI on your local machine, build an MTAR file and deploy it to your SCP CF account.

## Step 1: Install CF Command Line Interface (CLI)
Make sure you've followed the guide [here](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/4ef907afb1254e8286882a2bdef0edf4.html) to install the CF CLI and logged in to the CF CLI using your SCP CF account credentials as described [here](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/7a37d66c2e7d401db4980db0cd74aa6b.html).

## Step 2: Install the MTA Plugin by SAP for the CF CLI
SAP has developed and published an MTA plugin for Cloud Foundry CLI. This MTA plugin allows you to perform lifecycle operations like deployment and un-deployment on multi-target applications. The MTA plugin can be downloaded from [SAP cloud platform tools page](https://tools.hana.ondemand.com/#cloud) (search for MTA Plugin and pick your platform).

Once you've downloaded the MTA plugin, you need to install the MTA plugin. For this, go to the download directory in your command prompt and run the following command:
```
cf install-plugin cf-cli-mta-plugin-2.0.3-windows-x86_64.exe
```

## Step 3: Install the MTA Archive Builder
The MTA archive builder is a standalone command-line tool that builds a deployment-ready .mtar file from an MTA project using the development descriptor (mta.yaml) file. For details on the MTA archive builder and to download the jar file, please visit [here](https://help.sap.com/viewer/58746c584026430a890170ac4d87d03b/Cloud/en-US/ba7dd5a47b7a4858a652d15f9673c28d.html).

**Note**: You will need Java 8 on your machine in order to execute this tool.

Save the download JAR file (e.g., MTABUILDER110_0-80002501.JAR) in a well-known location.

You now have all the software you need to build and deploy an MTA!

## Step 4: Clone a Sample MTA Project
For this demo, you'll need to clone a sample MTA project from the GitHub repository [here](https://github.com/sarthak0403/CFMTAProject.git) to your local machine. This sample project consists of 3 different types of applications/modules: 
- A NodeJS module called approuter which is used as entry to point to access/call the other modules/microservices.
- A Python module called python-module which is a microservice and
- A Java module called java-module which is a microservice as well.

This project also contains an XSUAA service which is used by the approuter for authentication. The service instance will be automatically deployed to your select CF space using the properties defined in the mta.yaml file.

## Step 5: Build the MTAR File
Before buidling the MTAR file for this project, you need to update the mta.yaml file in your root directory. Open the mta.yaml file and find the following urls:
```
https://i123456trial-trial-dev-java-module.cfapps.eu10.hana.ondemand.com

https://i123456trial-trial-dev-py-module.cfapps.eu10.hana.ondemand.com
```
Next, update the above URLs in the following formats:
```
https://<global-account-name>-<org-name>-<space-name>-java-module.cfapps.<your-region>.hana.ondemand.com

https://<global-account-name>-<org-name>-<space-name>-py-module.cfapps.<your-region>.hana.ondemand.com
```
Now, save the mta.yaml file and you're good to build the MTAR file.

To build the MTAR file, go to the root directory of the MTA project and execute the following command which uses the MTA Archive Builder:
```
java -jar MTABUILDER110_0-80002501.JAR --build-target CF --mtar ./target/cfmta.mtar build
```
**Note**: You need to provide the complete path of your MTA archive builder .jar file in the above command.

You should see output similar to the following:
```
SAP Multitarget Application Archive Builder 1.1.2
Module "approuter": invoking npm
Module "java-module": invoking maven
Module "py-module": zipping directory py-module
Module "java-module": command output
>  [INFO] Scanning for projects...
>  [INFO]
...
...
>  [INFO] ------------------------------------------------------------------------
>  [INFO] BUILD SUCCESS
>  [INFO] ------------------------------------------------------------------------
>  [INFO] Total time: 5.774 s
>  [INFO] Finished at: 2018-04-11T14:50:07+01:00
>  [INFO] Final Memory: 16M/211M
>  [INFO] ------------------------------------------------------------------------
Module "approuter": zipping directory approuter
Generating archive .\target\cfmta.mtar
Done
```
After this, you should be able to see a cfmta.mtar file in the target directory within the root directory of your project.

## Step 6: Deploy the MTAR file to CF
To deploy the generated MTAR file, run the following command from the root directory of your project:
```
cf deploy target\cfmta.mtar
```

Now, go to your SCP CF Cockpit and start exploring the applications. Use the approuter module to access the other modules.
