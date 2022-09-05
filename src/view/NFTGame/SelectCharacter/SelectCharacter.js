import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Flex, Text } from 'crox-new-uikit';
import ScrollArea from 'react-scrollbar'
import useMediaQuery from "use-mediaquery";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import Card from './Card';
import myEpicGame from '../../../utils/MyEpicGame.json'
import { NFTGAME_CONTRACT_ADDRESS, transformCharacterData } from '../../../utils/constants';
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
SwiperCore.use([Navigation, Autoplay]);

const SelectCharacter = ({ setCharacterNFT }) => {
    const [characters, setCharacters] = useState([])
    const [gameContract, setGameContract] = useState(null);
    const isMobile = useMediaQuery("(max-width: 600px)");

    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(
                NFTGAME_CONTRACT_ADDRESS,
                myEpicGame.abi,
                signer
            );
            setGameContract(gameContract);
        } else {
            console.log('Ethereum object not found');
        }
    }, []);

    useEffect(() => {
        const getCharacters = async () => {
            try {
                const characterTxn = await gameContract.getAllDefaultCharacters();

                const characters = characterTxn.map((characterData) => transformCharacterData(characterData))

                setCharacters(characters)
            } catch (error) {
                console.log('Something went wrong fetching characters:', error)
            }
        }

        const onCharacterMint = async (sender, tokenId, characterIndex) => {
            console.log(`CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`)
            if (gameContract) {
                const txn = await gameContract.checkIfUserHasNFT();
                console.log('CharacterNFT: ', txn);
                setCharacterNFT(txn);
            }
        }

        if (gameContract) {
            getCharacters();
            gameContract.on('CharacterNFTMinted', onCharacterMint);
        }

        return () => {
            if (gameContract) {
                gameContract.off('CharacterNFTMinted', onCharacterMint)
            }
        }
    }, [gameContract])

    const normalCount = characters.filter((character) => character.precious === 'normal').length;
    const rareCount = characters.filter((character) => character.precious === 'rare').length;
    const heroCount = characters.filter((character) => character.precious === 'hero').length;

    return (
        <Flex className='card_group'>
            <ScrollArea
                speed={1}
                className="area"
                contentClassName="content"
                smoothScrolling
                verticalContainerStyle={{ borderRadius: '10px' }}
                verticalScrollbarStyle={{ borderRadius: '10px' }}
            >
                {characters.length > 0 && (
                    <Flex flexDirection='column'>
                        <Flex flexDirection='column' mb='20px'>
                            <Text fontSize='20px' color='pink' bold>NORMAL CARDS</Text>
                            <Flex>
                                {isMobile ? (
                                    <Swiper
                                        loop={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                    >
                                        {characters.filter((character) => character.precious === 'normal').map((character, index) => (
                                            <SwiperSlide>
                                                <Card character={character} index={index} gameContract={gameContract} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : (
                                    characters.filter((character) => character.precious === 'normal').map((character, index) => (
                                        <Card character={character} index={index} gameContract={gameContract} />
                                    ))
                                )}
                            </Flex>
                        </Flex>
                        <Flex flexDirection='column' mb='20px'>
                            <Text fontSize='20px' color='orange' bold>RARE CARDS</Text>
                            <Flex>
                                {isMobile ? (
                                    <Swiper
                                        loop={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                    >
                                        {characters.filter((character) => character.precious === 'rare').map((character, index) => (
                                            <SwiperSlide>
                                                <Card character={character} index={index + normalCount} gameContract={gameContract} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : (
                                    characters.filter((character) => character.precious === 'rare').map((character, index) => (
                                        <Card character={character} index={index + normalCount} gameContract={gameContract} />
                                    ))
                                )}
                            </Flex>
                        </Flex>
                        <Flex flexDirection='column' mb='20px'>
                            <Text fontSize='20px' color='#56ccf2' bold>HERO CARDS</Text>
                            <Flex>
                                {isMobile ? (
                                    <Swiper
                                        loop={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                    >
                                        {characters.filter((character) => character.precious === 'hero').map((character, index) => (
                                            <SwiperSlide>
                                                <Card character={character} index={index + normalCount + rareCount} gameContract={gameContract} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : (
                                    characters.filter((character) => character.precious === 'hero').map((character, index) => (
                                        <Card character={character} index={index + normalCount + rareCount} gameContract={gameContract} />
                                    ))
                                )}
                            </Flex>
                        </Flex>
                        <Flex flexDirection='column'>
                            <Text fontSize='20px' color='#cd93ff' bold>LEGEND CARDS</Text>
                            <Flex>
                                {characters.filter((character) => character.precious === 'legend').map((character, index) => (
                                    <Card character={character} index={index + normalCount + rareCount + heroCount} gameContract={gameContract} />
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </ScrollArea>
        </Flex>
    );
};

export default SelectCharacter;