export function cardBgColor(type) {
  switch(type){
    case 'fire':
      return '#F57D31'
    case 'grass':
    case 'poison':
      return '#74CB48'
    case 'water':
      return '#6493EB'
    case 'electric':
      return '#F9CF30'
    case 'ghost':
    case 'type':
      return '#70559B'
    case 'normal':
      return '#AAA67F'
    case 'psychic':
      return '#FB5584'
    case 'steel':
    case 'rock':
      return '#B7B9D0'
    case 'bug':
    case 'flying':
      return '#A7B723'
    default:
      return 'gray'
  }
}

