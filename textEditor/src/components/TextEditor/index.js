import {Component} from 'react'

import {VscBold} from 'react-icons/vsc'

import {GoItalic} from 'react-icons/go'

import {AiOutlineUnderline} from 'react-icons/ai'

import {TextArea, Button} from './styledComponents'

import './index.css'

class TextEditor extends Component {
  state = {
    textInput: '',
    isBold: false,
    isItalic: false,
    isUnderline: false,
  }

  onChangeInput = event => {
    this.setState({textInput: event.target.value})
  }

  onClickBold = () => {
    this.setState(prevState => ({isBold: !prevState.isBold}))
  }

  onClickItalic = () => {
    this.setState(prevState => ({isItalic: !prevState.isItalic}))
  }

  onClickUnderline = () => {
    this.setState(prevState => ({isUnderline: !prevState.isUnderline}))
  }

  renderEditor = () => {
    const {textInput, isBold, isItalic, isUnderline} = this.state

    const bold = isBold ? 'bold' : 'normal'

    const italic = isItalic ? 'italic' : 'normal'

    const underline = isUnderline ? 'underline' : 'normal'

    const boldColor = isBold ? '#faff00' : '#f1f5f9'

    const italicColor = isItalic ? '#faff00' : '#f1f5f9'

    const underlineColor = isUnderline ? '#faff00' : '#f1f5f9'

    return (
      <div className="editor-bg-container">
        <div className="image-container">
          <h1 className="editor-name">Text Editor</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/text-editor-img.png"
            alt="text editor"
            className="image"
          />
        </div>
        <div className="editor-container">
          <ul className="icon-container">
            <li className="button-item">
              <Button
                type="button"
                aria-label="bold icon"
                color={boldColor}
                onClick={this.onClickBold}
                data-testid="bold"
              >
                <VscBold size={25} />
              </Button>
            </li>

            <li className="button-item">
              <Button
                type="button"
                aria-label="bold icon"
                color={italicColor}
                onClick={this.onClickItalic}
                data-testid="italic"
              >
                <GoItalic size={25} />
              </Button>
            </li>

            <li className="button-item">
              <Button
                type="button"
                aria-label="bold icon"
                color={underlineColor}
                onClick={this.onClickUnderline}
                data-testid="underline"
              >
                <AiOutlineUnderline size={25} />
              </Button>
            </li>
          </ul>
          <div className="input-container">
            <TextArea
              value={textInput}
              onChange={this.onChangeInput}
              bold={bold}
              italic={italic}
              underline={underline}
            >
              text aria
            </TextArea>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return <div className="bg-container">{this.renderEditor()}</div>
  }
}

export default TextEditor
