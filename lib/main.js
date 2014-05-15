const {Cc, Ci, Cu, components} = require("chrome");

var {FileUtils} = Cu.import("resource://gre/modules/FileUtils.jsm");
var {NetUtil} = Cu.import("resource://gre/modules/NetUtil.jsm");

function installCert(baseDirId, certPathComponents, certTrust) {
  var certfile = FileUtils.getFile(baseDirId, certPathComponents);
  var certDB = Cc["@mozilla.org/security/x509certdb;1"]
    .getService(Ci.nsIX509CertDB2);

  NetUtil.asyncFetch(certfile, function(inputStream, status) {
    if (!components.isSuccessCode(status)) {
      var msg = "Error reading file: " +
                "status=" + status + " " +
                "baseDirId=" + baseDirId + " " +
                "certPathComponents=" + certPathComponents;
      throw new Error(msg);
    }

    var cert = NetUtil.readInputStreamToString(inputStream, inputStream.available());
    cert = cert.replace(/[\r\n]/g, "");
    var BEGIN_CERT = "-----BEGIN CERTIFICATE-----";
    var END_CERT = "-----END CERTIFICATE-----";
    var begin = cert.indexOf(BEGIN_CERT);
    var end = cert.indexOf(END_CERT);
    cert = cert.substring(begin + BEGIN_CERT.length, end);
    certDB.addCertFromBase64(cert, certTrust, "");
  });
}

exports.main = function (options, callbacks) {
  var baseDirId = "Home"; // https://developer.mozilla.org/en-US/Add-ons/Code_snippets/File_I_O#Getting_files_in_special_directories
  var certPathComponents = [".lantern", "pt", "flashlight", "cacert.pem"]; // relative to base dir
  var certTrust = "C,c,c";
  installCert(baseDirId, certPathComponents, certTrust);
}
