"use client";

import { Box, Container, Grid, Paper, Typography } from "@mui/material";

export default function GuestList({ guestList }) {
    // guestList가 undefined일 경우 빈 배열로 초기화
    const safeGuestList = guestList || [];

    // guestList가 비어 있는 경우를 처리
    if (safeGuestList.length === 0) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    게스트 리스트
                </Typography>
                <Typography>게스트 리스트가 없습니다.</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                게스트 리스트
            </Typography>
            <Grid container spacing={2}>
                {safeGuestList.map((k) => (
                    <Grid item xs={12} key={k.id}>
                        <Paper>
                            <Box p={2}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item>
                                        <Typography>{k.name}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>{k.email}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>{k.subject}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>{k.regdate.substring(0, 10)}</Typography>
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
