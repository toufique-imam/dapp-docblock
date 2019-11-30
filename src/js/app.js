App = {
  web3: null,
  web3Provider: null,
  contractAddress: null,
  ContractABI: null,
  account: "0x0",
  name: null,
  buffer: null,
  buffer1: null,
  buffer2: null,
  node: null,
  init: async function () {
    App.node = await window.Ipfs.create()
    return await App.initWeb3();
  },
  initWeb3: async function () {
    return App.initContract();
  },
  initContract: function () {
    App.contractAddress = "0x13F9150A8D9A85Fe733f9C70A550583363693468";
    App.ContractABI = [
      {
        constant: true,
        inputs: [{ internalType: "string", name: "_hash", type: "string" }],
        name: "getadderkey",
        outputs: [{ internalType: "string", name: "name", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { internalType: "string", name: "_pubkey", type: "string" },
          { internalType: "string", name: "name", type: "string" }
        ],
        name: "setaddername",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ internalType: "string", name: "_pubkey", type: "string" }],
        name: "verify_name",
        outputs: [{ internalType: "uint256", name: "ok", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { internalType: "string", name: "_hash", type: "string" },
          { internalType: "string", name: "x", type: "string" }
        ],
        name: "add",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ internalType: "string", name: "_hash", type: "string" }],
        name: "verify_doc",
        outputs: [
          { internalType: "uint256", name: "dateAdded", type: "uint256" }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ internalType: "string", name: "_pubkey", type: "string" }],
        name: "getaddername",
        outputs: [{ internalType: "string", name: "name", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      }
    ];
    return App.render();
  },
  showError: function (error) {
    var errorbox = $("#errorbox");
    var infobox = $("#infobox");

    errorbox.show();
    infobox.hide();
    errorbox.focus();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#error-text").html(error);
  },
  showInfo: function (info) {
    var errorbox = $("#errorbox");
    var infobox = $("#infobox");

    errorbox.hide();
    infobox.show();
    infobox.focus();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#info-text").html(info);
  },
  ipfsfiledownload: async function () {
    var hashtext = document.getElementById("id_ipfshash").value
    var link = document.getElementById("downloadLink");

    console.log(hashtext)
    if (hashtext === null) return
    var filebuffer = await App.node.cat(hashtext);
    var stringval = filebuffer.toString();
    console.log(stringval);
    let encodedString = stringval.split(';base64,').pop();

    let data = atob(encodedString);
    let blob = new Blob([data]);

    // //if you need a literal File object
    let file = new File([blob], "filename");

    link.href = URL.createObjectURL(file);
    link.download = 'filename';
    //newWindow = window.open(stringval, 'neuesDokument');
    // window.fsWeb.writeFile('download.pdf', encodedString, { encoding: 'base64' }, function (err,result) {
    //   console.log(err,result);
    // });
    //console.log(res);
    // window.fsWeb.writeFile('foo/download.pdf','foo',function(err){
    //   console.log(err);
    // })
  },
  captureFile: function () {
    event.preventDefault();
    const file = event.target.files[0];
    $("#labelinput1").html(file.name);
    const reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      var x = reader.result.toString();
      App.buffer = sha256(x);
      App.buffer2 = x;
      console.log("buffer", App.buffer);
    };
  },
  captureFileX: function () {
    event.preventDefault();
    const file = event.target.files[0];
    $("#labelinput2").html(file.name);
    const reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      var x = reader.result.toString();
      App.buffer1 = sha256(x);
      //App.buffer2 = x;
      console.log("buffer", App.buffer1);
    };
  },

  addfile: async function () {
    if (window.ethereum)
      try {
        await window.ethereum.enable();
      } catch (err) {
        console.log("error :: ", err);
        return App.showError(err.message.toString() + err.stack.toString());
      }

    if (App.buffer === null) return;
    var s = String(App.buffer);
    if (typeof web3 === "undefined") {
      console.error("error :x :install metamask");
      return App.showError("error :: install metamask");
    }

    let contractx = web3.eth.contract(App.ContractABI).at(App.contractAddress);
    console.log(contractx);
    contractx.add(s, App.account, function (err, result) {
      //console.log("error: ", err);
      //console.log("result: ", result);
      if (err === null) {
        App.node.add(App.buffer2, function (errx, resipfs) {
          if (errx === null) {
            console.log(resipfs[0].hash);
            return App.showInfo("file added :: " + result + "<br>IPFS HASH :: " + resipfs[0].hash);
          }
          else {
            return App.showError(errx.message.toString() + err.stack.toString());
          }
        });

      } else {
        return App.showError(err.message.toString() + err.stack.toString());
      }
    });
  },
  verifyDocument: async function () {
    if (window.ethereum)
      try {
        await window.ethereum.enable();
      } catch (err) {
        console.log("error :: ", err);
        return App.showError(err.message.toString() + err.stack.toString());
      }

    if (App.buffer1 == null) return;
    var s = String(App.buffer1);
    if (typeof web3 === "undefined") {
      console.error("error :: install metamask");
      return App.showError(err.toString());
    }

    let contractx = web3.eth.contract(App.ContractABI).at(App.contractAddress);
    console.log(contractx);
    contractx.verify_doc(s, function (err, result) {
      //console.log(err, result);
      if (err) {
        console.error(err);
        return App.showError(err.message.toString() + err.stack.toString());
      }
      let isReleased = result.toNumber();
      if (isReleased > 0) {
        console.log("verified");
        contractx.getadderkey(s, function (err, result) {
          if (err === null) {
            let ac = result.toString();
            console.log("by Account address: ", ac);
            contractx.getaddername(ac, function (err, result) {
              if (err === null) {
                console.log("Account Name: ", result.toString());
                let displayDate = new Date(isReleased * 1000).toLocaleString();
                return App.showInfo(
                  "Document Verified By :: <b>" +
                  result.toString() +
                  "</b></br> Date Published :: " +
                  displayDate +
                  "</br> Address :: " +
                  ac
                );
              } else {
                console.error(err);

                return App.showError(
                  err.message.toString() + err.stack.toString()
                );
              }
            });
          } else {
            console.error(err);

            return App.showError(err.message.toString() + err.stack.toString());
          }
        });
      } else {
        console.log("not verified");

        return App.showError("Not Verified By anyone");
      }
    });
  },
  setName: async function () {
    var loader = $("#loader");
    var content = $("#content");
    var get_name = $("#getname");
    if (window.ethereum)
      try {
        await window.ethereum.enable();
      } catch (err) {
        console.log("error :: ", err);

        return App.showError(err.message.toString() + err.stack.toString());
      }

    var s = String(document.getElementById("nameinput").value);
    if (typeof web3 === "undefined") {
      console.error("Install metamask");
      return App.showError("Install metamask");
    }
    if (s === null) {
      console.error("error :: name null");
      return App.showError("Install metamask");
    } else console.log("name", s);
    get_name.hide();
    loader.show();
    content.hide();
    let contractx = web3.eth.contract(App.ContractABI).at(App.contractAddress);
    console.log(contractx);
    contractx.setaddername(App.account, s, function (err, result) {
      //console.log("error: ", err);
      //console.log("result: ", result);
      App.name = s;
      if (err === null) {
        $("#accountName").html("Account Name: " + App.name);
        get_name.hide();
        loader.hide();
        content.show();
      } else {
        console.log(err);

        return App.showError(err.message.toString() + err.stack.toString());
      }
    });
  },
  render: async function () {

    var loader = $("#loader");
    var content = $("#content");
    var get_name = $("#getname");
    var errorbox = $("#errorbox");
    var infobox = $("#infobox");
    var acinfo = $("#accountinfox");

    acinfo.hide();
    errorbox.hide();
    infobox.hide();
    loader.show();
    content.hide();
    get_name.hide();
    if (window.ethereum)
      try {
        await window.ethereum.enable();

      } catch (err) {
        return App.showError("Access to your Ethereum account rejected.");
      }
    // Load account data
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html(account);
        let contractx = web3.eth
          .contract(App.ContractABI)
          .at(App.contractAddress);
        //console.log(contractx);

        contractx.getaddername(App.account.toString(), function (err, result) {
          if (err !== null) {
            console.log(err);
            return App.showError(err.toString());
          } else {
            console.log(result);
            if (result === null || result === "") {
              loader.hide();
              get_name.show();
              content.hide();
              acinfo.hide();
            } else {
              App.name = result.toString();
              $("#accountName").html(App.name);
            }
          }
        });
      } else {
        console.log(err);
        return App.showError(err.toString());
      }
    });

    get_name.hide();
    loader.hide();
    content.show();
    acinfo.show();
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
