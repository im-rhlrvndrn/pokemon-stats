export const initialState = {
    pokemon: {},
};

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case 'SET_POKEMON':
            return { ...state, pokemon: action.pokemon };

        default:
            return state;
    }
};

export default reducer;
