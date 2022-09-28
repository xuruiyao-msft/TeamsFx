import Container from "typedi";
import {
  ResourcePlugins,
  ResourcePluginsV2,
} from "../src/plugins/solution/fx-solution/ResourcePluginContainer";
import { Plugin } from "@microsoft/teamsfx-api";
import { ResourcePlugin } from "@microsoft/teamsfx-api/build/v2";
import "../src/plugins/resource/frontend";
import "../src/plugins/resource/identity";
import "../src/plugins/resource/localdebug";
import "../src/plugins/resource/apim";
import "../src/component/resource/aadApp/aadApp";
import { ComponentNames } from "../src/component/constants";
import { AadApp } from "../src/component/resource/aadApp/aadApp";
export class PluginId {
  static readonly Aad = "fx-resource-aad-app-for-teams";
  static readonly FrontendHosting = "fx-resource-frontend-hosting";
  static readonly SimpleAuth = "fx-resource-simple-auth";
  static readonly Bot = "fx-resource-bot";
  static readonly LocalDebug = "fx-resource-local-debug";
  static readonly AzureSQL = "fx-resource-azure-sql";
  static readonly Function = "fx-resource-function";
  static readonly Identity = "fx-resource-identity";
  static readonly Apim = "fx-resource-apim";
}

export const fehostPlugin = Container.get<Plugin>(ResourcePlugins.FrontendPlugin) as Plugin;
export const identityPlugin = Container.get<Plugin>(ResourcePlugins.IdentityPlugin) as Plugin;
export const aadPlugin = Container.get<AadApp>(ComponentNames.AadApp);

export const localdebugPlugin = Container.get<Plugin>(ResourcePlugins.LocalDebugPlugin) as Plugin;
export const appStudioPlugin = Container.get<Plugin>(ComponentNames.AppManifest) as Plugin;
export const apimPlugin = Container.get<Plugin>(ResourcePlugins.ApimPlugin) as Plugin;

export class TestFilePath {
  static readonly armTemplateBaseFolder = "./templates/azure";
  static readonly configFolder = "./.fx/configs";
  static readonly stateFolder = "./.fx/states";

  static readonly mainFileName = "main.bicep";
  static readonly provisionFileName = "provision.bicep";
  static readonly configFileName = "config.bicep";
  static readonly defaultParameterFileName = `azure.parameters.default.json`;

  static readonly provisionFolder = "provision";
  static readonly fehostProvisionFileName = "frontendHostingProvision.bicep";
  static readonly simpleAuthProvisionFileName = "simpleAuthProvision.bicep";
  static readonly aadProvisionFileName = "aadProvision.bicep";
  static readonly identityProvisionFileName = "identityProvision.bicep";
  static readonly botProvisionFileName = "botProvision.bicep";

  static readonly configurationFolder = "teamsFx";
  static readonly fehostConfigFileName = "frontendHostingConfig.bicep";
  static readonly simpleAuthConfigFileName = "simpleAuthConfig.bicep";
  static readonly aadConfigFileName = "aadConfig.bicep";
  static readonly identityConfigFileName = "identityConfig.bicep";
  static readonly botConfigFileName = "botConfig.bicep";

  static readonly autoGeneratedReadme = "README-auto-generated.md";

  static readonly expectedBicepFileFolder = `expectedBicepFiles`;
  static readonly resultParameterFileName = `parameters.result.json`;
}

export class TestFileContent {
  static readonly feHostProvisionModule = "Mocked frontend hosting provision module content";
  static readonly feHostConfigurationModule =
    "Mocked frontend hosting configuration module content";
  static readonly feHostParameterValue = "FrontendHostingParameterValue";
  static readonly feHostReferenceValue = "feHostReferenceValue";

  static readonly simpleAuthProvisionModule = "Mocked simple auth provision module content";
  static readonly simpleAuthConfigurationModule = "Mocked simple auth configuration module content";
  static readonly simpleAuthUpdatedConfigurationModule =
    "Mocked updated simple auth configuration module content";
  static readonly simpleAuthParameterValue = "simpleAuthParameterValue";
  static readonly simpleAuthReferenceValue = "simpleAuthReferenceValue";
  static readonly simpleAuthReferenceValue2 = "simpleAuthReferenceValue2";

  static readonly aadProvisionModule = "Mocked aad provision module content";
  static readonly aadConfigurationModule = "Mocked aad configuration module content";
  static readonly aadParameterValue = "aadParameterValue";
  static readonly aadReferenceValue = "aadReferenceValue";

  static readonly identityProvisionModule = "Mocked identity provision module content";
  static readonly identityConfigurationModule = "Mocked identity configuration module content";
  static readonly identityParameterValue = "identityParameterValue";
  static readonly identityReferenceValue = "identityReferenceValue";

  static readonly botProvisionModule = "Mocked bot provision module content";
  static readonly botConfigurationModule = "Mocked bot configuration module content";
  static readonly botConfigUpdateModule = "Mocked bot update configuration module content";
  static readonly botParameterValue = "botParameterValue";
  static readonly botReferenceValue = "botReferenceValue";
}

export const fileEncoding = "UTF8";
export const SOLUTION_CONFIG_NAME = "solution";

export class ErrorName {
  static readonly FailedToDeployArmTemplatesToAzureError = "FailedToDeployArmTemplatesToAzure";
}
