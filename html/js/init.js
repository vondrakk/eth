const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
let accounts;
var onboarding;
var onboardBtn;
var onboardText;
var sendItBtn;
var to_address;
var tokenBalance = undefined;
var gasCost;

const callback_doDrop = async (results) => {
	try {
		var receipt = await web3.eth.getTransactionReceipt(results.transactionHash, (e, r) => {
				if (e) indicateFailure(e);
				if (r) indicateSuccess();
		});
		
	} catch (e) {
		indicateFailure(e);
	}
};
async function doDrop() {
	var faucet = new web3.eth.Contract(appConfig.abiFaucet, appConfig.faucetAddress);
	await faucet.methods.dropIt(to_address).send({"from": to_address}).then(callback_doDrop);
}
const logger = (e, r) => {
	if (e) console.log("error: "+e);
}
const addIfNoTokenBalance = async (e, r) => {
	if (parseInt(e) > 0) {
		sendItBtn.disabled = true;
		console.log(appConfig.tokenSymbol + " Token in Metamask!");
		return;
	}
	tokenBalance = r;
	if (tokenBalance && tokenBalance["c"] && ((tokenBalance["c"][0] > 0) || (tokenBalance["c"].length > 1 && tokenBalance["c"][1] > 0) )) return;

	try {
	  const wasAdded = await ethereum.request({
		method: "wallet_watchAsset",
		params: {
		  type: "ERC20",
		  options: {
			address: appConfig.tokenAddress,
			"symbol": appConfig.tokenSymbol,
			decimals: appConfig.tokenDecimals,
			image: appConfig.tokenImage
		  }
		},
	  });

	  if (wasAdded) {
		console.log(appConfig.tokenSymbol + " Token Added!");
	  } else {
		console.log(appConfig.errorMsg);
	  }
	} catch (error) {
	  console.log(error);
	}
}
const initContract = () => {
  addChain().then( () => {
	addToken();
  });
}
const addChain = async () => {
	try {
	  await ethereum.request({
		method: "wallet_switchEthereumChain",
		params: [{ chainId: appConfig.chainId }],
	  });
	} catch (switchError) {
	  if (switchError.code === 4902) {
		try {
		  await ethereum.request({
			method: "wallet_addEthereumChain",
			params: [
				{ 
					chainId: appConfig.chainId, 
					chainName: appConfig.chainName,
					nativeCurrency: appConfig.nativeCurrency,
					rpcUrls: appConfig.rpcUrls,
					blockExplorerUrls: appConfig.blockExplorerUrls
				}
			],
		  });
		} catch (addError) {
			console.log(appConfig.errorMsg);
		}
	  } else {
		  console.log(appConfig.errorMsg);
	  }
	}
}
const addToken = async (v) => {
	var tokenContract = new web3.eth.Contract(appConfig.abiToken, appConfig.tokenAddress);
	tokenContract.methods.balanceOf(to_address).call().then(addIfNoTokenBalance);
	onboardText.innerText = "Connected to MetaMask";
	onboardBtn.disabled = true;
	onboarding.stopOnboarding();
}
const indicateFailure = (err) => {
	console.log(err);
	alert("TX Failed! "+err.message);
}
const indicateSuccess = () => {
	alert(appConfig.successMsg)
}
const updateButton = () => {
	if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
	  onboardText.innerText = "Install MetaMask";
	  onboardBtn.onclick = () => {
		onboardBtn.innerText = "Onboarding...";
		onboardBtn.disabled = true;
		onboarding.startOnboarding();
	  };
	} else if (accounts && accounts.length > 0) {
	  onboardText.innerText = "Connected";
	  onboardBtn.disabled = true;
	  to_address = accounts[0];
	  $("#toaddress").val(to_address);
	  onboarding.stopOnboarding();
	  sendItBtn.disabled = false;
	} else {
	  onboardText.innerText = "Connect to MetaMask";
	  onboardBtn.onclick = init;
	}
  };
async function init() {
	try {
		window.ethereum.request({
		method: "eth_requestAccounts",
	  }).then(
		function(value) {
			accounts = value;
			updateButton();
			initContract();
		},
		function(error) {console.log(error);}
	);
	} catch (err) {
		console.log(err);
	}	
}

window.addEventListener("DOMContentLoaded", () => {
	onboarding = new MetaMaskOnboarding();
	onboardBtn = document.getElementById("onboardBtn");
	onboardText = document.getElementById("onboardText");
	sendItBtn = document.getElementById("sendit");
	sendItBtn.disabled = true;
	sendItBtn.onclick = doDrop;
	init();
	if (MetaMaskOnboarding.isMetaMaskInstalled()) {
	  window.ethereum.on("accountsChanged", (newAccounts) => {
		accounts = newAccounts;
		onboardBtn.disabled = false;
		sendItBtn.disabled = true;
		updateButton();
	  });
	}
	updateButton();
});