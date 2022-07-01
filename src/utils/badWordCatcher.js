const badWordCatcher = (content) => {
    const badWords = ['cu', 'puto', 'puta', 'vagabundo', 
    'vagabunda', 'fuder', 'caralho', 'safado', 'safada', 'buceta']
    const contentArray = content.toLowerCase().split(' ')

    const foundBadWords = contentArray.filter(word => badWords.includes(word));
    
    return foundBadWords.length
}

export default badWordCatcher