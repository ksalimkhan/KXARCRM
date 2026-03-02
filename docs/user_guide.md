# User Guide for KXARCRM

## Who is the guide for?
This guide is for new users who want to set up and use our application on their local machines.

## Overview
The main purpose of this project is to serve as a CRM, or Customer Relations Management interface. This means that it aims to help track information from customers and their orders, as well as currently active orders and projects.

## Installation and Setup
This software is designed to work with Supabase, a cloud-based database provider. If you plan to use a different database provider or host your database locally, some adjustments will be required, however we recommend Supabase as it is simple to set up and very easy to use. The following instructions will be assuming that you are using Supabase and already have an account and project setup.

```shell
# Open Command Prompt or Powershell on Windows and Terminal on Mac or Linux

# Check if Git is installed
git --version
# Download it here if it is not installed 
# https://git-scm.com/downloads

# Clone the repository
git clone https://github.com/ksalimkhan/KXARCRM.git

# Navigate to the project's directory
cd crm-frontend

# If you are running this in VSCode, you can create a Virtual Environment (venv), from
# the command pallete
# Press ctrl + shift + p to open the pallete, then select Python: Create Environment
# Select the appropriate version of python and install packages from Requirements.txt

# If you cannot do the above, do the following through a terminal
# Create a Virtual Environment for the project
python -m venv path/to/venv

# Activate the Virtual Environment
# If you are on Linux or Mac
source path/to/venv/bin/activate
# If you are on Windows
~\path\to\venv\djangodev\scripts\activate.bat

## Installing Requirements
# Run
npm install
# This will download all the necessary packages for the app as configured in the package.json file

## Database Setup
# Supabase
# We used Supabase during the development of this project, and consequently recommend it for the smoothest user experience.
# To set up Supabase, go to https://supabase.com/ and start a project.
# Go through the steps, choosing PostgreSQL as your database type.
# Once you have done this, import the database structure using the following file:


## Environment File
# Create a file called ".env" to store environment variables, such as secret keys

# Supabase is the cloud-based database solution that we used for development, and we recommend it for this application if you would like to run it through the cloud Local solutions can also work, though require some adjustments to the setup If using supabase, format your .env file as follows, replacing the items in quotes with the appropriate information, which can be found on your supabase project page

DATABASE_URL = "DBURL"
DB_HOST= "DBHOST"
NEXT_PUBLIC_BASE_URL="http://localhost:3000/"
NEXT_PUBLIC_SUPABASE_URL="SUPABASEPROJECTURL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="SUPABASEANONKEY"


## Running Application
# In your terminal where the application is to be hosted, run
npm run dev
```

## Core Workflow Example
#One of our core workflows is running the tests for the applicaiton
#To run the tests simply type
```shell
npm test
```

## Outputs
The main outputs of this program are in the console where you run it, as well as in the browser where you can access it. The console outputs are primarily the local and network access URLs, which are used to access the app in a browser, and various messages that represent the state of the system. These messages occasionally include errors, but generally show information such as how long it takes for a page to render. The other main output is the rendered website, which can be accessed via one of the aforementioned URLs. This rendered website is where users will interact with the application, creating/signing into their account, then interacting with the main CRM functions.

## Troubleshooting
The most common errors occur from packages not being installed properly.
