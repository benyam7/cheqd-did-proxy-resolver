### Cheqd DID Resolver
This project contains the proxy implementation of `cheqd DID resolver`. It proxies requests to the existing resolver at `resolver.cheqd.net` to get the DID document.


#### Usage example

It's a cloud flare endpoint with mandatory query params-- `network` and `method_spcific_id`.

`network` values are either `mainnet` or `testnet`.

`method_specific_id`: as the name suggests, the specific id of the method used in this case `cheqd`. 😁

Cloud flare endpoint: `https://my-app.cheqd-did-resolver-benyam.workers.dev`

#### DID resolver for testnet usage example
```
https://my-app.cheqd-did-resolver-benyam.workers.dev/?network=testnet&method_specific_id=MTMxDQKMTMxDQKMT
```


#### DID resolver for mainnet usage example

```
https://my-app.cheqd-did-resolver-benyam.workers.dev/?network=mainnet&method_specific_id=zF7rhDBfUt9d1gJPjx7s1JXfUY7oVWkY
```

#### I also added a bit of error handling
- if we make the request without required params like the one below:
```
https://my-app.cheqd-did-resolver-benyam.workers.dev/
```
the expected response is :
```
{ "errorMessage": "query params 'network' and 'method_specific_id' are required." }
```

- if didn't pass a value for required params, like the one below:
```
https://my-app.cheqd-did-resolver-benyam.workers.dev/?network=mainnet&method_specific_id=
```

the expected response is:
```
{ errorMessage: "query param 'method_specific_id' cannot be empty. Please, put correct id" }
```


### Questions and Answers
1. What TWO things would you do to improve your submission, if you had more
   time? (200 words max.)This can relate to anything at all: the code, the architecture, the
   documentation. There are no right or wrong answers here.
    1. I would do a review and refactor of my code, regarding the code organization. In my case
       I have put everything inside the `index.js` file. I didn't organize the code in a way that's easier to read and maintain in the future as the code base grows. 
       
        Also, spent some time on error handling, for example: if the `network` param is there but not either `mainnet`
   or `testnet`, I will let the user know. I am it's fine for someone who's already in the crypto space but for new
   people, it might be confusing.

        Plus, regarding code collaboration I might have a separate branch for the `feature` like `feat/cheqd-did-resolver` to
   implement then create a PR to `main` and have someone review it.

    2. I would switch to typescript.😅 I mean, I could have chosen it the first time
       when setting up my project. But, I thought it is a pretty small project and went with javascript.😅

2. How would you modify or repackage your Cloudflare Worker to run on a
   traditional virtual machine or other serverless platforms? (100 words max.)
- This question is a bit unclear for me but, the first I would do is read their docs, and act accordingly. I might also look for other things like how the worker is going to scale because cloud flare handles scaling up and down automatically. 

