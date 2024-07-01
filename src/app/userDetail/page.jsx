"use client";

import { MenuContext } from "@/stores/StoreContext";
import { Container, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const UserDetail = observer(() => {
    const menuStore = useContext(MenuContext);

    // menuStore.userInfo가 undefined일 경우를 대비한 초기화
    const userInfo = menuStore.userInfo || {};
    const { id, name, email, provider, phone } = userInfo;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                유저 정보
            </Typography>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <List>
                    <ListItem>
                        <ListItemText primary="ID" secondary={id || "정보 없음"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Name" secondary={name || "정보 없음"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Email" secondary={email || "정보 없음"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Phone" secondary={phone || "정보 없음"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Provider" secondary={provider || "정보 없음"} />
                    </ListItem>
                </List>
            </Paper>
        </Container>
    );
});

export default UserDetail;
