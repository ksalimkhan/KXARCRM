You can easily setup this application on a localhost. The first step is to download the files from github. Once you've done this, extract the files and move into that directory. Then, you can create a virtual environment in this directory. Once you've done this, run the following command to install the necessary packages.
```
npm install
```

Once this is done, run the following command to build the application.
```
npm run build
```
Then, you can use the following commands to run or test the application.
```
# Runs in a development environment 
# Recommended for testing, not recommended for final deployment
npm run dev

# Runs automated tests
npm run test

# Runs application
npm run start
```

When you run the app in a development environment or by starting it, a URL will be printed in the console. This URL can be used to access the application on your network.\
For better accessibility, we recommend deploying the app through [Vercel](https://vercel.com/docs/git/vercel-for-github).
