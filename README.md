# \#CapitalOne MindSummo Challenge
## This is a node.js app I made for the #CapitalOne MindSummo Challenge. Here is what it does;
* Get the 20 most recent posts from Instagram with #CapitalOne
* For each of those posts, get information about the poster including their following ratio and how many posts they have.
* Use AlchemyAPI to get the sentiment of each post's caption
* On the linked page at the top plot sentiment over time using D3.js

##Here are the instructions for running this application
First of all, clone the repository
```
  git clone https://github.com/faizanv/CapitalOneInstagram.git
```
Now make sure you have Node.js and npm installed then run the following
```
  cd CapitalOneInstagram
  npm install
```

Now before you can run the app you have to get your keys for Instagram API and Alchemy API
Here are the respective links below
* https://instagram.com/developer/authentication/ (Follow the instructions for Client-Side Authentication)
* http://www.alchemyapi.com/api/register.html

Now to use the keys you have to create a file 'config.js' in the main directory and fill in the appropriate keys as follows
```
  module.exports = {
    "token" : "Insert Instagram Token Here",
    "alchemyKey" : "Insert AlchemyAPI Key Here"
  }
```

After all this you should be ready to run the application so run `npm start` and navigate to http://localhost:3000
