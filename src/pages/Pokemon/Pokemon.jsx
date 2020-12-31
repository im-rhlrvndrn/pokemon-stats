import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDataLayerValue } from '../../DataLayer';
import pokemonInstance from '../../utils/pokemon';

// styles
import './Pokemon.scss';

const Pokemon = () => {
    const { name } = useParams();
    const [{ pokemon }, dispatch] = useDataLayerValue();

    useEffect(() => {
        (async () => {
            const response = await pokemonInstance.getPokemonByName(name);
            dispatch({ type: 'SET_POKEMON', pokemon: response });
        })();
    }, [name]);

    return (
        <div className='pokemon'>
            {pokemon?.name && (
                <img
                    src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon?.id}.png`}
                    alt={pokemon?.name}
                />
            )}
            <div className='pokemon__card'>
                <div className='pokemon__card__right'>
                    <h3>{pokemon?.name}</h3>
                    {pokemon?.name && (
                        <div className='pokemon__physic'>
                            <div className='pokemon__physic__height'>
                                <p className='title'>Height</p>
                                <h3 className='subtitle'>{`${pokemon?.height / 10}`} m</h3>
                            </div>
                            <div className='pokemon__physic__weight'>
                                <p className='title'>Weight</p>
                                <h3 className='subtitle'>{`${pokemon?.weight / 10}`} kgs</h3>
                            </div>
                            <div className='pokemon__physic__type'>
                                <p className='title'>Type</p>
                                <h3 className='subtitle'>
                                    {pokemon?.types?.map((type, index) => {
                                        if (pokemon?.types?.length === index + 1)
                                            return ` ${type?.type?.name}`;
                                        else return ` ${type?.type?.name} /`;
                                    })}
                                </h3>
                            </div>
                        </div>
                    )}
                    <div className='pokemon__stats'>
                        {pokemon?.stats?.length && <h4>Stats</h4>}
                        {pokemon?.stats?.map((stat) => (
                            <div className='pokemon__stats__stat'>
                                <div className='info'>
                                    <p>{stat?.stat?.name}</p>
                                    <h3>{stat?.base_stat < 100 ? stat?.base_stat : 'MAX'}</h3>
                                </div>
                                <div className='stat__bar'>
                                    <div
                                        className='stat__bar__progress'
                                        style={{
                                            width: `${
                                                stat?.base_stat < 100 ? stat?.base_stat : '100'
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='pokemon__card__left'>
                    {pokemon?.moves?.length && (
                        <div className='pokemon__moves'>
                            <h3>Moves ({pokemon?.moves?.length})</h3>
                            {pokemon?.moves?.map((move) => (
                                <div>{move?.move?.name}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pokemon;
