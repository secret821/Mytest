import { SentryInit } from '@spark/monitor-sdk';

if (CFG) {
  SentryInit({
    projectId: CFG.projectId,
    name: CFG.projectName, // 线上正式项目的名称
    sourcemapVersion:CFG.SOURCEVERSION,
    users: [] // 前端开发者的钉钉手机号，字符串类型，可多个, 例如 ['176xxxx', '151xxxx']
  });
}