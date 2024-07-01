"use client";

import { MenuContext } from "@/stores/StoreContext";
import { Avatar, Button, FormControl, Stack, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Login = observer(() => {
    // useContext 훅으로 MobX Store 가져오기 
    const menuStore = useContext(MenuContext);
    const API_URL = "/api/login";
    const [uvo, setUvo] = useState({ id: '', password: '' });
    const router = useRouter();

    useEffect(() => {
        menuStore.loadToken();
        if (menuStore.isAuthenticated) {
            router.push("/main");
        } else {
            // 로그인 성공 후 개인정보 가지고 서버로 다시 가기
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            if (token) {
                menuStore.setToken(token);
                // 개인정보를 받기 위해서 
                axios.get('/api/userInfo', { params: { token } })
                    .then(response => {
                        // 개인정보
                        menuStore.setUserInfo(response.data);
                        router.push("/main");
                    })
                    .catch(error => {
                        console.error("Error fetching user info:", error);
                    });
            }
        }
    }, [router, menuStore]);

    async function login() {
        try {
            // axios 서버로 정보 보내기
            const response = await axios.post(API_URL, {
                id: uvo.id,
                password: uvo.password
            });
            // token 을 로컬 스토리지에 저장
            if (response.data.token) {
                menuStore.setToken(response.data.token);
                menuStore.setUserInfo(response.data.userDetails);
                // 성공 후 메인 페이지로 리다이렉트
                router.push("/main");
            }
        } catch (error) {
            alert("로그인 실패");
            setUvo({ id: "", password: "" });
        }
    }

    function changeUvo(e) {
        setUvo({ ...uvo, [e.target.name]: e.target.value });
    }

    function handleKakaoLogin() {
        window.location.href = "http://43.201.146.72:8080/oauth2/authorization/kakao";
    }

    function handleNaverLogin() {
        window.location.href = "http://43.201.146.72:8080/oauth2/authorization/naver";
    }

    function handleGoogleLogin() {
        window.location.href = "http://43.201.146.72:8080/oauth2/authorization/google";
    }

    return (
        <div style={{ width: '80%', margin: '100px auto', paddingTop: '20px', textAlign: 'center' }}>
            <FormControl>
                <Stack direction="column" spacing={1} alignItems='center'>
                    <Avatar sx={{ bgcolor: green[500], marginBottom: '20px' }} />
                    <TextField 
                        type='text' 
                        label='ID' 
                        name='id' 
                        fullWidth 
                        autoComplete="off" 
                        onChange={changeUvo} 
                        value={uvo.id}
                    />
                    <TextField 
                        type='password' 
                        label='PW' 
                        name='password' 
                        fullWidth 
                        autoComplete="off" 
                        onChange={changeUvo} 
                        value={uvo.password}
                    />
                    <Button fullWidth variant='contained' onClick={login}>일반 로그인</Button>
                    <Button fullWidth variant='contained' onClick={handleKakaoLogin} style={{ backgroundColor: '#FFEB3B' }}>카카오 로그인</Button>
                    <Button fullWidth variant='contained' onClick={handleNaverLogin} style={{ backgroundColor: '#03C75A' }}>네이버 로그인</Button>
                    <Button fullWidth variant='contained' onClick={handleGoogleLogin} style={{ backgroundColor: '#4285F4' }}>구글 로그인</Button>
                </Stack>
            </FormControl>
        </div>
    );
});

export default Login;
