import { makeAutoObservable } from "mobx";

class MenuStore {
    selectedMenu = "userdetail";  // 선택된 메뉴
    sidebarOpen = true;           // 사이드바 열림/닫힘 상태   
    isAuthenticated = false;      // 사용자 인증 상태
    token = null;                 // 사용자 토큰
    guestList = [];               // 서버에서 가져온 Guest List
    adminList = [];               // 서버에서 가져온 admin List
    userInfo = {
        id: '',
        name: '',
        email: '',
        phone: '',
        provider: '',
        kakao: '',
        naver: '',
        google: '', 
    };

    constructor() {
        // MobX 스토어를 자동으로 관찰 가능하게 설정
        makeAutoObservable(this);
    }

    // 메뉴 변경 
    setSelectedMenu(menu) {
        this.selectedMenu = menu;
    }

    // 사이드바 열림/닫힘 상태 변경 (toggle)
    setSidebarOpen() {
        this.sidebarOpen = !this.sidebarOpen;
    }

    // 인증 상태 변경 
    setAuthenticated(authenticated) {
        this.isAuthenticated = authenticated;
    }

    // 토큰 설정 
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem("token", token);
            this.setAuthenticated(true);
        } else {
            localStorage.removeItem("token");
            this.setAuthenticated(false);
        }
    }

    // 로컬 스토리지에서 토큰 가져오기 
    loadToken() {
        const token = localStorage.getItem("token");
        this.setToken(token);
    }

    // Guest List 설정 
    setGuestList(guestList) {
        this.guestList = guestList;
    }

    // Admin List 설정 
    setAdminList(adminList) {
        this.adminList = adminList;
    }

    // User Info 설정 
    setUserInfo(userInfo) {
        this.userInfo = userInfo;
    }
}

const menuStore = new MenuStore(); // 스토어 인스턴스 생성 
export default menuStore;
