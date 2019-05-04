This is a Screeps TypeScript Visual Studio Code project.

This project is an extension to the TypeScreeps starter project on github (https://github.com/bonzaiferroni/screeps-typescript-starter). It is meant to allow easy collaboration on screeps code without interfering with the starter git project.

Required softwares:
1) NodeJS. (https://nodejs.org/en/)
2) Visual Studio Code. (https://code.visualstudio.com/)
[It is also recommended to install the 'macros' extension for VS Code to be able to deploy the code to screeps easily]

Getting Started:
0) Install all required softwares.
1) The very first thing you will want to do after cloning the repository is open the root folder of the project and run the Env-setup.bat file. This unzips the file in the setup folder and installs npm in the TypeScreeps folder. You can also get all the required files from the typescript starter project linked at the top of the page.
2) Start VS Code. Click on Open Folder.. and select the root directory of the project.

->3) Make changes if you want and save all the files. To commit these changes simply run the screeps-commit.bat file in the TypeScreeps subfolder. If you are like me and running the bat file manually every time you make a slight change then look at the other option below.

OR

->3) Inside VSCode, click on the extensions tab on the left bar, search for 'macros' and install the extension.
4) With the macros installed, we can now add a keyboard shortcut to run a task that will automate the commit process. To do this, goto to File>Preferences>Keyboard Shortcuts. Search for macros.saveAndCommit and assign whatever combination of keys you would like. (I prefer Ctrl+Alt+S)
5) Now you can use your keyboard shortcut to save all files and commit all the changes to the screeps game directory.


Have fun screeps!
