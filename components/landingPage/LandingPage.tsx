"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DEFAULT_SAMPLE_PORTRAIT,
  DEFAULT_TRANSFORMED_RESULT,
} from "@/data/hairstyles";

/**
 * LandingPage 컴포넌트
 * 
 * FaceOff AI 헤어스타일 가상 피팅 서비스의 메인 랜딩페이지 컴포넌트입니다.
 * - 헤더(GNB): 로고, 네비게이션 메뉴, 로그인 모달 트리거, 스튜디오 이동 버튼
 * - 히어로 섹션(Hero): 메인 슬로건, 핵심 설명, 주요 CTA, 비포/애프터 미리보기 카드
 * - 이용 방법(How It Works): 3단계 이용 안내
 * - 핵심 기능(Features): AI 조화율 리포트, 뉴럴 볼륨, 입체 톤 리컬러링 등 소개
 * - 최종 CTA 및 푸터: 스튜디오 유도 및 서비스 정보
 * - 로그인 모달: 사용자 로그인 팝업 (추후 Auth 연동용)
 */
export default function LandingPage() {
  // 로그인 모달 열림/닫힘 상태 관리
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  
  // 로그인 폼 입력 필드 상태 관리
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFeedback, setLoginFeedback] = useState<string>("");

  // 간편 로그인 폼 제출 처리 핸들러
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginFeedback("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }
    // 임시 성공 처리: 실제 서비스 연동 시 Supabase Auth 등으로 연결됩니다.
    setLoginFeedback("로그인 성공! 스튜디오로 이동합니다...");
    setTimeout(() => {
      window.location.href = "/studio";
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#131315] text-[#e4e2e4] antialiased selection:bg-[#c6ff35] selection:text-[#151f00]">
      {/* ==========================================
          [GNB 헤더] 로고 및 네비게이션, 로그인 CTA
      ========================================== */}
      <header className="sticky top-0 w-full z-40 bg-[#131315]/85 backdrop-blur-xl border-b border-[#353437]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* 브랜드 로고 */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#2a2a2c] border border-[#353437] flex items-center justify-center shadow-inner group-hover:border-[#c6ff35]/50 transition-colors">
              <span className="material-symbols-outlined text-[22px] text-[#c6ff35]">
                auto_fix_high
              </span>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-[#e4e2e4]">
                FaceOff <span className="text-[#c6ff35]">AI</span>
              </span>
              <span className="block text-[10px] text-[#a8a7af] -mt-0.5">
                헤어스타일 가상 피팅 스튜디오
              </span>
            </div>
          </Link>

          {/* 중앙 네비게이션 링크 (데스크톱) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#a8a7af]">
            <a href="#how-it-works" className="hover:text-[#c6ff35] transition-colors">
              이용 방법
            </a>
            <a href="#features" className="hover:text-[#c6ff35] transition-colors">
              핵심 기능
            </a>
            <a href="#preview" className="hover:text-[#c6ff35] transition-colors">
              스타일 갤러리
            </a>
          </nav>

          {/* 우측 로그인 & 스튜디오 진입 액션 */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#1f1f21] hover:bg-[#2a2a2c] text-[#e4e2e4] hover:text-[#c6ff35] border border-[#353437] text-xs font-semibold transition-all"
            >
              로그인
            </button>
            <Link
              href="/studio"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#c6ff35] text-[#151f00] hover:bg-[#d4ff59] text-xs font-bold shadow-[0_0_16px_rgba(198,255,53,0.3)] transition-all"
            >
              <span>스튜디오 시작하기</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ==========================================
          [Hero 섹션] 첫인상을 사로잡는 메인 비주얼
      ========================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* 은은한 배경 네온 조명 효과 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#c6ff35]/10 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* 좌측: 타이틀 및 핵심 가치 전달 */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* 트렌드 뱃지 */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1f1f21] border border-[#c6ff35]/30 text-xs font-semibold text-[#c6ff35] mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#c6ff35] animate-ping"></span>
                <span>2026 차세대 AI 뷰티 테크 피팅 엔진</span>
              </div>

              {/* 메인 헤드라인 */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#e4e2e4] leading-[1.15] mb-6">
                미용실 가기 전, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c6ff35] via-[#e2ff85] to-[#ffffff]">
                  단 3초 만에 확인하는
                </span> <br />
                인생 헤어스타일
              </h1>

              {/* 서브 카피 */}
              <p className="text-base sm:text-lg text-[#a8a7af] leading-relaxed max-w-xl mb-8">
                내 얼굴 사진 한 장으로 5가지 인기 헤어스타일과 맞춤 컬러를 실시간 가상 피팅해보세요.
                68개 안면 랜드마크 분석으로 실패 없는 헤어 변신을 약속합니다.
              </p>

              {/* 메인 CTA 버튼 그룹 */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link
                  href="/studio"
                  className="min-h-[52px] px-7 rounded-xl bg-[#c6ff35] text-[#151f00] font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(198,255,53,0.35)] hover:bg-[#d4ff59] hover:shadow-[0_0_32px_rgba(198,255,53,0.5)] active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
                  <span>지금 무료로 피팅해보기</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="min-h-[52px] px-6 rounded-xl bg-[#1f1f21] hover:bg-[#2a2a2c] text-[#e4e2e4] font-semibold text-sm border border-[#353437] flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#c6ff35]">login</span>
                  <span>로그인하고 룩북 저장</span>
                </button>
              </div>

              {/* 신뢰 지표 리본 */}
              <div className="mt-10 pt-6 border-t border-[#2a2a2c] flex items-center gap-6 text-xs text-[#a8a7af]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#c6ff35] text-[18px]">verified</span>
                  <span>얼굴형 98% 조화율 분석</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#c6ff35] text-[18px]">bolt</span>
                  <span>3초 실시간 합성 렌더링</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#c6ff35] text-[18px]">lock</span>
                  <span>사진 안전 보호 (로컬 처리)</span>
                </div>
              </div>
            </div>

            {/* 우측: 실제 Stitch Before/After 쇼케이스 카드 */}
            <div className="lg:col-span-5 flex justify-center" id="preview">
              <div className="relative w-full max-w-[420px] rounded-3xl bg-[#1b1b1d] border border-[#2a2a2c] p-4 shadow-2xl">
                {/* 상단 뱃지 헤더 */}
                <div className="flex items-center justify-between mb-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c6ff35]"></span>
                    <span className="text-xs font-bold text-[#e4e2e4]">AI 가상 피팅 결과 비교</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#c6ff35] bg-[#2a2a2c] px-2 py-0.5 rounded-full border border-[#c6ff35]/20">
                    조화율 98%
                  </span>
                </div>

                {/* 2단 나란히 비교 이미지 (비포 vs 애프터) */}
                <div className="grid grid-cols-2 gap-2.5 rounded-2xl overflow-hidden bg-[#0e0e10] p-1.5 border border-[#353437]">
                  {/* Before */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <img
                      src={DEFAULT_SAMPLE_PORTRAIT}
                      alt="Before 원본 인물"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-white">
                      BEFORE (클래식)
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#c6ff35]/40">
                    <img
                      src={DEFAULT_TRANSFORMED_RESULT}
                      alt="After 웨이비 보브 변환"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#131315]/80 backdrop-blur-md text-[10px] font-bold text-[#c6ff35]">
                      AFTER (웨이비 보브)
                    </div>
                  </div>
                </div>

                {/* 카드 하단 메타정보 */}
                <div className="mt-3.5 p-3 rounded-xl bg-[#1f1f21] border border-[#353437]/50 text-xs">
                  <div className="flex justify-between text-[#e4e2e4] font-semibold mb-1">
                    <span>웨이비 보브 · 카라멜 글레이즈</span>
                    <span className="text-[#c6ff35]">볼륨 +32%</span>
                  </div>
                  <p className="text-[11px] text-[#a8a7af]">
                    광대와 턱선을 부드럽게 감싸 얼굴형이 갸름하고 세련되어 보입니다.
                  </p>
                </div>

                {/* 즉시 체험하기 링크 버튼 */}
                <Link
                  href="/studio"
                  className="mt-3 w-full py-2.5 rounded-xl bg-[#2a2a2c] hover:bg-[#353437] text-[#c6ff35] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#c6ff35]/20 transition-all"
                >
                  <span>이 스타일 직접 피팅해보기</span>
                  <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          [3단계 이용 방법 (How It Works)]
      ========================================== */}
      <section id="how-it-works" className="py-20 bg-[#161619] border-y border-[#2a2a2c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#c6ff35] tracking-widest uppercase block mb-2">
              SIMPLE 3 STEPS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#e4e2e4] tracking-tight">
              누구나 손쉽게, 단 3단계로 완성
            </h2>
            <p className="text-sm text-[#a8a7af] mt-3">
              복잡한 프로그램 없이 웹 브라우저에서 바로 사진을 올리고 원하는 스타일을 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#1b1b1d] border border-[#2a2a2c] hover:border-[#c6ff35]/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2c] border border-[#353437] flex items-center justify-center text-[#c6ff35] mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[26px]">add_a_photo</span>
              </div>
              <span className="text-xs font-extrabold text-[#c6ff35] tracking-widest uppercase">STEP 01</span>
              <h3 className="text-lg font-bold text-[#e4e2e4] mt-1 mb-2">정면 사진 업로드</h3>
              <p className="text-xs text-[#a8a7af] leading-relaxed">
                정면 얼굴 사진을 등록하면 AI가 68개의 안면 랜드마크를 자동 감지하여 헤어라인과 얼굴형을 정밀 분석합니다.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#1b1b1d] border border-[#2a2a2c] hover:border-[#c6ff35]/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2c] border border-[#353437] flex items-center justify-center text-[#c6ff35] mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[26px]">content_cut</span>
              </div>
              <span className="text-xs font-extrabold text-[#c6ff35] tracking-widest uppercase">STEP 02</span>
              <h3 className="text-lg font-bold text-[#e4e2e4] mt-1 mb-2">헤어 & 컬러 선택</h3>
              <p className="text-xs text-[#a8a7af] leading-relaxed">
                웨이비 보브, 클래식 보브, 컬리 볼륨 등 5대 인기 헤어스타일과 4대 컬러 스와치를 터치 한 번으로 고릅니다.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#1b1b1d] border border-[#2a2a2c] hover:border-[#c6ff35]/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2c] border border-[#353437] flex items-center justify-center text-[#c6ff35] mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[26px]">compare</span>
              </div>
              <span className="text-xs font-extrabold text-[#c6ff35] tracking-widest uppercase">STEP 03</span>
              <h3 className="text-lg font-bold text-[#e4e2e4] mt-1 mb-2">비포/애프터 비교 & 저장</h3>
              <p className="text-xs text-[#a8a7af] leading-relaxed">
                실시간 분할 드래그 슬라이더로 원본과 피팅 결과를 좌우로 비교하고, 마음에 드는 고화질 사진을 다운로드하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          [핵심 기능 특장점 (Features)]
      ========================================== */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#c6ff35] tracking-widest uppercase block mb-2">
              WHY FACEOFF AI
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#e4e2e4] tracking-tight">
              자연스럽고 정교한 가상 피팅 기술
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-5 rounded-2xl bg-[#1b1b1d] border border-[#2a2a2c]">
              <span className="material-symbols-outlined text-[#c6ff35] text-[28px] mb-3">
                insights
              </span>
              <h4 className="text-base font-bold text-[#e4e2e4] mb-1">98% 조화율 리포트</h4>
              <p className="text-xs text-[#a8a7af] leading-relaxed">
                광대, 이마, 턱선 곡선과 헤어 볼륨의 매칭 지수를 수치화하여 객관적인 스타일 가이드를 제시합니다.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 rounded-2xl bg-[#1b1b1d] border border-[#2a2a2c]">
              <span className="material-symbols-outlined text-[#c6ff35] text-[28px] mb-3">
                waves
              </span>
              <h4 className="text-base font-bold text-[#e4e2e4] mb-1">뉴럴 볼륨 리프팅</h4>
              <p className="text-xs text-[#a8a7af] leading-relaxed">
                평면 합성이 아닌 두상 입체 곡면을 계산하여 정수리와 사이드 볼륨을 실제 펌을 한 듯 자연스럽게 연출합니다.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 rounded-2xl bg-[#1b1b1d] border border-[#2a2a2c]">
              <span className="material-symbols-outlined text-[#c6ff35] text-[28px] mb-3">
                palette
              </span>
              <h4 className="text-base font-bold text-[#e4e2e4] mb-1">입체 톤 리컬러링</h4>
              <p className="text-xs text-[#a8a7af] leading-relaxed">
                카라멜 글레이즈, 허니 골드 등 조명에 반응하는 하이라이트 텍스처를 구현하여 실감 나는 염색 톤을 미리 봅니다.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 rounded-2xl bg-[#1b1b1d] border border-[#2a2a2c]">
              <span className="material-symbols-outlined text-[#c6ff35] text-[28px] mb-3">
                devices
              </span>
              <h4 className="text-base font-bold text-[#e4e2e4] mb-1">완벽한 반응형 웹</h4>
              <p className="text-xs text-[#a8a7af] leading-relaxed">
                스마트폰 모바일 화면부터 데스크톱 와이드 모니터까지 최적화된 인터페이스로 언제 어디서나 이용 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          [하단 최종 CTA 섹션]
      ========================================== */}
      <section className="py-16 bg-gradient-to-b from-[#161619] to-[#131315] border-t border-[#2a2a2c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#e4e2e4] mb-4">
            나에게 가장 잘 어울리는 헤어스타일, <br />
            <span className="text-[#c6ff35]">지금 바로 스튜디오에서 확인해보세요</span>
          </h2>
          <p className="text-sm text-[#a8a7af] mb-8">
            회원가입 없이도 기본 모델로 즉시 체험 가능하며, 내 사진으로 무제한 피팅할 수 있습니다.
          </p>
          <div className="flex justify-center">
            <Link
              href="/studio"
              className="min-h-[54px] px-8 rounded-xl bg-[#c6ff35] text-[#151f00] font-bold text-base flex items-center gap-2 shadow-[0_0_24px_rgba(198,255,53,0.35)] hover:bg-[#d4ff59] transition-all"
            >
              <span>스튜디오 입장하기</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          [푸터]
      ========================================== */}
      <footer className="w-full border-t border-[#1f1f21] py-8 bg-[#131315] text-center text-xs text-[#a8a7af]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 FaceOff AI Studio. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="hover:text-[#c6ff35]">이용안내</a>
            <a href="#features" className="hover:text-[#c6ff35]">기술소개</a>
            <button type="button" onClick={() => setIsLoginModalOpen(true)} className="hover:text-[#c6ff35]">
              로그인
            </button>
          </div>
        </div>
      </footer>

      {/* ==========================================
          [로그인 / 회원가입 팝업 모달]
      ========================================== */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#1b1b1d] border border-[#2a2a2c] p-6 sm:p-8 shadow-2xl">
            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={() => {
                setIsLoginModalOpen(false);
                setLoginFeedback("");
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[#a8a7af] hover:text-[#e4e2e4] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* 모달 헤더 */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2c] border border-[#353437] flex items-center justify-center mx-auto mb-3 text-[#c6ff35]">
                <span className="material-symbols-outlined text-[24px]">lock</span>
              </div>
              <h3 className="text-xl font-bold text-[#e4e2e4]">FaceOff AI 로그인</h3>
              <p className="text-xs text-[#a8a7af] mt-1">
                로그인하고 나만의 가상 피팅 룩북을 저장하세요.
              </p>
            </div>

            {/* 로그인 폼 */}
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="block text-xs font-medium text-[#a8a7af] mb-1">
                  이메일 주소
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#131315] border border-[#353437] text-sm text-[#e4e2e4] focus:outline-none focus:border-[#c6ff35] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a8a7af] mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#131315] border border-[#353437] text-sm text-[#e4e2e4] focus:outline-none focus:border-[#c6ff35] transition-colors"
                />
              </div>

              {loginFeedback && (
                <p className="text-xs text-[#c6ff35] text-center font-medium mt-1">
                  {loginFeedback}
                </p>
              )}

              {/* 로그인 제출 버튼 */}
              <button
                type="submit"
                className="w-full min-h-[46px] rounded-xl bg-[#c6ff35] text-[#151f00] font-bold text-sm flex items-center justify-center gap-1.5 mt-2 hover:bg-[#d4ff59] transition-all shadow-[0_0_15px_rgba(198,255,53,0.3)]"
              >
                <span>로그인하고 스튜디오 입장</span>
                <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
              </button>
            </form>

            {/* 간편 로그인 및 게스트 입장 */}
            <div className="mt-5 pt-5 border-t border-[#2a2a2c] flex flex-col gap-2.5 text-center text-xs">
              <Link
                href="/studio"
                onClick={() => setIsLoginModalOpen(false)}
                className="text-[#a8a7af] hover:text-[#c6ff35] transition-colors underline"
              >
                로그인 없이 게스트로 먼저 체험해보기 →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
