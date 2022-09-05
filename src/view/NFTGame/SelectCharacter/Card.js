import React, { useState } from "react";
import { Flex, Text } from "crox-new-uikit";
import { AnimateKeyframes } from 'react-simple-animate';
import { Icon } from '@iconify/react';
import { Button } from "../../../components/CommonComponents";

function Card(props) {
    const { character, index, gameContract } = props
    const [waitWave, setWaitWave] = useState(false)

    const mintCharacterNFTAction = async (characterId) => {
        try {
            if (gameContract) {
                setWaitWave(true)
                console.log("Minting character in progress...");
                const mintTxn = await gameContract.mintCharacterNFT(characterId);
                await mintTxn.wait();
                setWaitWave(false)
                console.log("mintTxn:", mintTxn)
            }
        } catch (error) {
            setWaitWave(false)
            console.warn('MintCharacterAction Error:', error)
        }
    }
    return (
        <Flex className={`card_parent_${character.precious}`} justifyContent='center'>
            <Flex className={`card_child_${character.precious}`} justifyContent='center'>
                <Flex flexDirection='column' className={`gameCard card_${character.precious}`} alignItems='center' mr='10px'>
                    {character.precious === 'legend' && <Icon icon="noto:ninja" style={{ fontSize: '24px' }} className="card_icon" />}
                    <Flex alignItems='center' mb='10px'>
                        <Text fontSize="18px" ml='3px' bold>{character.name.toUpperCase()}</Text>
                    </Flex>
                    {character.precious === 'legend' ? (
                        <AnimateKeyframes
                            play
                            iterationCount="infinite"
                            direction="alternate"
                            duration={2}
                            keyframes={[
                                'transform: scale(1.2)',
                                'transform: scale(1.6)',
                            ]}
                        >
                            <Flex>
                                <img src={character.imageURI} alt={character.name} />
                            </Flex>
                        </AnimateKeyframes>
                    ) : (
                        <img src={character.imageURI} alt={character.name} />
                    )}
                    <Flex alignItems='center' mt='10px'>
                        <Icon icon="emojione-v1:growing-heart" />
                        <Text fontSize="14px" ml='5px' mr='30px' bold>{character.hp}</Text>
                        <Icon icon="noto:crossed-swords" />
                        <Text fontSize="14px" ml='5px' bold>{character.attackDamage}</Text>
                    </Flex>

                    {waitWave ? (
                        <Button className={`animateButton m-0 mt-10 btn_${character.precious}`}>
                            <lottie-player
                                autoplay
                                loop
                                mode="normal"
                                src={character.precious === 'legend' ? "https://assets7.lottiefiles.com/packages/lf20_eihovywu.json" : "https://assets8.lottiefiles.com/packages/lf20_IQz7XR.json"}
                                style={{ width: '70px', height: '70px' }}
                            />
                        </Button>
                    ) : (
                        <Button className={`animateButton m-0 mt-10 btn_${character.precious}`} onClick={() => mintCharacterNFTAction(index)}>Mint</Button>
                    )}
                </Flex>
            </Flex>
        </Flex >
    )
}

export default Card