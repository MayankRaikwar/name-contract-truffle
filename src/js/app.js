App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
  	//$('.something').text('ttt');
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
      
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('NameContract.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var NameContractArtifact = data;
      App.contracts.NameContract = TruffleContract(NameContractArtifact);

      // Set the provider for our contract.
      App.contracts.NameContract.setProvider(App.web3Provider);
     //return App.getDefaultName();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#SetName', App.setName);
    $(document).on('click', '#GetName', App.getName);
  },

  setName : function(event) {
  	event.preventDefault();

  	var newName = $('#Name').val();
  	$(document).find('#Name').text(newName);
  	console.log('Setting Name to' + newName);

  	var NameContractInstance;

  	web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

     var account = accounts[0]; 

     App.contracts.NameContract.deployed().then(function(instance){
     	NameContractInstance = instance;
     	return NameContractInstance.setName(newName, {from: account});
     }).then(function(result) {
        alert('Set Name Successful!');
     }).catch(function(err) {
        console.log(err.message);
     });
    });   	
  },


  getName : function(event) {
  	event.preventDefault();

  	console.log('Retrieving Name');
  	var NameContractInstance;

  	web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

     var account = accounts[0]; 

     App.contracts.NameContract.deployed().then(function(instance){
     	NameContractInstance = instance;
     	return NameContractInstance.getName({from: account});
     }).then(function(result) {
        alert(result);
        $('.Current-Name').text(result);
     }).catch(function(err) {
        console.log(err.message);
     });
    });   	
  },

  getDefaultName : function() {
  	 console.log('Getting DefaultName..');

    var NameContractInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.NameContract.deployed().then(function(instance){
     	NameContractInstance = instance;
     	return NameContractInstance.getName({from: account});
     }).then(function(result) {
        alert(result);
        $('#Name').text(result);
     }).catch(function(err) {
        console.log(err.message);
     });
    });   	
  }

	
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});