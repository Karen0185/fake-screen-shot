import { IoIosWifi, IoIosBatteryFull } from "react-icons/io";
import { MdBatteryFull, MdClose } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import '../assets/styles/iosStatusBar.scss';

const IosStatusBar = () => {
    const [deviceTime, setDeviceTime] = useState('21:41')
    const [isWiFi, setIsWiFi] = useState(true)
    const [isLte, setIsLte] = useState(false)
    const [isThreeG, setIsThreeG] = useState(false)
    const [deviceBattery, setDeviceBattery] = useState('41')
    const [showDeviceSetting, setShowDeviceSetting] = useState(false)
    const [isHideAnim, setIsHideAnim] = useState(false)

    const device = useSelector((state) => {
        return state.device
    })

    const battery = useSelector((state) => {
        return state.device.battery
    })

    const dispatch = useDispatch()


return (
<div className="IosStatusBar nightMode"  onClick={() => {
    setShowDeviceSetting(true)
}}>
{
    showDeviceSetting && <div className={isHideAnim ? 'deviceSetting hide' : 'deviceSetting'}>
        <div className="wrapper">
            <div className="left">
                <div>
                    <p>Время</p>
                    <input type="text" value={deviceTime} onInput={(e) => {setDeviceTime(e.target.value)}} />
                </div>
                <div className="networkOptions">
                    <div className={isWiFi ? "wifi active" : "wifi"} onClick={() => {
                        setIsWiFi(true)
                        setIsLte(false)
                        setIsThreeG(false)
                    }}>
                        <p>Wi-Fi</p>
                    </div>
                    <div className={isLte ? "lte active" : "lte"} onClick={() => {
                        setIsWiFi(false)
                        setIsLte(true)
                        setIsThreeG(false)
                    }}>
                        <p>LTE</p>
                    </div>
                    <div className={isThreeG ? "threeg active" : "threeg"} onClick={() => {
                        setIsWiFi(false)
                        setIsLte(false)
                        setIsThreeG(true)
                    }}>
                        <p>3G</p>
                    </div>
                </div>
                <div>
                    <p>Заряд</p>
                    <input type="text" value={deviceBattery} onInput={(e) => {setDeviceBattery(e.target.value)}} />
                </div>
            </div>
            <div className="right">
                <button className="close" onClick={() => {
                setIsHideAnim(true)
                setTimeout(() => {
                    setShowDeviceSetting(false)
                    setIsHideAnim(false)
                }, 400);
            }}><MdClose /></button>
            </div>
        </div>
    </div>
}
    <div className="left">
        <div className="time" >
            <p>{deviceTime}</p>
        </div>
    </div>
    <div className="right">
        <div className="network">
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
            <div className="line line4"></div>
        </div>
        <div className={isWiFi ? "internet" : "internet text"}>{isWiFi ? <IoIosWifi /> : isLte ? 'LTE' : '3G'}</div>
        <div className="battery">
            <div className="batteryIcon"> 
            <div className="batteryPercent" style={{width: deviceBattery + '%'}}></div>
                <p>{deviceBattery}</p>
            </div>
        </div>
    </div>
</div>
);

}
export default IosStatusBar;