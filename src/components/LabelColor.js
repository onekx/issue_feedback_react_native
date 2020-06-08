export const changeColor = (value) => {
    let color = ''
    switch (value.name) {
        case 'Bug':
            color = '#D73A4A'
            break
        case 'Ducumentation':
            color = '#0075CA'
            break
        case 'Duplication':
            color = '#CFD3D7'
            break
        case 'Enhancement':
            color = '#A2EEEF'
            break
        case 'Help Wanted':
            color = '#008672'
            break
        case 'Question':
            color = '#D876E3'
            break
        case 'Invalid':
            color = '#E4E669'
            break
        default:
            color = '#FFFFFF'
            break
    }
    return color
}

export const addColor = (value) => {
    switch (value.name) {
        case 'Bug':
            value.color = '#D73A4A'
            break
        case 'Ducumentation':
            value.color = '#0075CA'
            break
        case 'Duplication':
            value.color = '#CFD3D7'
            break
        case 'Enhancement':
            value.color = '#A2EEEF'
            break
        case 'Help Wanted':
            value.color = '#008672'
            break
        case 'Question':
            value.color = '#D876E3'
            break
        case 'Invalid':
            value.color = '#E4E669'
            break
        default:
            value.color = '#FFFFFF'
            break
    }
}
