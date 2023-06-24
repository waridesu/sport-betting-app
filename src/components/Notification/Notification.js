import React from 'react';
import styles from './Notification.module.css';

function Notification({ message }) {
    return (
        <div className={styles.Notification}>
            <p>{message}</p>
        </div>
    );
}

export default Notification;
