import React, {useRef, useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {events} from '../helper/event';
import styles from './EventDetailPage.module.css';

const betOptions = {
    'home': 'на победу хозяев',
    'draw': 'на ничью',
    'away': 'на победу гостей',
};

function EventDetailPage({onBet}) {
    const {id} = useParams();
    const navigate = useNavigate();
    const event = events.find(e => e.id === Number(id));

    const ratioContainerRef = useRef();
    const [selectedBet, setSelectedBet] = useState(event.selectedBet);

    const handleBet = () => {
        const checkedValue = ratioContainerRef.current?.querySelector('input:checked')?.value;
        if (!checkedValue) return;

        event.selectedBet = selectedBet;
        onBet(event.name, selectedBet);
        navigate('/');
    };

    const handleRadioChange = (e) => {
        if (e.target.checked) {
            setSelectedBet(betOptions[e.target.value]);
        }
    };

    return (
        <div className={styles.EventDetailPage}>
            <Link className={styles.longArrowLeft} to="/" onClick={(e) => {e.preventDefault(); navigate(-1);}}>back</Link>
            <h1>{event.name}</h1>
            <p>Дата: {event.date}</p>
            <p>Команды: {event.teams.join(' vs ')}</p>
            <h2>Сделайте ставку:</h2>
            <div className={styles.InputContainer} ref={ratioContainerRef}>
                {Object.keys(betOptions).map(key => (
                    <div key={key}>
                        <input
                            disabled={event.selectedBet}
                            type="radio"
                            id={key}
                            name="bet"
                            value={key}
                            checked={selectedBet === betOptions[key]}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor={key}>{betOptions[key]}</label>
                    </div>
                ))}
            </div>
            <button disabled={event.selectedBet} onClick={handleBet}>Сделать ставку</button>
        </div>
    );
}

export default EventDetailPage;
