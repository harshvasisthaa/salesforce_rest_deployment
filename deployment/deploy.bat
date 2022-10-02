@ECHO off
set GIT_REPO_LOCATION="deployment_script/test/location/sfdx-init"
cd ..
cd %GIT_REPO_LOCATION%
git checkout -b %1
git pull origin %1
call deploy.cmd %2 %3 %4 %5 %6
exit
rem %1 is consumer key %2
rem %2 is instance URL %3
rem %3 is username %4
rem %4 is test level %5
rem %5 is test class name %6