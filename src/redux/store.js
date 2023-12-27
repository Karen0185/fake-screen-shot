import { createStore } from 'redux';

const store = createStore((state, action) => {
    if(action.type === 'add-new-message') {
        return {
            ...state,
            messages: [
                ...state.messages,
                {
                    id: action.payload.id,
                    person: action.payload.person,
                    time: action.payload.time,
                    text: action.payload.text,
                    date: action.payload.date,
                    delivered: action.payload.delivered,
                    checked: action.payload.checked,
                    isShowDate: action.payload.isShowDate
                }
            ]
        }
    }

    if(action.type === 'delete-message') {
        
        return {
            ...state,
            messages: [
                ...state.messages.filter((item) => item.id !== action.payload.id)
            ]
        }
    }
    if(action.type === 'edit-message') {
        
        const currentIndex = state.messages.findIndex((item) => item.id === action.payload.id)
        console.log(currentIndex);
        return {
            ...state,
            messages: [
                ...state.messages.slice(0,currentIndex),
                {
                    id: action.payload.id,
                    person: action.payload.person,
                    time: action.payload.time,
                    text: action.payload.text,
                    date: action.payload.date,
                    delivered: action.payload.delivered,
                    checked: action.payload.checked,
                    isShowDate: action.payload.isShowDate
                },
                ...state.messages.slice(currentIndex + 1)
            ]
        }
    }
    return state;
}, {
    device: {
        time: '21:41',
        networkLte: true,
        battery: '98'
    },
    messages: [
    ]
})

export default store;