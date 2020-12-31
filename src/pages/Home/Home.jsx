import React from 'react';
import { useDataLayerValue } from '../../DataLayer';

// styles
import './Home.scss';

const Home = () => {
    const [{ pokemon }, dispatch] = useDataLayerValue();

    return (
        <div className='home'>
            <div className='home__wrapper'>
                <h1>Welcome to the realm of Pokemon's</h1>
            </div>
        </div>
    );
};

export default Home;
