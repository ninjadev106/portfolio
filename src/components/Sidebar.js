import React from 'react';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SidebarFooter, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Flex, Link } from 'crox-new-uikit';
import useMediaQuery from "use-mediaquery";
import { Button } from './CommonComponents';
import '../assets/style/scss/react-pro-sidebar.scss'
import 'react-pro-sidebar/dist/css/styles.css';

function Sidebar(props) {
    const { setCollapse, collapse, toggle, setToggle } = props;
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 600px)")
    collapse && !isMobile ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');

    return (
        <ProSidebar className='proSidebar' collapsed={collapse} toggled={toggle} breakPoint='md' image='/sidebar/sidebar-bg.jpg'>
            <SidebarHeader className='proSidebar__header'>
                <img src='/sidebar/logo.png' alt='logo' className={!collapse ? 'proSidebar__header__logo' : 'proSidebar__header__logo img-size-75'} />
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape='circle'>
                    <MenuItem icon={<Icon icon="flat-color-icons:home" fontSize='20px' />} onClick={() => { navigate("/") }}>Home</MenuItem>
                    <MenuItem icon={<Icon icon="noto:water-wave" fontSize='20px' />} onClick={() => { navigate("/wave") }}>WaveMe</MenuItem>
                    <MenuItem icon={<Icon icon="flat-color-icons:picture" fontSize='20px' />} onClick={() => { navigate("/mint") }}>MintNFT</MenuItem>
                    <SubMenu title="NFT Game" icon={<Icon icon="emojione:crossed-swords" fontSize='20px' />} className="react-slidedown pro-inner-list-item">
                        <MenuItem icon={<Icon icon="noto-v1:video-game" fontSize='20px' />} onClick={() => { navigate("/nftch") }}>Choose Character</MenuItem>
                        <MenuItem icon={<Icon icon="twemoji:crossed-swords" fontSize='20px' />} onClick={() => { navigate("/nftbattle") }}>Battle</MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Flex flexDirection={collapse ? 'column' : 'row'} justifyContent='center' alignItems='center' p='20px' mr={!collapse && '30px'}>
                    <Link href="https://github.com/ninjadev106" mr={!collapse && '10px'} mb={collapse && '10px'}><Icon icon="bi:github" color="white" width="25" height="25" /></Link>
                    <Link href="https://www.linkedin.com/in/haiquan-jin-86285b13a" mr={!collapse && '10px'} mb={collapse && '10px'}><Icon icon="bi:linkedin" color="white" width="25" height="25" /></Link>
                    {/* <Link href="https://keithy.vercel.app" mr={!collapse && '10px'} mb={collapse && '10px'}><Icon icon="ic:round-personal-video" color="white" width="25" height="25" /></Link> */}
                    <Link href="https://join.skype.com/invite/BC75Bz6oT8gA" mr={!collapse && '10px'} mb={collapse && '10px'}><Icon icon="bi:skype" color="white" width="25" height="25" /></Link>
                    {/* <Link href="https://t.me/KeithyMin"><Icon icon="cib:telegram" color="white" width="25" height="25" /></Link> */}
                    {collapse && (
                        <Button className='proSidebar__collapseBtn relative' onClick={() => setCollapse(!collapse)}>
                            <lottie-player
                                autoplay
                                loop
                                mode="normal"
                                src="https://assets1.lottiefiles.com/datafiles/9P0TTCFMNh7ejB7/data.json"
                                style={{ width: '30px' }}
                            />
                        </Button>
                    )}
                </Flex>
            </SidebarFooter>
            {!collapse && (
                <Button className='proSidebar__collapseBtn' onClick={() => isMobile ? setToggle(false) : setCollapse(!collapse)}>
                    <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        src="https://assets7.lottiefiles.com/datafiles/5uaVMFvoH3yRSoC/data.json"
                        style={{ width: '30px' }}
                    />
                </Button>
            )}
        </ProSidebar >
    )
}

export default Sidebar