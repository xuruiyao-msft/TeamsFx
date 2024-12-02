# yaml-language-server: $schema=https://aka.ms/teams-toolkit/v1.7/yaml.schema.json
# Visit https://aka.ms/teamsfx-v5.0-guide for details on this file
# Visit https://aka.ms/teamsfx-actions for details on actions
version: v1.7

environmentFolderPath: ./env

# Triggered when 'teamsapp provision' is executed
provision:
  # Creates a Teams app
  - uses: teamsApp/create
    with:
      # Teams app name
      name: {{appName}}
    # Write the information of created resources into environment file for
    # the specified environment variable(s).
    writeToEnvironmentFile:
      teamsAppId: TEAMS_APP_ID

  # Build Teams app package with latest env value
  - uses: teamsApp/zipAppPackage
    with:
      # Path to manifest template
      manifestPath: ./appPackage/agent/manifest.json
      outputZipPath: ./appPackage/agent/build/appPackage.${{TEAMSFX_ENV}}.zip
      outputFolder: ./appPackage/agent/build
  # Validate app package using validation rules
  - uses: teamsApp/validateAppPackage
    with:
      # Relative path to this file. This is the path for built zip file.
      appPackagePath: ./appPackage/agent/build/appPackage.${{TEAMSFX_ENV}}.zip
  # Apply the Teams app manifest to an existing Teams app in
  # Teams Developer Portal.
  # Will use the app id in manifest file to determine which Teams app to update.
  - uses: teamsApp/update
    with:
      # Relative path to this file. This is the path for built zip file.
      appPackagePath: ./appPackage/agent/build/appPackage.${{TEAMSFX_ENV}}.zip
  # Extend your Teams app to Outlook and the Microsoft 365 app
  - uses: teamsApp/extendToM365
    with:
      # Relative path to the build app package.
      appPackagePath: ./appPackage/agent/build/appPackage.${{TEAMSFX_ENV}}.zip
    # Write the information of created resources into environment file for
    # the specified environment variable(s).
    writeToEnvironmentFile:
      titleId: M365_TITLE_ID
      appId: M365_APP_ID

# Triggered when 'teamsapp deploy' is executed
deploy:
  # yarn run dev-server
  # - uses: script
  #   name: start dev-server
  #   with:
  #     run: cd c:\office\src & init.cmd & cd c:\office\src\sdx\officecopilot\packages\word & yarn run dev-server|findstr "compiled successfully"&&r c2r w
  #     workingDirectory: c:\office\src\sdx\officecopilot\packages\word
  #     shell: C:\Windows\System32\cmd.exe
  - uses: script
    name: launch Word
    with:
      run: r c2r w
      workingDirectory: c:\office\src\
      shell: C:\Windows\System32\cmd.exe
projectId: ce559f07-509d-4f3e-a2a5-1d28037d231e
