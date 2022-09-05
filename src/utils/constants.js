const NFTGAME_CONTRACT_ADDRESS = "0x3299ad666b3162C63DEDada0D3A8984C46fa11a3"

const transformCharacterData = (characterData) => {
    return {
        name: characterData.name,
        imageURI: characterData.imageURI,
        hp: characterData.hp.toNumber(),
        maxHp: characterData.maxHp.toNumber(),
        attackDamage: characterData.attackDamage.toNumber(),
        precious: characterData.precious
    }
}

export { NFTGAME_CONTRACT_ADDRESS, transformCharacterData };