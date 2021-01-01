import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDataLayerValue } from '../../DataLayer';
import useWindowSize from '../../utils/useWindowSize';
import pokemonInstance from '../../utils/pokemon';

// images
import PokemonLogo from '../../images/pokemon-logo.png';
import SearchIcon from '../../images/SearchIcon';

// styles
import './Header.scss';

const Header = () => {
    const _windowSize = useWindowSize();
    const history = useHistory();
    const [{ pokemon }, dispatch] = useDataLayerValue();
    const [searchInput, setSearchInput] = useState('');

    const fetchPokemon = async () => {
        try {
            if (searchInput === '') return alert('Please enter a Pokemon name');
            let response = await pokemonInstance.getPokemonByName(searchInput.toLowerCase());
            dispatch({ type: 'SET_POKEMON', pokemon: response });
            history.push(`/pokemon/${searchInput.toLowerCase()}`);
        } catch (error) {
            console.log(error);
            alert('Pokemon Not Found!');
        }
        setSearchInput('');
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await fetchPokemon();
    };

    return (
        <div className='header'>
            <div className='header__wrapper'>
                <img src={PokemonLogo} alt='pokemon logo' className='logo' />
                <form onSubmit={onSubmit}>
                    <input
                        type='text'
                        name='searchbar'
                        id='searchbar'
                        placeholder='Search for pokemon'
                        autoComplete='off'
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <button type='submit'>
                        {_windowSize?.width <= 500 ? <SearchIcon color='white' /> : 'Search'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Header;
