"use client";

import { Box, Button, CssBaseline, Toolbar } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import TopBar from "../topbar/page";
import Sidebar from "../sidebar/page";
import UserDetail from "../userDetail/page";
import GuestList from "../guestList/page";
import AdminList from "../adminList/page";
import { observer } from "mobx-react-lite";
import { MenuContext } from "@/stores/StoreContext";

function Main() {
    // useContext 훅으로 MobX Store 가져오기 
    const menuStore = useContext(MenuContext);
    const router = useRouter();

    useEffect(() => {
        if (!menuStore.isAuthenticated) {
            router.push("/");
        }
    }, [router, menuStore]);

    // 선택된 메뉴에 따라 다른 컴포넌트를 임포트해서 렌더링 하기 
    const renderContent = () => {
        switch (menuStore.selectedMenu) {
            case "userdetail":
                return <UserDetail />;
            case "guestlist":
                return <GuestList guestList={menuStore.guestList} />;
            case "adminlist":
                return <AdminList adminList={menuStore.adminList} />;
            default:
                return <UserDetail />;
        }
    };

    return (
        <>
            <CssBaseline />
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <TopBar />
                <div style={{ display: 'flex', flex: 1 }}>
                    {menuStore.sidebarOpen && <Sidebar />}
                    <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff', marginTop: "100px" }}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default observer(Main);
