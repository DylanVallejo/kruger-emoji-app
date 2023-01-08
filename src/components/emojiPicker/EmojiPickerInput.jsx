
import { React,useRef,} from 'react'
import EmojiPicker from './EmojiPicker'

const EmojiPickerInput = ( ) => {
    const refInput = useRef(null)
    
    const handleClick = (e) => {
        refInput.current.focus();
        // alert('ref usado')
    }
    return (
        <div>
            <input ref={refInput}/>
            <button onClick={handleClick}>Click me</button>
            <EmojiPicker/>
            EmojiPickerInput component
        </div>
    )
}

export default EmojiPickerInput