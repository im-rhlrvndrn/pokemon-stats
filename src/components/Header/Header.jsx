import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDataLayerValue } from '../../DataLayer';

// images
import PokemonLogo from '../../images/pokemon-logo.png';
import pokemonInstance from '../../utils/pokemon';

// styles
import './Header.scss';

const Header = () => {
    const history = useHistory();
    const [{ pokemon }, dispatch] = useDataLayerValue();
    const [searchInput, setSearchInput] = useState('');

    const fetchPokemon = async () => {
        try {
            let response = await pokemonInstance.getPokemonByName(searchInput.toLowerCase());
            console.log(response);
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
                    <button type='submit'>Search</button>
                </form>
            </div>
        </div>
    );
};

export default Header;
