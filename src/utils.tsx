export const handleEnergyClass = (className: string) => {
    // if (className === 'classAPlusPlus') return 'classAPlusPlusSelected'
    // if (className === 'classAPlus') return 'classAPlusSelected'
    if (className === 'classA') return 'classASelected'
    if (className === 'classB') return 'classBSelected'
    if (className === 'classC') return 'classCSelected'
    if (className === 'classD') return 'classDSelected'
    if (className === 'classE') return 'classESelected'
}

export const handleUColor = (value: number) => {
    if (value < 1.4) return '#63AA5A'
    if (value >= 1.4 && value < 2) return '#FBB900'
    if (value >= 2 && value < 2.2) return '#FB8800'
    if (value >= 2.2) return '#E30613'
}