/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    swcMinify:true,
    async rewrites(){
        return[
            {
            // /api/login 으로 시작되는 모든 요청 Spring Boot의 /api/login 으로 리 라이트 된다.
            source : "/api/login",
            destination : "http://localhost:8080/api/login"
            },
            {
                // /api/login 으로 시작되는 모든 요청 Spring Boot의 /api/login 으로 리 라이트 된다.
                source : "/api/logout",
                destination : "http://localhost:8080/api/logout"
            },
            {
                // /api/login 으로 시작되는 모든 요청 Spring Boot의 /api/login 으로 리 라이트 된다.
                source : "/api/guest",
                destination : "http://localhost:8080/api/guest"
            },
            {
                // /api/login 으로 시작되는 모든 요청 Spring Boot의 /api/login 으로 리 라이트 된다.
                source : "/api/admin",
                destination : "http://localhost:8080/api/admin"
            },
            {
                // /api/login 으로 시작되는 모든 요청 Spring Boot의 /api/login 으로 리 라이트 된다.
                source : "/api/userInfo",
                destination : "http://localhost:8080/api/userInfo"
            },
        ];
    },
};

export default nextConfig;
