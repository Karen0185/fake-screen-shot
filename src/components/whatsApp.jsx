import { IoIosArrowBack, IoIosAdd } from "react-icons/io";
import { HiOutlineCamera } from "react-icons/hi";
import { PiStickerDuotone } from "react-icons/pi";
import { TbChecks, TbCheck } from "react-icons/tb";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { GrMicrophone } from "react-icons/gr";
import bgDarkMode from '../assets/images/whatsapp_dark_bg.jpeg'
import IosStatusBar from './iosStatusBar';
import { useState } from "react";
import AddMessage from "./addMessage";
import { useDispatch, useSelector } from "react-redux";
import '../assets/styles/whatsApp.scss'

const WhatsApp = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [isDelivered, setIsDelivered] = useState(false);
    const [personName,setPersonName] = useState('+9 999 999-99-99');
    const [onlineStatus, setOnlineStatus] = useState('был(-а) сегодня в 21:41');
    const [isShowDate, setIsShowDate] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentMessage, setCurrentMessage] = useState();
    const [addMessageShow, setAddMessageShow] = useState(false)
    const [isEditMessage, setIsEditMesage] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

    const dispatch = useDispatch();

    const messages = useSelector((state) => {
        return state.messages
    })

    const deleteMessage = (message) => {
        dispatch({
            type: 'delete-message',
            payload: {
                id: message.id
            }
        })
    }


    return (
        <div className="WhatsApp">
            <IosStatusBar />
            <div className="header">
                <div className="left">
                    <div className="back"><IoIosArrowBack /></div>
                    <div className="personInfo">
                        <div className="person-left">
                            <label htmlFor="avatar">
                                <div className="avatar" >
                                    <input type="file" accept="image/*" id="avatar" onChange={handleFileChange} />
                                    {selectedFile && (
                                        <img src={URL.createObjectURL(selectedFile)} alt="Выбранное изображение" />
                                    )}
                                </div>
                            </label>
                        </div>
                        <div className="person-right">
                            <div className="name"><input type="text" value={personName} onInput={(e) => setPersonName(e.target.value)}/></div>
                            <div className="status"><input type="text" value={onlineStatus} onInput={(e) => {setOnlineStatus(e.target.value)}} /></div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="videoCall">
                        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 3L16 8L23 13V3Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H14C15.1046 15 16 14.1046 16 13V3C16 1.89543 15.1046 1 14 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="call">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15.92V18.92C21.0011 19.1985 20.9441 19.4742 20.8325 19.7293C20.7209 19.9845 20.5573 20.2136 20.3521 20.4019C20.1469 20.5901 19.9046 20.7335 19.6407 20.8227C19.3769 20.9119 19.0974 20.9451 18.82 20.92C15.7428 20.5856 12.787 19.5341 10.19 17.85C7.77383 16.3147 5.72534 14.2662 4.19 11.85C2.49998 9.2412 1.44824 6.27099 1.12 3.18C1.09501 2.90347 1.12787 2.62476 1.2165 2.36162C1.30513 2.09849 1.44757 1.85669 1.63477 1.65162C1.82196 1.44655 2.0498 1.28271 2.30379 1.17052C2.55778 1.05833 2.83234 1.00026 3.11 1H6.11C6.59531 0.995224 7.06579 1.16708 7.43376 1.48353C7.80173 1.79999 8.04208 2.23945 8.11 2.72C8.23662 3.68007 8.47145 4.62273 8.81 5.53C8.94454 5.88792 8.97366 6.27691 8.89391 6.65088C8.81415 7.02485 8.62886 7.36811 8.36 7.64L7.09 8.91C8.51356 11.4135 10.5865 13.4864 13.09 14.91L14.36 13.64C14.6319 13.3711 14.9752 13.1858 15.3491 13.1061C15.7231 13.0263 16.1121 13.0555 16.47 13.19C17.3773 13.5286 18.3199 13.7634 19.28 13.89C19.7658 13.9585 20.2094 14.2032 20.5265 14.5775C20.8437 14.9518 21.0122 15.4296 21 15.92Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="messages">
                <div className="bg" style={{ backgroundImage: `url(${bgDarkMode})` }}></div>
                {
                    messages.length > 0 && messages.map((message, index) =>
                        <div key={index} className={message.person === 'me' ? 'message person1' : 'message person2 '}>
                            {message.isShowDate ? <div className="message_date"><p>{message.date}</p></div> : ''}
                            <div className="text">
                                <p>{message.text}
                                <div className='messageOption'>
                                    <div className="edit" onClick={() => {
                                            setIsEditMesage(false)
                                            setAddMessageShow(false)
                                            setTimeout(() => {
                                                setIsEditMesage(true)
                                            }, 10);
                                            setCurrentMessage(message)
                                        }}>
                                        <div className="icon"><MdEdit /></div>
                                    </div>
                                    <div className="delete" onClick={() => {
                                        deleteMessage(message)
                                    }}>
                                        <div className="icon"><MdDeleteOutline /></div>
                                    </div>
                                </div>
                                    <span className="time">{message.time} {message.person === 'me' && <span className='isCheck'>{
                                        message.checked ? <TbChecks color="#53a6fd"/> : message.delivered ? <TbChecks /> : <TbCheck />
                                    }</span>} </span>
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                addMessageShow || isEditMessage ? <AddMessage 
                setAddMessageShow={setAddMessageShow}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                isDelivered={isDelivered}
                setIsDelivered={setIsDelivered}
                isShowDate={isShowDate}
                setIsShowDate={setIsShowDate}
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
                isEditMessage={isEditMessage}
                setIsEditMesage={setIsEditMesage}
                /> : ''
            }
            <div className="footer">
                <div className="add"><IoIosAdd /></div>
                <div className="input" onClick={() => {
                        setAddMessageShow(false)
                        setTimeout(() => {
                            setAddMessageShow(true)
                        },20)
                }}>
                    <div className="sticker"><PiStickerDuotone /></div>
                </div>
                <div className="camera"><HiOutlineCamera /></div>
                <div className="microphone"><GrMicrophone /></div>
            </div>
        </div>
    );

}
export default WhatsApp;