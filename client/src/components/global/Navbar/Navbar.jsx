import React, {useEffect, useState} from 'react';
import TopBar from "./TopBar/TopBar";
import SideBar from "./SideBar/SideBar";

function Navbar() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const isDesk = screenWidth > 768
    const [burgerOpened,setBurgerOpened] = useState(isDesk)

    useEffect(() => {
        if(burgerOpened) document.body.classList.add('withSidebar_opened')
        else document.body.classList.remove('withSidebar_opened')
    }, [burgerOpened]);

    const onToggleBurger = () => setBurgerOpened(prevState => !prevState)
    const onCloseBurger = () => setBurgerOpened(false)

    return (
        <>
            <TopBar
                burgerOpened={burgerOpened}
                onToggleBurger={onToggleBurger}
            />
            <SideBar
                onCloseBurger={onCloseBurger}
                burgerOpened={burgerOpened}
                isMobile={!isDesk}
            />
        </>
    );
}

export default Navbar;