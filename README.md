# NFT Marketplace from Alikhan, Maksim, Alinur

# Functionality Demo
![alt text](screens/image.png)
![alt text](screens/image-1.png)
![alt text](screens/image-2.png)
![alt text](screens/image-3.png)
![alt text](screens/image-5.png)
![alt text](screens/image-6.png)


# Activate localhost:
```sh
cd nft-template
npm run dev
```

# Create contract
Run npm install (or yarn install) to get all dependencies.
```sh
npm install
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```
Run npx hardhat node on your own machine and create your local blockchain simulation.
```sh
npx hardhat node
```
Run npx hardhat run scripts/deploy.js --network localhost to deploy the contract to your local node.
```sh
npx hardhat run scripts/deploy.js --network localhost
```
Then change contract address in Context/constats 