@echo off
set MODULE="node_modules"
set PACKAGE="package-lock.json"
cd shell_exec
rmdir /s /q %MODULE%
del /s /q %PACKAGE%
call npm install
cd ..
cd session_mgmt
rmdir /s /q %MODULE%
del /s /q %PACKAGE%
call npm install
cd ..
cd sqlite_mgmt
rmdir /s /q %MODULE%
del /s /q %PACKAGE%
call npm install
cd ..
cd user_mgmt
rmdir /s /q %MODULE%
del /s /q %PACKAGE%
call npm install
cd ..
cd auth_mgmt
rmdir /s /q %MODULE%
del /s /q %PACKAGE%
call npm install
cd ..
cd deployment_mgmt
rmdir /s /q %MODULE%
del /s /q %PACKAGE%
call npm install
cd ..