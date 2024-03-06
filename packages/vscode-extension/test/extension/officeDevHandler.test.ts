import { FxError, ManifestUtil, Result, ok } from "@microsoft/teamsfx-api";
import { manifestUtils } from "@microsoft/teamsfx-core";
import * as globalState from "@microsoft/teamsfx-core/build/common/globalState";
import * as projectSettingsHelper from "@microsoft/teamsfx-core/build/common/projectSettingsHelper";
import * as chai from "chai";
import * as mockfs from "mock-fs";
import * as sinon from "sinon";
import * as vscode from "vscode";
import * as extension from "../../src/extension";
import * as globalVariables from "../../src/globalVariables";
import * as handlers from "../../src/handlers";
import * as officeDevHandlers from "../../src/officeDevHandlers";
import { VsCodeUI } from "../../src/qm/vsc_ui";
import { ExtTelemetry } from "../../src/telemetry/extTelemetry";
import * as localizeUtils from "../../src/utils/localizeUtils";

describe("officeDevHandler", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  async function testOpenUrlHandler(
    openLinkFunc: (args?: any[]) => Promise<Result<boolean, FxError>>,
    urlPath: string
  ) {
    sinon.stub(extension, "VS_CODE_UI").value(new VsCodeUI(<vscode.ExtensionContext>{}));
    const openUrl = sinon.stub(extension.VS_CODE_UI, "openUrl").resolves(ok(true));
    const res = await openLinkFunc(undefined);
    chai.assert.isTrue(openUrl.calledOnce);
    chai.assert.isTrue(res.isOk());
    chai.assert.equal(openUrl.args[0][0], urlPath);
  }

  it("openOfficePartnerCenterHandler", async () => {
    testOpenUrlHandler(
      officeDevHandlers.openOfficePartnerCenterHandler,
      "https://aka.ms/WXPAddinPublish"
    );
  });

  it("openGetStartedLinkHandler", async () => {
    testOpenUrlHandler(
      officeDevHandlers.openGetStartedLinkHandler,
      "https://learn.microsoft.com/office/dev/add-ins/overview/office-add-ins"
    );
  });

  it("openOfficeDevDeployHandler", async () => {
    testOpenUrlHandler(
      officeDevHandlers.openOfficeDevDeployHandler,
      "https://aka.ms/WXPAddinDeploy"
    );
  });

  it("publishToAppSourceHandler", async () => {
    testOpenUrlHandler(
      officeDevHandlers.publishToAppSourceHandler,
      "https://learn.microsoft.com/partner-center/marketplace/submit-to-appsource-via-partner-center"
    );
  });

  it("openDebugLinkHandler", async () => {
    testOpenUrlHandler(
      officeDevHandlers.openDebugLinkHandler,
      "https://learn.microsoft.com/office/dev/add-ins/testing/debug-add-ins-overview"
    );
  });

  it("openDocumentHandler", async () => {
    testOpenUrlHandler(
      officeDevHandlers.openDocumentHandler,
      "https://learn.microsoft.com/office/dev/add-ins/"
    );
  });

  it("openDevelopmentLinkHandler", async () => {
    testOpenUrlHandler(
      officeDevHandlers.openDevelopmentLinkHandler,
      "https://learn.microsoft.com/office/dev/add-ins/develop/develop-overview"
    );
  });

  it("openLifecycleLinkHandler", async () => {
    testOpenUrlHandler(
      officeDevHandlers.openLifecycleLinkHandler,
      "https://learn.microsoft.com/office/dev/add-ins/overview/core-concepts-office-add-ins"
    );
  });

  it("openHelpFeedbackLinkHandler", async () => {
    testOpenUrlHandler(
      officeDevHandlers.openHelpFeedbackLinkHandler,
      "https://learn.microsoft.com/answers/tags/9/m365"
    );
  });

  it("openReportIssues", async () => {
    testOpenUrlHandler(
      officeDevHandlers.openReportIssues,
      "https://github.com/OfficeDev/office-js/issues"
    );
  });

  it("editOfficeAddInManifest", async () => {
    sandbox.stub(globalVariables, "workspaceUri").value({ fsPath: "/test" });
    sandbox.stub(projectSettingsHelper, "fetchManifestList").returns(["/test/manifest.xml"]);
    const showTextDocumentStub = sandbox.stub(vscode.window, "showTextDocument");

    await officeDevHandlers.editOfficeAddInManifest();

    sandbox.assert.calledOnce(showTextDocumentStub);
  });

  it("popupOfficeAddInDependenciesMessage", async () => {
    const autoInstallDependencyHandlerStub = sandbox.stub(handlers, "autoInstallDependencyHandler");
    sandbox.stub(localizeUtils, "localize").returns("installPopUp");
    sandbox
      .stub(vscode.window, "showInformationMessage")
      .callsFake((_message: string, option: any, ...items: vscode.MessageItem[]) => {
        return Promise.resolve(option);
      });
    await officeDevHandlers.popupOfficeAddInDependenciesMessage();
    chai.assert(autoInstallDependencyHandlerStub.calledOnce);
  });
});

