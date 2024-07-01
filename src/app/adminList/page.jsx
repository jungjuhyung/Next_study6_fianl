"use client";

import { Box, Container, Grid, Paper, Typography } from "@mui/material";

export default function AdminList({ adminList }) {
    // adminList가 undefined일 경우 빈 배열로 초기화
    const safeAdminList = adminList || [];

    // adminList가 비어 있는 경우를 처리
    if (safeAdminList.length === 0) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    관리자 리스트
                </Typography>
                <Typography>관리자 리스트가 없습니다.</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                관리자 리스트
            </Typography>
            <Grid container spacing={2}>
                {safeAdminList.map((k) => (
                    <Grid item xs={12} key={k.id}>
                        <Paper>
                            <Box p={2}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item>
                                        <Typography>{k.id}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>{k.email}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>{k.created_at.substring(0, 10)}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>{k.last_login}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
