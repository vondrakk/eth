
# eth faucet
This project contains code to package a single-page html page suitable for ipfs. This could be a landing page or something more interesting like a faucet to give token. It has code to detect and onboard metamask, configure and switch the network, add your token, and finally drip token to a user.

## usage
Once you're ready, `make` will clean, init, build, and dist.

### token
Generating tokens is beyond the scope, but there is a token.sol stub in the sol directory. If unfamiliar with programmatic tools, use https://remix.ethereum.org/ to compile and deploy your token. 

### faucet
Also beyond scope, but the faucet.sol can similarly be compiled and deployed via remix.

### allowance - don't forget to give the faucet an allowance of token to drip to users

## config
Once your token and faucet are compiled and deployed, modify the config/config.json file. You'll need to change pretty much everything in there depending on the chain, token, faucet drip size, etc.

Deploy the token image to ipfs and update the ipfs url in your config.json

## testing
Run `make test` to launch the docker-compose nginx container. You can now test your single-page and/or faucet via `http://localhost:8080`.

## distribution
When you're ready, run `make dist`. That will put everything you need into the `dist` folder. 

Upload the dist folder to ipfs. give it a name you will remember, like `<tokensymbol>-faucet-<network>-url`.

### notes
- If you use the vegas plugin, background images will be copied to the `dist` directory, but you must upload them into a separate ipfs folder and update the js/custom.js, then build again.
