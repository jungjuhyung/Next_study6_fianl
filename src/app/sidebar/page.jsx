"use client";

import { MenuContext } from "@/stores/StoreContext";
import { AccountCircle } from "@mui/icons-material";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const drawerWidth = 240;

// 메뉴 이름 상수 정의
const MENU = {
    USER_LIST: "userlist",
    GUEST_LIST: "guestlist",
    ADMIN_LIST: "adminlist"
};

function Sidebar() {
    // useContext 훅으로 MobX Store 가져오기 
    const menuStore = useContext(MenuContext);

    // 메뉴 클릭시 선택된 메뉴를 상태관리에서 업데이트 
    const handleMenuClick = async (menu) => {
        menuStore.setSelectedMenu(menu);
        try {
            let response;
            if (menu === MENU.GUEST_LIST) {
                response = await axios.get("/api/guest", {
                    headers: {
                        Authorization: `Bearer ${menuStore.token}`
                    }
                });
                menuStore.setGuestList(response.data);
            } else if (menu === MENU.ADMIN_LIST) {
                response = await axios.get("/api/admin", {
                    headers: {
                        Authorization: `Bearer ${menuStore.token}`
                    }
                });
                menuStore.setAdminList(response.data);
            }
        } catch (error) {
            console.error(`Error fetching ${menu}:`, error);
            alert(`${menu} 데이터를 가져오는데 실패했습니다.`);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItemButton onClick={() => handleMenuClick(MENU.USER_LIST)}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="User List" />
                </ListItemButton>
                <ListItemButton onClick={() => handleMenuClick(MENU.GUEST_LIST)}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="Guest List" />
                </ListItemButton>
                <ListItemButton onClick={() => handleMenuClick(MENU.ADMIN_LIST)}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="Admin List" />
                </ListItemButton>
            </List>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default observer(Sidebar);
