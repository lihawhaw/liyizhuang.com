declare class Aegis extends Core {
  static sessionID: string
  sendNow: boolean
  isReportReady: boolean
  reportRequestQueue: {
    options: SendOption
    success?: SendSuccess
    fail?: SendFail
  }[]
  firstScreenInfo: {
    element: Element
    timing: number
    markDoms: MarkDoms
  }
  constructor(config: WebConfig)
  getBean(filter?: string[]): string
  private getCurrentPageUrl
  ready(): void
  request(_options: SendOption, _success?: SendSuccess, _fail?: SendFail): void
  private $request
  speedLogPipeline: import('../../core/src').Pipeline<any, any>
  publishPluginsLogs(): void
  uploadLogs(params?: any, conds?: any): void
}
