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
  getExtension: function (mimetype) {
    if (mimetype === "text/html") return "html";
    if (mimetype === "text/css") return "css";
    if (mimetype === "text/xml") return "xml";
    if (mimetype === "image/gif") return "gif";
    if (mimetype === "image/jpeg") return "jpeg";
    if (mimetype === "application/x-javascript") return "js";
    if (mimetype === "application/atom+xml") return "atom";
    if (mimetype === "application/rss+xml") return "rss";
    if (mimetype === "text/mathml") return "mml";
    if (mimetype === "text/plain") return "txt";
    if (mimetype === "text/vnd.sun.j2me.app-descriptor") return "jad";
    if (mimetype === "text/vnd.wap.wml") return "wml";
    if (mimetype === "text/x-component") return "htc";
    if (mimetype === "image/png") return "png";
    if (mimetype === "image/tiff") return "tiff";
    if (mimetype === "image/vnd.wap.wbmp") return "wbmp";
    if (mimetype === "image/x-icon") return "ico";
    if (mimetype === "image/x-jng") return "jng";
    if (mimetype === "image/x-ms-bmp") return "bmp";
    if (mimetype === "image/svg+xml") return "svg";
    if (mimetype === "image/webp") return "webp";
    if (mimetype === "application/java-archive") return "jar";
    if (mimetype === "application/mac-binhex40") return "hqx";
    if (mimetype === "application/msword") return "doc";
    if (mimetype === "application/pdf") return "pdf";
    if (mimetype === "application/postscript") return "eps";
    if (mimetype === "application/rtf") return "rtf";
    if (mimetype === "application/vnd.ms-excel") return "xls";
    if (mimetype === "application/vnd.ms-powerpoint") return "ppt";
    if (mimetype === "application/vnd.wap.wmlc") return "wmlc";
    if (mimetype === "application/vnd.google-earth.kml+xml") return "kml";
    if (mimetype === "application/vnd.google-earth.kmz") return "kmz";
    if (mimetype === "application/x-7z-compressed") return "7z";
    if (mimetype === "application/x-cocoa") return "cco";
    if (mimetype === "application/x-java-archive-diff") return "jardiff";
    if (mimetype === "application/x-java-jnlp-file") return "jnlp";
    if (mimetype === "application/x-makeself") return "run";
    if (mimetype === "application/x-perl") return "pl";
    if (mimetype === "application/x-pilot") return "pdb";
    if (mimetype === "application/x-rar-compressed") return "rar";
    if (mimetype === "application/x-redhat-package-manager") return "rpm";
    if (mimetype === "application/x-sea") return "sea";
    if (mimetype === "application/x-shockwave-flash") return "swf";
    if (mimetype === "application/x-stuffit") return "sit";
    if (mimetype === "application/x-tcl") return "tcl";
    if (mimetype === "application/x-x509-ca-cert") return "crt";
    if (mimetype === "application/x-xpinstall") return "xpi";
    if (mimetype === "application/xhtml+xml") return "xhtml";
    if (mimetype === "application/zip") return "zip";
    if (mimetype === "application/octet-stream") return "bin";
    if (mimetype === "application/octet-stream") return "deb";
    if (mimetype === "application/octet-stream") return "dmg";
    if (mimetype === "application/octet-stream") return "eot";
    if (mimetype === "application/octet-stream") return "img";
    if (mimetype === "application/octet-stream") return "msi";
    if (mimetype === "audio/midi") return "midi";
    if (mimetype === "audio/mpeg") return "mp3";
    if (mimetype === "audio/ogg") return "ogg";
    if (mimetype === "audio/x-realaudio") return "ra";
    if (mimetype === "video/3gpp") return "3gp";
    if (mimetype === "video/mpeg") return "mpeg";
    if (mimetype === "video/quicktime") return "mov";
    if (mimetype === "video/x-flv") return "flv";
    if (mimetype === "video/x-mng") return "mng";
    if (mimetype === "video/x-ms-asf") return "asf";
    if (mimetype === "video/x-ms-wmv") return "wmv";
    if (mimetype === "video/x-msvideo") return "avi";
    if (mimetype === "video/mp4") return "mp4";
    return "unknown";
  },
  init: async function () {
    App.node = await window.Ipfs.create({ repo: String(Math.random() + Date.now()) })
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
    if (hashtext === null) return
    var filebuffer = await App.node.cat(hashtext);
    var stringval = filebuffer.toString();

    let encodedString = stringval.split(',')[1];
    let mimetype = stringval.split(',')[0].split(':')[1].split(';')[0];

    let data = atob(encodedString);
    var ab = new ArrayBuffer(data.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i);
    }
    let blob = new Blob([ia], { "type": mimetype });
    let filename = 'filename.' + App.getExtension(mimetype);
    let file = new File([blob], filename);

    link.href = window.URL.createObjectURL(file);
    link.download = filename;
    link.click();
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
    App.buffer = null;
    let contractx = web3.eth.contract(App.ContractABI).at(App.contractAddress);
    console.log(contractx);
    contractx.add(s, App.account, function (err, result) {
      //console.log("error: ", err);
      //console.log("result: ", result);
      if (err === null) {
        App.node.add(App.buffer2, function (errx, resipfs) {
          if (errx === null) {
            console.log(resipfs[0].hash);
            App.buffer2 = null;
            return App.showInfo('file added :: ' + result + '<br><h7 class="text-danger">Please save this IPFS HASH This will be shown only for one time</h7><br>IPFS HASH :: ' + resipfs[0].hash);
          }
          else {
            return App.showError(errx.message.toString() + errx.stack.toString());
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
    App.buffer1 = null;
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
    if (typeof web3 === "undefined") {
      loader.hide();
      console.error("Error :: install metamask");
      return App.showError("<br><b>Error :: install <a style=\"color: #FFF;\" href=\"https:\\metamask.io\">MetaMask and restart your browser</a></b><br>");
    }
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
