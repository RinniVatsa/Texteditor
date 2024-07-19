import React, { useState, useRef } from 'react'
import './TextEditor.css'

function TextEditor() {
    const [text, setText] = useState('')
    const [fontFamily, setFontFamily] = useState('Arial')
    const [fontSize, setFontSize] = useState('16')
    const [fontColor, setFontColor] = useState('#000000')
    const [history, setHistory] = useState([])
    const [redoHistory, setRedoHistory] = useState([])

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleFontFamilyChange = (event) => {
        const newFontFamily = event.target.value
        setHistory([...history, { fontFamily, fontSize, fontColor }])
        setFontFamily(newFontFamily)
        setRedoHistory([]) // Clear redo history on new action
    }

    const handleFontSizeChange = (event) => {
        const newFontSize = event.target.value
        setHistory([...history, { fontFamily, fontSize, fontColor }])
        setFontSize(newFontSize)
        setRedoHistory([])
    }

    const handleFontColorChange = (event) => {
        const newFontColor = event.target.value
        setHistory([...history, { fontFamily, fontSize, fontColor }])
        setFontColor(newFontColor)
        setRedoHistory([])
    }

    const handleUndo = () => {
        if (history.length > 0) {
            const lastState = history[history.length - 1]
            setHistory(history.slice(0, -1))
            setRedoHistory([...redoHistory, { fontFamily, fontSize, fontColor }])
            setFontFamily(lastState.fontFamily)
            setFontSize(lastState.fontSize)
            setFontColor(lastState.fontColor)
        }
    }

    const handleRedo = () => {
        if (redoHistory.length > 0) {
            const lastRedoState = redoHistory[redoHistory.length - 1]
            setRedoHistory(redoHistory.slice(0, -1))
            setHistory([...history, { fontFamily, fontSize, fontColor }])
            setFontFamily(lastRedoState.fontFamily)
            setFontSize(lastRedoState.fontSize)
            setFontColor(lastRedoState.fontColor)
        }
    }

    return ( <
        div className = "text-editor" >
        <
        div className = "controls" >
        <
        label > Font Family: < /label>{' '} <
        select value = { fontFamily }
        onChange = { handleFontFamilyChange } >
        <
        option value = "Arial" > Arial < /option>{' '} <
        option value = "Courier New" > Courier New < /option>{' '} <
        option value = "Georgia" > Georgia < /option>{' '} <
        option value = "Times New Roman" > Times New Roman < /option>{' '} <
        option value = "Verdana" > Verdana < /option>{' '} < /
        select > { ' ' } <
        label > Font Size: < /label>{' '} <
        input type = "number"
        value = { fontSize }
        onChange = { handleFontSizeChange }
        />{' '} <
        label > Font Color: < /label>{' '} <
        input type = "color"
        value = { fontColor }
        onChange = { handleFontColorChange }
        />{' '} <
        button onClick = { handleUndo }
        disabled = { history.length === 0 } > { ' ' }
        Undo { ' ' } <
        /button>{' '} <
        button onClick = { handleRedo }
        disabled = { redoHistory.length === 0 } > { ' ' }
        Redo { ' ' } <
        /button>{' '} < /
        div > { ' ' } <
        textarea className = "text-input"
        value = { text }
        onChange = { handleTextChange }
        style = {
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                color: '#000000',
            }
        }
        />{' '} <
        div className = "preview" >
        <
        p style = {
            {
                fontFamily: `${fontFamily}, sans-serif`,
                fontSize: `${fontSize}px`,
                color: fontColor,
            }
        } > { ' ' } { text } { ' ' } <
        /p>{' '} < /
        div > { ' ' } <
        /div>
    )
}

export default TextEditor