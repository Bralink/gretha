import React from "react"
import { Props, State } from "../../interfaces/GreCaptcha/IGreCaptcha"

  
  class ReCaptcha extends React.PureComponent<Props, State> {
    state: State = {
      isReady: false,
    }
  
    private script: HTMLScriptElement = new HTMLScriptElement();
    private widget: HTMLDivElement = new HTMLDivElement() 
  
    componentDidMount(): void {
      this.loadScript()
    }
  
    componentWillUnmount(): void {
      document.body.removeChild(this.widget);
      document.body.removeChild(this.script)
    }
  
    render(): React.ReactNode {
      return this.props.children({
        isReady: this.state.isReady,
        execute: this.executeCaptcha,
      })
    }
  
    private loadScript = (): void => {}
  
    private onLoad = () => {}
  
    private executeCaptcha = (): any => {}
  }