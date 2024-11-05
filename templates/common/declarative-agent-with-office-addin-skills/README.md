# Getting Started with Teams App for Office add-in Sample

**By participating in the developer preivew, you are confirming your agreement to the [Microsoft Developer Agreement](https://learn.microsoft.com/en-us/legal/mdsa), please read it carefully.**

## This sample illustrates

- How an Office add-in can support Word, Excel, PowerPoint and Outlook Apps by using the unified JSON manifest.

## Prerequisites to use this sample
- [Node.js](https://nodejs.org) 16/18/20 (Tested on 16.14.0)
- Office connected to a Microsoft 365 subscription. If you don't already have Office, you might qualify for a Microsoft 365 E5 developer subscription through the [Microsoft 365 Developer Program](
https://developer.microsoft.com/en-us/microsoft-365/dev-program);
for details, see the [FAQ](
https://learn.microsoft.com/en-us/office/developer-program/microsoft-365-developer-program-faq#who-qualifies-for-a-microsoft-365-e5-developer-subscription-).
Alternatively, you can [sign up for a 1-month free trial](
https://www.microsoft.com/en-us/microsoft-365/try?rtc=1)
or [purchase a Microsoft 365 plan](
https://www.microsoft.com/en-us/microsoft-365/buy/compare-all-microsoft-365-products).
- [Registry-Key](https://aka.ms/teams-toolkit/office-addin/registry-key) (Please follow the README in the registry folder)
   - Click Registry link and will download a .zip. Need to extract this zip package.

       ![](./images/registry-key-zip.png)

   - Then operate the .bat file according to README.

       ![](./images/registry-key-content.png)

    **Note:** Please refer to the README.md file to run the `office_registry_modifier.bat` file.

    **Note:** After the registry key has enabled, the functionality of original store for add-in will be disabled.

- Environment variables (Please follow these steps)

    First, you need to search "path" in Windows Search bar. Click it and follow step by step.

    ![](./images/enviroment-path.png)

   ![](./images/environment-variable-1.png)

   ![](./images/environment-variable-2.png)

   TEAMSFX_OFFICE_ADDIN

   ![](./images/environment-variable-3.png)

   ![](./images/environment-variable-4.png)
- [Toolkit Package](https://github.com/hermanwenhe/temporary_package_storage/raw/refs/heads/main/ms-teams-vscode-extension-5.8.1.vsix) Click this link will download a zip package, you need to extract this zip, then will see named `toolkit-package-latest.vsix`. Congratulations, you're ready for the next step!

## Install Toolkit package in VS-Code
You need to reload your VS-Code after you have completed the following three steps.
![](./images/install-toolkit-pkg.png)
![](./images/reload-vscode.png)

## Get your environment ready
![](./images/get-start-1.png)

Please ensure your enviroment check is ready. As shown in the following picture. 
![](./images/get-start-2.png)

## Create Teams App for Office add-in
![Create Office add-in by using Toolkit](./images/office-addin-create.png)

Example of an add-in project via toolkit.
![](./images/addin-project.png)

## File structure
```
| .eslintrc.json
| .gitignore
| .vscode
|   | extensions.json
|   | launch.json              Launch and debug configurations
|   | settings.json
|   | tasks.json
| appPackage
|   | assets                   Static assets like image/gif
|   | manifest.json            Manifest file
| babel.config.json
| env
|   | .env.dev
| images
| infra
|   | azure.bicep
|   | azure.parameters.json
| package.json
| README.md                    Get started here
| src                          Add-ins source code
|   | commands                 Add-ins commands code
|   |   | commands.html
|   |   | commands.ts
|   |   | excel.ts
|   |   | outlook.ts
|   |   | powerpoint.ts
|   |   | word.ts
|   | taskpane                 Add-ins taskpane code
|   |   | excel.ts
|   |   | outlook.ts
|   |   | powerpoint.ts
|   |   | taskpane.css
|   |   | taskpane.html
|   |   | taskpane.ts
|   |   | word.ts
| teamsapp.yml                Config file for M365/Teams Toolkit support
| tsconfig.json
| webpack.config.js           Webpack config
```

## Explanation of the contents of the manifest.json
Added new permission "Document.ReadWrite.User" for Word, Excel and PowerPoint in `permissions`, this is for add-in can read and write to the document you are working on.
```
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "MailboxItem.Read.User",
                "type": "Delegated"
            },
            {
                "name": "Document.ReadWrite.User",
                "type": "Delegated"
            }
        ]
    }
},
```
Added "workbook, document and presentation" in `scopes`, these are for Excel, Word and PowerPoint.
```
"requirements": {
                "scopes": [
                    "mail",
                    "workbook",
                    "document",
                    "presentation"
                ]
            },
```


## Edit the manifest

You can find the app manifest in `./appPackage` folder. The folder contains one manifest file:

- `manifest.json`: Manifest file for Teams app running locally or running remotely (After deployed to Azure).

- [WXP devPreview](https://github.com/QuanfuXiao/Teams-app-for-office-addin-schema/blob/main/WXP.md) For the WXP new requirements in manifest schema you can refer to this link.

- [Public manifest schema](https://github.com/QuanfuXiao/Teams-app-for-office-addin-schema/blob/main/manifest-schema-dev-preview.md) For public developer manifest schema you can refer to this link.


## Debug Teams App for Office add-in
You can choose an option that you want to debug in the second step.
![Debug Office add-in in add-in project](./images/office-addin-debug.png)

**Note:** If this happens, input `n`. If it doesn't, skip this.

![](./images/localhost-loopback.png) 

Once the Outlook app is open, select a mailbox item, and then you can use the Outlook add-in. For example, you can select the option to show a taskpane.
![](./images/outlook-addin-open.PNG)

The taskpane should look as shown in the following image.
![](./images/outlook-addin-taskpane.PNG)

Once Excel is open, you can click the button to show your add-in list in flyout.
![add-in show](./images/excel-addin-open.png)

Find your add-in and click it, you will see the taskpane look as shown in the following image.
![add-in show taskpane](./images/excel-addin-taskpane.png)


## Centralized deploy developed json manifest based Word, Excel and PowerPoint add-in to the users within your organization (tenant)
- Login Microsoft admin center with admin account.
- Explore to Settings\Integrated apps\Upload customer app\.
- Make sure choose "Teams app" under "App type", and upload your app package as a .zip file.  Learn more about the [app package](https://learn.microsoft.com/en-au/microsoftteams/platform/concepts/build-and-test/apps-package).  
- Select the user scope and deploy. Make sure the deployed users also enabled the new feature with register key setup.
![](./images/LOB.png)

## Known issues
- PowerPoint Content add-in not show in flyout, it will be fixed in the upcoming update version.

- Now, these features are not support.
![](./images/known-issues-1.png)

- Host will display as "Outlook", but it can support WXP also actually.
![](./images/known-issues-2.png)

- When host App opens, add-in icon will not display correctly.

    ![](./images/known-issues-3.png)


## Additional Resource
- [Configure WXP Add-in within Teams App](https://github.com/OfficeDev/Office-Samples/wiki/Configure-Office-Add%E2%80%90in-capability-within-your-Teams-app) If you want to combine your WXP add-in with Teams app you can refer to this link.
- [Configure Outlook Add-in within Teams App](https://github.com/OfficeDev/TeamsFx/wiki/Configure-Outlook-Add-in-capability-within-your-Teams-app) If you want to combine your Outlook add-in with Teams App you can refer to this link.

## Version History

|Date| Author| Comments|
|---|---|---|
|March 27, 2024| yueli2 | create sample|
|April 17, 2024| yueli2 | update README|

## Feedback

We really appreciate your feedback! If you encounter any issue or error, please report issues to us following the [Supporting Guide](https://github.com/OfficeDev/TeamsFx-Samples/blob/dev/SUPPORT.md). Meanwhile you can make [recording](https://aka.ms/teamsfx-record) of your journey with our product, they really make the product better. Thank you!
