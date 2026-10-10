import type { Metadata } from "next";
import "./globals.css";

// 웹 페이지의 기본 메타데이터 설정 (검색엔진 최적화 및 브라우저 탭 타이틀)
export const metadata: Metadata = {
  title: "AI 헤어스타일 가상 체험 스튜디오 | FaceOff",
  description: "내 얼굴 사진으로 다양한 헤어스타일을 실시간 가상 피팅하고 비교해보는 AI 뷰티 테크 스튜디오",
};

// 최상위 레이아웃 컴포넌트: 전체 페이지에 공통 스타일 및 외부 폰트를 적용합니다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark h-full">
      <head>
        {/* 구글 머티리얼 심볼 아이콘 폰트 연동 (스튜디오 버튼 및 뱃지 아이콘용) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        {/* 구글 폰트: Plus Jakarta Sans(영문/숫자 타이틀) & Noto Sans KR(한글 본문) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* 기본 다크 테마 배경(#131315) 및 텍스트 컬러 지정, 텍스트 드래그 선택 시 네온 라임 하이라이트 */}
      <body className="min-h-full flex flex-col bg-[#131315] text-[#e4e2e4] antialiased selection:bg-[#c6ff35] selection:text-[#151f00]">
        {children}
      </body>
    </html>
  );
}
