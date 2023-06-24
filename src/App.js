import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import EventDetailPage from './components/EventDetailPage/EventDetailPage';
import Notification from './components/Notification/Notification';

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
        <Router>
            <div className="App">
                {notification && <Notification
                    message={`Спасибо, ваша ставка ${notification.match}, ставка ${notification.bet} принята`}/>}
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/event/:id" element={<EventDetailPage onBet={handleBet}/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
