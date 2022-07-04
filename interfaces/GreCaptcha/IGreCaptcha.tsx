interface ReCaptchaInstance {
    ready: (cb: () => any) => void
    execute: (options: ReCaptchaExecuteOptions) => Promise<string>
    render: (id: string, options: ReCaptchaRenderOptions) => any
}

interface ReCaptchaExecuteOptions {
    action: string
}

interface ReCaptchaRenderOptions {
    sitekey: string
    size: 'invisible'
}

export interface Props {
    action: string
    children: (props: CaptchaProps) => React.ReactNode
  }
  
export interface CaptchaProps {
    isReady: boolean
    execute: () => Promise<string>
  }
  
export interface State {
    readonly isReady: boolean
  }