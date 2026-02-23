# KXARCRM

## TBD
- Supabase Setup
- Troubleshooting
- One core workflow explained

## Table of Contents
- [About](#-about)
- [The Team](#-the-team)
- [Installation](#-installation)

## About
Project from KXARCRM for Comp 490/491\
Custom, user friendly Customer Relations Management software\

## The Team
- Kousha Salimkhan (@ksalimkhan)
- Xavier Ramos (@Ekks-One)
- Alex (@alexmaxgamedev)
- Russell de Vries (@Bashiho)

## Installation
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
# Install nextjs for many of our components
npm install next

#Install supabase client packages
npm install @supabase/supabase-js

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
# Note that this is for development purposes, and as such will show some things that you mgiht not want end users to see, such as error messages. If you would like to avoid these messages, please use
npm run

# The URL for your website will be output in the terminal. Opening this URL in your browser will take you to the home page of the site.
```

