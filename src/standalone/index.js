import StandaloneLayout from "./layout"
import "../style/main.scss"

// import TopbarPlugin from "plugins/topbar"
import ConfigsPlugin from "plugins/configs"
import TopbarPlugin from "plugins/topbar"

// the Standalone preset

let preset = [
  TopbarPlugin,
  ConfigsPlugin,
  () => {
    return {
      components: { StandaloneLayout }
    }
  }
]

module.exports = preset
