import { LuClock3 } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { TbChecks, TbCheck } from "react-icons/tb";
import { useEffect, useState } from 'react';
import '../assets/styles/addMessage.scss';
import { useDispatch, useSelector } from "react-redux";

const AddMessage = ({setAddMessageShow, isChecked, setIsChecked, isDelivered, setIsDelivered, isShowDate, setIsShowDate, currentMessage, isEditMessage, setIsEditMesage, setCurrentMesage}) => {


    const [isHideAnim, setIsHideAnim] = useState(false);
    const [messageOption, setMessageOptioan] = useState('delivered');
    const [isSender, setIsSender] = useState(true);

    const [person, setPerson] = useState('me')
    const [messageTime, setMessageTime] = useState('20:08')
    const [messageDate, setMessageDate] = useState('Вт, 12 дек.')
    const [text, setText] = useState('')

    const dispatch = useDispatch();
    const messages = useSelector((state) => {
        return state.messages
    })
    

    useEffect(() => {
        if(currentMessage) {
            if (currentMessage.checked) {
                setMessageOptioan('readIt')
            } else if (currentMessage.delivered) {
                setMessageOptioan('delivered')
            } else {
                setMessageOptioan('sent')
            }
            setPerson(currentMessage.person);
            setMessageTime(currentMessage.time);
            setMessageDate(currentMessage.date);
            setText(currentMessage.text);
            setIsShowDate(currentMessage.isShowDate);

            currentMessage.person === 'me' ? setIsSender(true) : setIsSender(false)
        }

    }, [messages])


return (
<div className={isHideAnim ? "AddMessage hide" : "AddMessage"}>
    <div className="wrapper">
        <div className="top">
            <div className="left">
                <button className={isSender ? "sender active" : "sender"} onClick={() => {
                    setIsSender(true)
                    setPerson('me')
                }}>Отправитель</button>
                <button className={isSender ? 'receiver' : 'receiver active'} onClick={() => {
                    setIsSender(false)
                    setPerson('he')
                }}>Получатель</button>
            </div>
            <div className="right">
            <button className='close' onClick={() => {
                setIsHideAnim(true)
                setTimeout(() => {
                    setAddMessageShow(false)
                    setIsEditMesage(false)
                }, 400);
            }}><MdClose /></button>
            </div>
        </div>
        <div className="messageText">
            <textarea name="" id="" cols="30" rows="10" value={text} onInput={(e) => {setText(e.target.value)}}></textarea>
        </div>
        <div className="time_date">
            <input type="time" value={messageTime} onInput={(e) => {setMessageTime(e.target.value)}}/>
            <div>
                <div className={isShowDate ? "dateShow active" : "dateShow"} onClick={() => {setIsShowDate(!isShowDate)}}></div>
                <input type="text" value={messageDate} onInput={(e) => {setMessageDate(e.target.value)}}/>
            </div>
        </div>
        <div className="message_options">
            <div className={messageOption === 'sending' ? 'sending active' : 'sending'} value={messageOption} onClick={() => {
                setMessageOptioan('sending')
                setIsChecked(false)
                setIsDelivered(false)
        }}> <div className="icon"><LuClock3 /></div><p>Отправка</p></div>
            <div className={messageOption === 'sent' ? 'sent active' : 'sent'}  value={messageOption} onClick={() => {
                setMessageOptioan('sent')
                setIsChecked(false)
                setIsDelivered(false)
        }}><div className="icon"><TbCheck /></div><p>Отправлено</p></div>
            <div className={messageOption === 'delivered' ? 'delivered active' : 'delivered'} value={messageOption} onClick={() => {
                setMessageOptioan('delivered')
                setIsChecked(false)
                setIsDelivered(true)
        }}><div className="icon"><TbChecks /></div><p>Доставлен</p></div>
            <div className={messageOption === 'readIt' ? 'readIt active' : 'readIt'}  value={messageOption} onClick={() => {
                setMessageOptioan('readIt')
                setIsChecked(true)
                setIsDelivered(true)
        }}> <div className="icon"><TbChecks color="#53a6fd"/></div><p>Прочитано</p></div>
        </div>
        <div className="sendBtn" onClick={() => {
            console.log(messages)
            setIsEditMesage(false)
            isEditMessage ? 


            dispatch({
            type: 'edit-message',
                payload: {
                    id: currentMessage.id,
                    person: person,
                    time: messageTime,
                    date: messageDate,
                    text: text,
                    delivered: isDelivered,
                    checked: isChecked,
                    isShowDate
                }
            })
            : dispatch({
                type: 'add-new-message',
                payload: {
                    id: Math.random(),
                    person: person,
                    time: messageTime,
                    date: messageDate,
                    text: text,
                    delivered: isDelivered,
                    checked: isChecked,
                    isShowDate
                }
            })
            }}>
            <button>{isEditMessage ? 'Сохранить' : 'Отправить'}</button>
        </div>
    </div>
</div>
);

}
export default AddMessage;