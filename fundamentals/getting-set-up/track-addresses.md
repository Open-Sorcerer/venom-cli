# 🔎 Track Addresses

The `track` function in our CLI tool allows you to conveniently track addresses and transactions on the Venom blockchain. By running this command, you can retrieve valuable information such as transaction details, address balances, and more.

To track addresses and transactions using the CLI tool, follow the steps below:

1. Run the function&#x20;

```
venom-advanced-cli track
```

2. You will be prompted to choose the network on which you want to track. Currently, the supported options are "Devnet" and "Custom RPC". Use the arrow keys to navigate the options and press Enter to make your selection.
   * If you choose "Devnet", the CLI tool will use the Venom Devnet network ([https://gql-devnet.venom.network/graphql](https://gql-devnet.venom.network/graphql)) for tracking.
   * If you choose "Custom RPC", you will be prompted to enter the custom RPC endpoint. Provide the endpoint URL and press Enter.
3. After selecting the network, you will be asked to specify whether you want to track an "Address" or a "Transaction". Use the arrow keys to navigate the options and press Enter to make your selection.
   * If you choose "Address", you will be prompted to enter the address you want to track. Provide the address and press Enter.
   * If you choose "Transaction", you will be prompted to enter the transaction hash you want to track. Provide the transaction hash and press Enter.
4. The information retrieved from the Venom blockchain will be displayed in the terminal.

You can utilize the tracking feature to gain insights into specific addresses or transactions on the Venom blockchain. This functionality proves valuable when monitoring account activity, verifying transaction details, or conducting blockchain analysis.
