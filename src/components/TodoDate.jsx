import { useEffect, useState } from "react";

export const TodoDate = () => {
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setDateTime(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <h2 className="date-time">{dateTime}</h2>;
};
