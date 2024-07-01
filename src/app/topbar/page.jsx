"use client";

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MenuContext } from "@/stores/StoreContext";
import { observer } from "mobx-react-lite";

function TopBar() {
    // useContext 훅으로 MobX Store 가져오기 
    const menuStore = useContext(MenuContext);
    const router = useRouter();

    const handleLogout = async () => {
        await axios.post("/api/logout", {}, {
            headers: {
                "Authorization": `Bearer ${menuStore.token}`
            }
        });
        menuStore.setToken(null);
        router.push("/");
    };

    const handleDrawerToggle = () => {
        // 열려있으면 닫치고 닫쳐있으면 열리고 
        menuStore.setSidebarOpen(!menuStore.sidebarOpen);
    };

    return (
        // 사이드바 크기 조절 
        <AppBar position="fixed" sx={{ width: `calc(100% - ${menuStore.sidebarOpen ? "240px" : "0px"})`, ml: `${menuStore.sidebarOpen ? "240px" : "0px"}` }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Dash Board
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default observer(TopBar);
