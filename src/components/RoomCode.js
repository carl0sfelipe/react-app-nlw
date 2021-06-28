import copyImg from '../images/copy.svg'
import '.././styles/room-code.scss'


export function RoomCode(props){

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
    }
    return(
        <button className='room-code'  onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt='copiar room code '/>
            </div>
            <span> Sala {props.code}</span>
        </button>
    )
}