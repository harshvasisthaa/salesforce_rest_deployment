@echo off
rmdir /s /q certificates
mkdir certificates
cd certificates
openssl genrsa -des3 -passout pass:%1 -out server.pass.key 2048
openssl rsa -passin pass:%1 -in server.pass.key -out server.key
del server.pass.key
openssl req -new -key server.key -out server.csr
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt