# Lantern Flashlight CA root certificate Installer

This add-on adds the flashlight ca cert to the Firefox trusted root store.

## Requirements

See the [Installation docs for the Mozilla Add-on
SDK](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).

## Instructions

1. Get a local instance of flashlight running in masquerade mode:

```
> flashlight -addr localhost:10080 -server getiantem.org -masquerade cdnjs.com -masqueradecacert '-----BEGIN CERTIFICATE-----
  MIIDdTCCAl2gAwIBAgILBAAAAAABFUtaw5QwDQYJKoZIhvcNAQEFBQAwVzELMAkG
  A1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYtc2ExEDAOBgNVBAsTB1Jv
  b3QgQ0ExGzAZBgNVBAMTEkdsb2JhbFNpZ24gUm9vdCBDQTAeFw05ODA5MDExMjAw
  MDBaFw0yODAxMjgxMjAwMDBaMFcxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9i
  YWxTaWduIG52LXNhMRAwDgYDVQQLEwdSb290IENBMRswGQYDVQQDExJHbG9iYWxT
  aWduIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDaDuaZ
  jc6j40+Kfvvxi4Mla+pIH/EqsLmVEQS98GPR4mdmzxzdzxtIK+6NiY6arymAZavp
  xy0Sy6scTHAHoT0KMM0VjU/43dSMUBUc71DuxC73/OlS8pF94G3VNTCOXkNz8kHp
  1Wrjsok6Vjk4bwY8iGlbKk3Fp1S4bInMm/k8yuX9ifUSPJJ4ltbcdG6TRGHRjcdG
  snUOhugZitVtbNV4FpWi6cgKOOvyJBNPc1STE4U6G7weNLWLBYy5d4ux2x8gkasJ
  U26Qzns3dLlwR5EiUWMWea6xrkEmCMgZK9FGqkjWZCrXgzT/LCrBbBlDSgeF59N8
  9iFo7+ryUp9/k5DPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMBAf8E
  BTADAQH/MB0GA1UdDgQWBBRge2YaRQ2XyolQL30EzTSo//z9SzANBgkqhkiG9w0B
  AQUFAAOCAQEA1nPnfE920I2/7LqivjTFKDK1fPxsnCwrvQmeU79rXqoRSLblCKOz
  yj1hTdNGCbM+w6DjY1Ub8rrvrTnhQ7k4o+YviiY776BQVvnGCv04zcQLcFGUl5gE
  38NflNUVyRRBnMRddWQVDf9VMOyGj/8N7yy5Y0b2qvzfvGn9LhJIZJrglfCm7ymP
  AbEVtQwdpf5pLGkkeB6zpxxxYu7KyJesF12KwvhHhm4qxFYxldBniYUr+WymXUad
  DKqC5JlR3XC321Y9YeRq4VzW9v493kHMB65jUr9TU/Qr6cf9tveCX4XSQRjbgbME
  HMUfpIBvFSDJ3gyICh3WZlXi/EjJKSZp4A==
  -----END CERTIFICATE-----
  '
2014/05/13 16:44:00 Issuing cert already found in trust store, not adding
2014/05/13 16:44:00 About to start client (http) proxy at localhost:10080
2014/05/13 16:44:08 Using cdnjs.com:443 to handle request
```

1. Set up Firefox to use flashlight as its http proxy (e.g. localhost:10080)
1. Try loading a page that requires https in Firefox, e.g. https://www.google.com/humans.txt
1. Observe Firefox shows its "This Connection is Untrusted" page
1. Locate flashlight's `cacert.pem` file and copy it into this extension's `data/` directory.
1. Run `cfx xpi` to generate a `flashlight-cert-installer.xpi`
1. In Firefox, go to File > Open File... and open `flashlight-cert-installer.xpi`
1. Accept the prompt to install the extension
1. Go into Firefox Preferences > Advanced > Certificates > View Certificates > Authorities and you should now see an entry for "Lantern"
1. Reload the https page from before and it should now load without any certificate errors

## License

Apache v2

## Credits

Thanks to @moba for releasing the code in https://github.com/moba/cacert-firefox-addon which this is based on.
