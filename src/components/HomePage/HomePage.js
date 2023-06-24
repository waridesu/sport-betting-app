import React from 'react';
import { Link } from 'react-router-dom';
import { events } from '../helper/event';
import styles from './HomePage.module.css';

function HomePage() {
    return (
        <div className={styles.HomePage}>
            <h1>Текущие и предстоящие события</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <Link to={`/event/${event.id}`}>{event.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
