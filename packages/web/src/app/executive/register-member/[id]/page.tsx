"use client";

// 배포용 not found 페이지 (시작) - 회원 등록
import NotFound from "@sparcs-clubs/web/app/not-found";

const TemporaryNotFound = () => <NotFound />;

export default TemporaryNotFound;
// 배포용 not found 페이지 (끝)

// import React, { useEffect, useState } from "react";

// import Custom404 from "@sparcs-clubs/web/app/not-found";
// import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
// import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
// import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";

// import ExecutiveRegisterMemberDetail from "@sparcs-clubs/web/features/executive/register-member/frames/ExecutiveRegisterMemberDetailFrame";

// const RegisterMember = () => {
//   const { isLoggedIn, login, profile } = useAuth();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (isLoggedIn !== undefined || profile !== undefined) {
//       setLoading(false);
//     }
//   }, [isLoggedIn, profile]);

//   if (loading) {
//     return <AsyncBoundary isLoading={loading} isError />;
//   }

//   if (!isLoggedIn) {
//     return <LoginRequired login={login} />;
//   }

//   if (profile?.type !== "executive") {
//     return <Custom404 />;
//   }

//   return <ExecutiveRegisterMemberDetail />;
// };

// export default RegisterMember;
