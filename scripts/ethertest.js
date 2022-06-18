const { ethers } = require("hardhat");
(async () => {
  //   let NFT = await ethers.getContractFactory("Marketplace");
  //   let nft = await NFT.deploy();
  //   await nft.deployed();
  //   let [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  //   console.log(owner.address);
  //   console.log(await nft.getOwner());
  let Greet = await ethers.getContractFactory("Greeter");
  let greet = await Greet.deploy("fuck");
  await greet.deployed();
  let [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

  const trxn = await greet.fireGreetEvent();
  const rcvx = await trxn.wait();
  const [eventNo, sender] = rcvx.events.find((event) => event.event).args;
  console.log(eventNo.toNumber());
})();

// {
//   hash: '0x7dc6c230669d3965084310cbf32ee91bd248fff5c21a00d9ee51b13913970935',
//   type: 2,
//   accessList: [],
//   blockHash: '0x8b1817759f84b6687f9b6f28f465f3b195132554e1a2854304c009ece04ff502',
//   blockNumber: 3,
//   transactionIndex: 0,
//   confirmations: 1,
//   from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
//   gasPrice: BigNumber { value: "1700145859" },
//   maxPriorityFeePerGas: BigNumber { value: "1000000000" },
//   maxFeePerGas: BigNumber { value: "2400291718" },
//   gasLimit: BigNumber { value: "29022424" },
//   to: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
//   value: BigNumber { value: "0" },
//   nonce: 2,
//   data: '0xd85d3d270000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a6e667420746f6b656e3100000000000000000000000000000000000000000000',
//   r: '0xca3d0c932f87d621348bce8832840599d19396368f01140df280d33fd2ddb43e',
//   s: '0x4267083427ad582031d34578ea450c3a391119ad038be846b90a1b9e130bf58b',
//   v: 0,
//   creates: null,
//   chainId: 31337,
//   wait: [Function (anonymous)]
// }

// const tx = await contract.transfer(...args); // 100ms
// const rc = await tx.wait(); // 0ms, as tx is already confirmed
// const event = rc.events.find(event => event.event === 'Transfer');
// const [from, to, value] = event.args;
// console.log(from, to, value);

adf = {
  to: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  contractAddress: null,
  transactionIndex: 0,
  gasUsed: { value: "210816" },
  logsBloom:
    "0x00000000000000000400000010000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000240080000000000000000000000008000000000000000000040000000000000000000000000040020000000000000100800800000004000000000000000014000000000000000000000000000000000000000000000000000000000000000200000000020000000000000000000002800000000000000000000000000000000000000000000042000000200000000000001000000000002008000000000000000060000010000000000000000000000000000000000000000000800000000000000000",
  blockHash:
    "0x5c7aed0ab08fd5f8d8b58cfe3e09ecad79ad05a3841d66829091c971f3a091b0",
  transactionHash:
    "0xbeb1890d6c16fed7bd55cfbf8df6b663b5593ee782e9ad2e7dbac357c3bc5406",
  logs: [
    {
      transactionIndex: 0,
      blockNumber: 4,
      transactionHash:
        "0xbeb1890d6c16fed7bd55cfbf8df6b663b5593ee782e9ad2e7dbac357c3bc5406",
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      topics: [Array],
      data: "0x",
      logIndex: 0,
      blockHash:
        "0x5c7aed0ab08fd5f8d8b58cfe3e09ecad79ad05a3841d66829091c971f3a091b0",
    },
    {
      transactionIndex: 0,
      blockNumber: 4,
      transactionHash:
        "0xbeb1890d6c16fed7bd55cfbf8df6b663b5593ee782e9ad2e7dbac357c3bc5406",
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      topics: [Array],
      data: "0x",
      logIndex: 1,
      blockHash:
        "0x5c7aed0ab08fd5f8d8b58cfe3e09ecad79ad05a3841d66829091c971f3a091b0",
    },
    {
      transactionIndex: 0,
      blockNumber: 4,
      transactionHash:
        "0xbeb1890d6c16fed7bd55cfbf8df6b663b5593ee782e9ad2e7dbac357c3bc5406",
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      topics: [Array],
      data: "0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001bc16d674ec800000000000000000000000000000000000000000000000000000000000000000000",
      logIndex: 2,
      blockHash:
        "0x5c7aed0ab08fd5f8d8b58cfe3e09ecad79ad05a3841d66829091c971f3a091b0",
    },
  ],
  blockNumber: 4,
  confirmations: 1,
  cumulativeGasUsed: { value: "210816" },
  effectiveGasPrice: { value: "1605876757" },
  status: 1,
  type: 2,
  byzantium: true,
  events: [
    {
      transactionIndex: 0,
      blockNumber: 4,
      transactionHash:
        "0xbeb1890d6c16fed7bd55cfbf8df6b663b5593ee782e9ad2e7dbac357c3bc5406",
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      topics: [Array],
      data: "0x",
      logIndex: 0,
      blockHash:
        "0x5c7aed0ab08fd5f8d8b58cfe3e09ecad79ad05a3841d66829091c971f3a091b0",
      removeListener: [Function(anonymous)],
      getBlock: [Function(anonymous)],
      getTransaction: [Function(anonymous)],
      getTransactionReceipt: [Function(anonymous)],
    },
    {
      transactionIndex: 0,
      blockNumber: 4,
      transactionHash:
        "0xbeb1890d6c16fed7bd55cfbf8df6b663b5593ee782e9ad2e7dbac357c3bc5406",
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      topics: [Array],
      data: "0x",
      logIndex: 1,
      blockHash:
        "0x5c7aed0ab08fd5f8d8b58cfe3e09ecad79ad05a3841d66829091c971f3a091b0",
      removeListener: [Function(anonymous)],
      getBlock: [Function(anonymous)],
      getTransaction: [Function(anonymous)],
      getTransactionReceipt: [Function(anonymous)],
    },
    {
      transactionIndex: 0,
      blockNumber: 4,
      transactionHash:
        "0xbeb1890d6c16fed7bd55cfbf8df6b663b5593ee782e9ad2e7dbac357c3bc5406",
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      topics: [Array],
      data: "0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001bc16d674ec800000000000000000000000000000000000000000000000000000000000000000000",
      logIndex: 2,
      blockHash:
        "0x5c7aed0ab08fd5f8d8b58cfe3e09ecad79ad05a3841d66829091c971f3a091b0",
      args: [Array],
      decode: [Function(anonymous)],
      event: "MarketplaceItemCreated",
      eventSignature:
        "MarketplaceItemCreated(uint256,address,uint256,address,address,uint256,bool)",
      removeListener: [Function(anonymous)],
      getBlock: [Function(anonymous)],
      getTransaction: [Function(anonymous)],
      getTransactionReceipt: [Function(anonymous)],
    },
  ],
};

const expectEvent = (receipt, eventName, args) => {
  let event = receipt.events.find((event) => event.event == eventName);
  
};


expectEvent()