import copyImg from '../images/copy.svg'
import '.././styles/room-code.scss'
import AWN from "awesome-notifications"
// Set global options
// Initialize instance of AWN




export function RoomCode(props){

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
        new AWN().success('Copiado com sucesso', {durations: 1})

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