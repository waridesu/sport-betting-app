import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import EventDetailPage from './components/EventDetailPage/EventDetailPage';
import Notification from './components/Notification/Notification';
import {basename, event, home} from './shared/routes';

function App() {
    const [notification, setNotification] = useState(null);

    const handleBet = (match, bet) => {
        setNotification({match, bet});
    };
    useEffect(() => {
        if (notification !== null) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [notification]);
    return (
        <BrowserRouter basename={basename}>
            <div className="App">
                {notification && <Notification
                    message={`Спасибо, ваша ставка ${notification.match}, ставка ${notification.bet} принята`}/>}
                <Routes>
                    <Route path={home} element={<HomePage/>}/>
                    <Route path={event} element={<EventDetailPage onBet={handleBet}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;