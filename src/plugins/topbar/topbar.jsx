import React, { PropTypes } from "react"

import "./topbar.less"
import Logo from "./logo_small.png"
import map from "lodash/map"
import get from "lodash/get"

export default class Topbar extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = { url: props.specSelectors.url() }
    this.envs = props.getConfigs().envs
    this.envOptions = map(this.envs, function(value, prop) {
       return { value: prop, label: prop }
    })
    this.projectOptions = map(get(this.envs, this.envOptions[0].value), function(value, prop) {
      return { value: value, label: prop }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ url: nextProps.specSelectors.url() })
  }

  onUrlChange =(e)=> {
    let {target: {value}} = e
    this.setState({url: value})
  }

  downloadUrl = (e) => {
    this.props.specActions.updateUrl(this.state.url)
    this.props.specActions.download(this.state.url)
    e.preventDefault()
  }

  envChange =(e)=> {
    let selectEnv = get(this.envs, e.target.value)
    this.projectOptions = map(selectEnv, function(value, prop) {
      return { value: value, label: prop }
    })
    this.setState({ environment: e.target.value })

    this.setState({ project: this.projectOptions[0].value })
    this.setState({ url: this.projectOptions[0].value })
  }

  projectChange =(e)=> {
    this.setState({ project: e.target.value })
    this.setState({ url: e.target.value })
  }

  render() {
    let { getComponent, specSelectors } = this.props
    const Button = getComponent("Button")
    const Link = getComponent("Link")

    let isLoading = specSelectors.loadingStatus() === "loading"
    let isFailed = specSelectors.loadingStatus() === "failed"

    let inputStyle = {}
    if(isFailed) inputStyle.color = "red"
    if(isLoading) inputStyle.color = "#aaa"
    return (
        <div className="topbar">
          <div className="wrapper">
            <div className="topbar-wrapper">
              <Link href="#" title="Swagger UX">
                <img height="30" width="30" src={ Logo } alt="Swagger UX"/>
                <span>swagger</span>
              </Link>
              <form className="download-url-wrapper" onSubmit={this.downloadUrl}>
                <select className="environment"
                  value={ this.state.environment }
                  onChange={this.envChange} >
                  { this.envOptions.map( (item) => {
                    return <option key={ item.label } value={ item.value }>{ item.label }</option>
                  })}
                </select>
                <select className="project"
                  value={ this.state.project }
                  onChange={ this.projectChange } >
                  { this.projectOptions.map( (item) => {
                    return <option key={ item.label } value={ item.value }>{ item.label }</option>
                  })}
                </select>
                <input className="download-url-input" type="text" onChange={ this.onUrlChange } value={this.state.url} disabled={isLoading} style={inputStyle} />
                <Button className="download-url-button" onClick={ this.downloadUrl }>Explore</Button>
              </form>
            </div>
          </div>
        </div>

    )
  }
}

Topbar.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  getConfigs: PropTypes.any
}
