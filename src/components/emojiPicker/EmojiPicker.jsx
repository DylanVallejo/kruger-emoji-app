
import {forwardRef,useState,useEffect} from 'react'
import EmojiSearch from './EmojiSearch'
import {data as emojiList} from "./data2"
import EmojiButton from './EmojiButton'
import { useRef } from 'react'


export const EmojiPicker = (props,inputRef) =>{
    
    const [isOpen, setIsOpen] = useState(false)
    const [emojis, setEmojis] = useState(emojiList)
    
    const containerRef = useRef(null)
    
    useEffect(()=>{
        window.addEventListener('click',e =>{
            if(!containerRef.current.contains(e.target)){
                setIsOpen(false)
                setEmojis(emojiList)
            }
        })
    },[])
    
    const handleClickOpen = () => {
        setIsOpen(!isOpen)
    }
    
    const handleSearch = ( e ) => {
        const q = e.target.value
        
        if(!!q){
            const search = emojiList.filter((emoji) =>{
            
                return(
                    emoji.name.toLowerCase().includes(q) ||
                    emoji.keywords.toLowerCase().includes(q)
                    
                );
            });
            setEmojis(search);
        }else{
            setEmojis(emojiList);
        }
    }
    const handleOnClickEmoji = (emoji) => { 
        const cursorPos = inputRef.current.selectionStart;
        const text = inputRef.current.value;
        const prev = text.slice ( 0,cursorPos);
        const next = text.slice(cursorPos);
        
        inputRef.current.value = prev + emoji.symbol + next;
        inputRef.current.selectionStart = cursorPos + emoji.symbol.length;
        inputRef.current.selectionEnd = cursorPos + emoji.symbol.length;
        inputRef.current.focus();
    }
    
    return(
        <div ref={containerRef}>
            <button onClick={handleClickOpen}>😒</button>
            
            {isOpen ?  (
            <div >
                <EmojiSearch onSearch={handleSearch}/>
                <div>
                    {
                        emojis.map((emoji)=> { 
                            return( 
                                <EmojiButton 
                                    key={emoji.symbol}
                                    emoji={emoji} 
                                    onClick={handleOnClickEmoji}
                                />
                            )
                        })
                    }
                </div>
            </div>) : ''}
        </div>
    )
    
}

export default forwardRef(EmojiPicker);