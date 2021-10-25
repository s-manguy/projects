// selector utilisé avec useSelector
export const selectTheme = (state) => state.theme;

export const selectFreelances = (state) => state.freelances;

export const selectSurvey = (state) => state.survey;

const voidFreelance = { status: 'void'}
export const selectFreelance = (freelanceId) => (state)  => {
    return state.freelance[freelanceId] ?? voidFreelance
}