import { useEffect, useState } from 'react';
import type { Room } from '../../common/lib/schema';

function App() {
    const [roomArray, setRoomArray] = useState<Room[]>();

    useEffect(() => {
        async function getData() {
            setRoomArray(await (await fetch('/api/rooms')).json());
        }

        getData();
    }, []);

    if (!roomArray) return null;

    return (
        <>
            {roomArray.map(({ name, playerCount, maxPlayerCount }) => {
                return (
                    <h1>
                        {name} - {playerCount}/{maxPlayerCount}
                    </h1>
                );
            })}
        </>
    );
}

export default App;
