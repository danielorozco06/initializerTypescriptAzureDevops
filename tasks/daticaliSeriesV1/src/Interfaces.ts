export interface IdataVSTS {
  SOURCE_BRANCH_NAME: string;
  systemDefaultWorkingDirectory: string;
  DATARTC: IdataRTC;
}

export interface IdataRTC {
  app: string;
  projectArea: string;
  wiID: number;
  wiOwner: string;
  wiHU: number;
  prefix: string;
  hotfixLib: string;
  buildLib: string;
  currentStream: string;
  featureStream: string;
  hotfixStream: string;
  downloadPath: string;
  propertiesFiles: string[];
  files: IfileRTC[];
}

export interface IfileRTC {
  pathFile: string;
  iProject: string;
  sourceFile: string;
  fileName: string;
  extension: string;
  localPathFile: string;
  pathFileProperties: string;
  localPathProperties: string;
  contentProperties: string;
  target: string;
}
