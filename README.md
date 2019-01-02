# Creating Multi-Target Application (MTA) Archive Builder Targetting to SCP NEO 

## Learning Goal
Getting to know the deployment steps for an MTA project. 


## Step 1: Install the MTA Archive Builder
The MTA archive builder is a standalone command-line tool that builds a deployment-ready .mtar file from an MTA project using the development descriptor (mta.yaml) file. For details on the MTA archive builder and to download the jar file, please visit [here](https://help.sap.com/viewer/58746c584026430a890170ac4d87d03b/Cloud/en-US/ba7dd5a47b7a4858a652d15f9673c28d.html).

**Note**: You will need Java 8 on your machine in order to execute this tool.

Save the download JAR file (e.g., MTABUILDER110_0-80002501.JAR) in a well-known location.

You now have all the software you need to build and deploy an MTA!

## Step 2: Clone a Sample MTA Project
For this demo, you'll need to clone a sample MTA project from this GitHub repository

## Step 3: Build the MTAR File


To build the MTAR file, go to the root directory of the MTA project and execute the following command which uses the MTA Archive Builder:
```
java -jar MTABUILDER110_0-80002501.JAR --build-target NEO --mtar ./target/neo.mtar build
```
**Note**: You need to provide the complete path of your MTA archive builder .jar file in the above command.

After this, you should be able to see a cfmta.mtar file in the target directory within the root directory of your project.
