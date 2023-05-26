const email = document.getElementById('inputEmail');
const fullname = document.getElementById('inputName');
const xaddress = document.getElementById('inputAddress');
const city = document.getElementById('inputCity');
const state = document.getElementById('inputState');
const zipcode = document.getElementById('inputZip');
const smallxMA = document.getElementById('inputSMA');
const mediumxMA = document.getElementById('inputMMA');
const largexMA = document.getElementById('inputLMA');
const xlargexMA = document.getElementById('inputXLMA');
const xxlargexMA = document.getElementById('inputXXLMA');
const submitMogulx = document.getElementById('submitMogul');
const country = document.getElementById("inputCountry");
const ORDER_TOTAL = smallxMA + mediumxMA + largexMA + xlargexMA + xxlargexMA;





 






const database = firebase.database();
const rootRef = database.ref('customer');
const rootRef2 = database.ref('pricing');





submitMogulx.addEventListener('click', async (e) => {
    firebase.auth().signInAnonymously();
    

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mainnet.infura.io/v3/3ac1c65d7658459ebafe15361c77dbac"))
        var inventory = new web3.eth.Contract(inventoryabi, addressInv);
    
        var smallsizes = await inventory.methods.smallSizes().call({from: accounts[0]});
        var medsizes = await inventory.methods.mediumSizes().call({from: accounts[0]});
        var lsizes = await inventory.methods.largeSizes().call({from: accounts[0]});
        var xlsizes = await inventory.methods.xlargeSizes().call({from: accounts[0]});
        var xxlsizes = await inventory.methods.xxlargeSizes().call({from: accounts[0]});
    
        async function basketcheck() {
    
          console.log(smallxMA.value, mediumxMA.value, largexMA.value, xlargexMA.value, xxlargexMA.value);
          console.log(smallsizes, medsizes, lsizes, xlsizes, xxlsizes);
         if ((parseInt(smallxMA.value) > parseInt(smallsizes) || parseInt(mediumxMA.value) > parseInt(medsizes) || parseInt(largexMA.value) > parseInt(lsizes) || parseInt(xlargexMA.value) > parseInt(xlsizes) || parseInt(xxlargexMA.value) > parseInt(xxlsizes)))
          {
            alert(" You are trying to buy more shirt sizes than currently in stock for the sizes you chose. Please check the below information for what is currently in stock, Thank you!") 
         } else {
          var basketcall = web3.eth.abi.encodeFunctionCall({
            name:'exchangeETH',
            type: 'function',
            inputs: [{
              type: 'uint256',
              name: 'ssizes'
            }, {
              type: 'uint256',
              name: 'msizes'
            }, {
              type: 'uint256',
              name: 'lsizes'
            }, {
              type: 'uint256',
              name: 'xlsizes'
            }, {
              type: 'uint256',
              name: 'xxlsizes'
            }]
            }, [String(smallxMA.value) ,String(mediumxMA.value),String(largexMA.value), String(xlargexMA.value), String(xxlargexMA.value)]);
    
            const w3 = new Web3(new Web3.providers.HttpProvider("https://cloudflare-eth.com"))
            var oracle = new w3.eth.Contract(CHAINLINK_ORACLE_ABI, chainlink);
        var csupply = (parseInt(smallsizes) + parseInt(medsizes) + parseInt(lsizes) + parseInt(xlsizes) + parseInt(xxlsizes));
        var xbought = (parseInt(smallxMA.value) + parseInt(mediumxMA.value) + parseInt(largexMA.value) + parseInt(xlargexMA.value) + parseInt(xxlargexMA.value));
        var xsupply = csupply - xbought;
        var xcart = (xbought / xsupply);
        var ether = 121000000000000000000;
        var xrate = web3.utils.toWei(String(xcart), 'ether');
        var buying = ether + parseInt(xrate);
        var cart = (buying * xbought);
        var Rate = web3.utils.numberToHex(cart);
        var tip = web3.utils.toWei("80", 'gwei');
        var gasup = web3.utils.numberToHex(700000);
        var gasxup = web3.utils.numberToHex(215051);
        var tipup = web3.utils.numberToHex(80000000000);
        oracle.methods.latestAnswer().call({from: accounts[0]}, function(error, res) {
          if (error != null) {
                                console.log(error)
                                return;
        } else {
            var data = res;
            console.log("Latest price was:" ,res)}
            console.log(parseInt(data));
var pricex = (parseInt(data) / 100000000) * 121 ;
var price = parseInt(pricex)  + (parseInt(pricex) * xcart);
                });
        
        console.log(cart);
        console.log(Rate)
    
    
  if (xbought > 0 ) {     
        ethereum.request({
          method: 'eth_sendTransaction',
          params: [{  
                     from: accounts[0],
                     to: addressInv, 
                     tag: 'latest',
                     value: Rate, 
                     chainid: '0x89',
                     maxPriorityFeePerGas: tipup,
                     gas: gasup,
                     data: basketcall }]
        }).catch((err) => { if(err.code === 4001) 
          {
            console.log("Error 4001");
            $('#submitMogul').attr('data-target','#exampleModal');    
            $("#exampleModal").modal('hide');

            $("#errorwebModal").modal('show');
          }
          if(err.code === -32603) 

          {
            $('#submitMogul').attr('data-target','#exampleModal');    
            $("#exampleModal").modal('hide');
            console.log("Error -32603");

            $("#errorwebModal").modal('show');
           }
        
          
           if(err.code === -32000) 
          {
            $('#submitMogul').attr('data-target','#exampleModal');    
            $("#exampleModal").modal('hide');
            console.log("Error -32000");
            $("#errorwebModal").modal('show');
           }
          }
          
        ).then(result => {
           if (result !== undefined) {
            
            firebase.auth().onAuthStateChanged( async firebaseUser => {
                if (firebaseUser) {
                    uid = firebaseUser.uid
                    const accounts = await ethereum.request({ method: 'eth_accounts' });
                   
                    e.preventDefault();
                    rootRef.child( accounts[0] + uid).set({
                    Email: email.value,
                    Name: fullname.value,
                    Address: xaddress.value,
                    City: city.value,
                    State: state.value,
                     ZipCode: zipcode.value,
                    SmallMogulAmount: smallxMA.value,
                    MediumMogulAmount: mediumxMA.value,
                     LargeMogulAmount: largexMA.value,
                     XLargeMogulAmount: xlargexMA.value,
                     XXLargeMogulAmount: xxlargexMA.value,
                     TransactionHash: result,
                     OnchainAddress: accounts[0],
                     PaidAmount: Rate + "ETH"

            
                    })
                    var addhash = result;
                  

                 

                    document.getElementById('subhash').href = "https://polygonscan.com/tx/" + addhash ;
                    document.getElementById('subhash').target = "_blank"
                    console.log(addhash);
                    $("#subwebModal").modal('show');
                      
                    async function sucwin() {
                    var readme = await ethereum.request({
                    method: 'eth_getTransactionReceipt',
                    params: [result]
                                                    })
                    if (readme === null) {
                    sucwin()             }
                    else {
                      if(readme['status'] === '0x1') {
                      
                        $('#submitMogul').attr('data-target','#exampleModal');    
                        $("#exampleModal").modal('hide');
                        $("#subwebModal").modal('hide');

                        document.getElementById('suchash').href = "https://polygonscan.com/tx/" + addhash ;
                        document.getElementById('suchash').target = "_blank"
                        
                        console.log(addhash)

                      $("#successwebModal").modal('show');
                        console.log(readme['logs'])
                      } 
                    
                     }
                    
                                         }
                    
                    
                    sucwin();

                } else {
                  
                  $('#submitMogul').attr('data-target','#exampleModal');    
                  $("#exampleModal").modal('hide');
                  $("#errorwebModal").modal('show');
                  
                    console.log("ERROR UNKNOWN");
                    console.log(addhash);
                }
          

    })
            
            
            } }); }

            else {
              $('#submitMogul').attr('data-target','#exampleModal');    
              $("#exampleModal").modal('hide');
              $("#ZERO_ORDER_MODAL").modal('show');


            }
        
                            }
                  }
    
                  basketcheck();

             
    

            
 
  
        
    
     
    
})








             
           