describe("autoOpenOfficeDevProjectHandler", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("opens walk through", async () => {
    sandbox.stub(globalState, "globalStateGet").callsFake(async (key: string) => {
      if (key === "fx-extension.openWalkThrough") {
        return true;
      } else {
        return false;
      }
    });
    const stateUpdate = sandbox.stub(globalState, "globalStateUpdate");

    await officeDevHandlers.autoOpenOfficeDevProjectHandler();

    chai.assert.isTrue(stateUpdate.calledOnce);
  });

  it("opens README", async () => {
    sandbox.stub(globalVariables, "workspaceUri").value(vscode.Uri.file("test"));
    sandbox.stub(globalVariables, "isTeamsFxProject").resolves(false);
    sandbox.stub(globalVariables, "isOfficeAddInProject").resolves(false);
    const showMessageStub = sandbox
      .stub(vscode.window, "showInformationMessage")
      .resolves(undefined);
    sandbox.stub(globalState, "globalStateGet").callsFake(async (key: string) => {
      if (key === "fx-extension.openReadMe") {
        return vscode.Uri.file("test").fsPath;
      } else {
        return "";
      }
    });
    sandbox.stub(manifestUtils, "_readAppManifest").resolves(ok({} as any));
    sandbox.stub(ManifestUtil, "parseCommonProperties").resolves({ isCopilotPlugin: false });
    sandbox.stub(globalState, "globalStateUpdate");
    const sendTelemetryStub = sandbox.stub(ExtTelemetry, "sendTelemetryEvent");

    await officeDevHandlers.autoOpenOfficeDevProjectHandler();

    chai.assert.isTrue(sendTelemetryStub.calledOnce);
  });

  it("opens sample README", async () => {
    sandbox.stub(globalVariables, "workspaceUri").value(vscode.Uri.file("test"));
    sandbox.stub(globalVariables, "isTeamsFxProject").resolves(false);
    sandbox.stub(globalVariables, "isOfficeAddInProject").resolves(false);
    const showMessageStub = sandbox.stub(vscode.window, "showInformationMessage");
    sandbox.stub(vscode.workspace, "workspaceFolders").value([{ uri: vscode.Uri.file("test") }]);
    sandbox.stub(vscode.workspace, "openTextDocument");
    const executeCommandStub = sandbox.stub(vscode.commands, "executeCommand");
    sandbox.stub(globalState, "globalStateGet").callsFake(async (key: string) => {
      if (key === "fx-extension.openSampleReadMe") {
        return true;
      } else {
        return "";
      }
    });
    sandbox.stub(globalState, "globalStateUpdate");
    const sendTelemetryStub = sandbox.stub(ExtTelemetry, "sendTelemetryEvent");

    await officeDevHandlers.autoOpenOfficeDevProjectHandler();

    chai.assert.isTrue(executeCommandStub.calledOnce);
  });
});

describe("validate Office add-in project", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    mockfs.restore();
    sandbox.restore();
  });

  beforeEach(() => {
    mockfs({
      "/test/manifest.xml": "",
    });
  });

  it("isValidOfficeAddInProject", () => {
    const result = projectSettingsHelper.isValidOfficeAddInProject("/test");
    chai.assert.isTrue(result);
  });

  it("fetchManifestList", () => {
    const list = projectSettingsHelper.fetchManifestList("/test");
    chai.assert.equal(list?.length, 1);
    chai.assert.equal(list?.[0], "manifest.xml");
  });
});
