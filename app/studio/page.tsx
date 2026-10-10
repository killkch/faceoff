"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  HAIRSTYLE_PRESETS,
  HAIR_COLOR_PRESETS,
  DEFAULT_SAMPLE_PORTRAIT,
  DEFAULT_TRANSFORMED_RESULT,
  HairstyleItem,
  HairColorItem,
} from "@/data/hairstyles";

// ==========================================
// [로그인 후 전용 워크스페이스] AI 헤어스타일 가상 체험 스튜디오
// ==========================================
export default function HairstyleStudioWorkspace() {
  // ------------------------------------------
  // [1] 상태(State) 관리
  // ------------------------------------------
  // 1. 현재 사용자 얼굴 사진 (기본값: Stitch 고해상도 샘플 모델)
  const [userPortrait, setUserPortrait] = useState<string>(DEFAULT_SAMPLE_PORTRAIT);
  
  // 2. 사용자가 선택한 헤어스타일 및 컬러 상태
  const [selectedStyle, setSelectedStyle] = useState<HairstyleItem>(HAIRSTYLE_PRESETS[0]);
  const [selectedColor, setSelectedColor] = useState<HairColorItem>(HAIR_COLOR_PRESETS[0]);

  // 3. AI 변환 생성 및 진행 상태
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [hasTransformed, setHasTransformed] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string>(DEFAULT_TRANSFORMED_RESULT);

  // 4. 뷰파인더 뷰 모드 및 가이드라인 설정
  const [showGuideOverlay, setShowGuideOverlay] = useState<boolean>(true); // 얼굴 랜드마크 가이드
  const [viewMode, setViewMode] = useState<"SPLIT" | "RESULT" | "ORIGINAL">("SPLIT"); // 비교 뷰 모드
  const [sliderPosition, setSliderPosition] = useState<number>(50); // Before/After 슬라이더 위치 (0~100%)
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false); // 슬라이더 드래그 중 여부

  // 파일 업로드 input 요소 참조
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 비교 캔버스 컨테이너 참조
  const containerRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------
  // [2] 이미지 파일 업로드 핸들러
  // ------------------------------------------
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일(JPG, PNG, WEBP 등)만 업로드할 수 있습니다.");
        return;
      }

      // 로컬 브라우저 메모리에 안전하게 로드
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const resultUrl = loadEvent.target?.result as string;
        if (resultUrl) {
          setUserPortrait(resultUrl);
          setHasTransformed(false); // 새 사진 등록 시 변환 상태 초기화
          setShowGuideOverlay(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 기본 샘플 모델 사진으로 초기화
  const handleResetToSample = () => {
    setUserPortrait(DEFAULT_SAMPLE_PORTRAIT);
    setSelectedStyle(HAIRSTYLE_PRESETS[0]);
    setSelectedColor(HAIR_COLOR_PRESETS[0]);
    setHasTransformed(false);
    setResultImage(DEFAULT_TRANSFORMED_RESULT);
    setShowGuideOverlay(true);
    setSliderPosition(50);
    setViewMode("SPLIT");
  };

  // ------------------------------------------
  // [3] AI 가상 헤어스타일 적용 시뮬레이션
  // ------------------------------------------
  const handleApplyHairstyle = () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setGenerationProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsGenerating(false);
        setHasTransformed(true);
        setShowGuideOverlay(false);
        setResultImage(selectedStyle.resultImageUrl || DEFAULT_TRANSFORMED_RESULT);
      }
    }, 120);
  };

  // ------------------------------------------
  // [4] Before/After 분할 슬라이더 드래그 핸들러
  // ------------------------------------------
  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    const clamped = Math.max(5, Math.min(95, percentage));
    setSliderPosition(clamped);
  };

  const handleMouseDown = () => setIsDraggingSlider(true);
  const handleTouchStart = () => setIsDraggingSlider(true);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDraggingSlider(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDraggingSlider) handlePointerMove(e.clientX);
    };
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDraggingSlider && e.touches[0]) handlePointerMove(e.touches[0].clientX);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("touchend", handleGlobalMouseUp);
    window.addEventListener("touchmove", handleGlobalTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("touchend", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
    };
  }, [isDraggingSlider]);

  return (
    <div className="min-h-screen flex flex-col bg-[#131315] text-[#e4e2e4]">
      {/* 숨겨진 파일 업로드 Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* ==========================================
          [헤더] 상단 네비게이션 및 홈으로 이동
      ========================================== */}
      <header className="sticky top-0 w-full z-50 bg-[#131315]/90 backdrop-blur-xl border-b border-[#353437]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* 브랜드 로고 및 홈 링크 */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-[#a8a7af] hover:text-[#c6ff35] transition-colors mr-2 pr-3 border-r border-[#353437]"
              title="랜딩 홈으로 이동"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="hidden sm:inline">홈으로</span>
            </Link>

            <div className="w-10 h-10 rounded-xl bg-[#2a2a2c] border border-[#353437] flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[22px] text-[#c6ff35]">
                auto_fix_high
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[#e4e2e4] tracking-tight">
                  AI 헤어스타일 체험
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#2a2a2c] text-[#c6ff35] border border-[#c6ff35]/20">
                  스튜디오
                </span>
              </div>
              <span className="text-[11px] text-[#a8a7af] hidden sm:inline">
                로그인 세션 활성화됨 · 워크스페이스
              </span>
            </div>
          </div>

          {/* 우측 퀵 유틸리티 버튼 모음 */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 기본 샘플 복원 버튼 */}
            <button
              type="button"
              onClick={handleResetToSample}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1f1f21] hover:bg-[#2a2a2c] text-[#a8a7af] hover:text-[#e4e2e4] border border-[#353437] text-xs font-medium transition-all"
              title="초기 샘플로 복원"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span className="hidden sm:inline">초기화</span>
            </button>

            {/* 내 사진 직접 업로드 버튼 */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2a2a2c] hover:bg-[#353437] text-[#c6ff35] border border-[#c6ff35]/30 text-xs font-semibold shadow transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
              <span>내 사진 업로드</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          [메인 워크스페이스] 반응형 2-컬럼 레이아웃
      ========================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center">
        {/* 상단 안내 타이틀 리본 */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1f1f21] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a2a2c] border border-[#353437] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#c6ff35] animate-pulse"></span>
              <span className="text-xs font-semibold text-[#c6ff35] tracking-wide">
                실시간 가상 피팅 모드
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#e4e2e4]">
              원하는 헤어스타일을 선택하고 실시간으로 가상 착용해보세요
            </h1>
          </div>

          {/* 안면 랜드마크 상태 뱃지 */}
          <div className="flex items-center gap-2 text-xs text-[#a8a7af]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1b1b1d] border border-[#1f1f21]">
              <span className="material-symbols-outlined text-[#c6ff35] text-[16px]">
                verified
              </span>
              68개 랜드마크 인식
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1b1b1d] border border-[#1f1f21]">
              <span className="material-symbols-outlined text-[#c6ff35] text-[16px]">hd</span>
              HD 렌더링 준비됨
            </span>
          </div>
        </div>

        {/* 2-Column 그리드: 좌측 뷰파인더(7열) / 우측 컨트롤러(5열) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==========================================
              [좌측] 뷰파인더 캔버스 및 Before/After 슬라이더
          ========================================== */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={containerRef}
              className="relative w-full max-w-[520px] aspect-[3/4] sm:h-[560px] rounded-2xl overflow-hidden bg-[#0e0e10] border border-[#353437] shadow-2xl flex items-center justify-center no-select group"
            >
              {/* [모드 1: 변환 완료 및 분할 비교 슬라이더 활성화 상태] */}
              {hasTransformed && viewMode === "SPLIT" ? (
                <div className="relative w-full h-full overflow-hidden">
                  {/* (1) 하단 레이어: 변환된 헤어스타일 결과 이미지 (애프터) */}
                  <img
                    src={resultImage}
                    alt="AI 헤어스타일 변환 결과"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  {/* 우측 상단 'After' 태그 */}
                  <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-[#131315]/80 backdrop-blur-md border border-[#c6ff35]/40 text-[#c6ff35] text-xs font-bold">
                    AFTER: {selectedStyle.name}
                  </div>

                  {/* (2) 상단 레이어: 원본 인물 이미지 (비포, clip-path로 좌측 분할) */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img
                      src={userPortrait}
                      alt="원본 인물 사진"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    {/* 좌측 상단 'Before' 태그 */}
                    <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full bg-[#131315]/80 backdrop-blur-md border border-white/20 text-[#e4e2e4] text-xs font-bold">
                      BEFORE (원본)
                    </div>
                  </div>

                  {/* (3) 중앙 인터랙티브 분할 슬라이더 바 & 핸들 */}
                  <div
                    className="absolute top-0 bottom-0 z-30 w-1 bg-[#c6ff35] cursor-ew-resize flex items-center justify-center shadow-[0_0_12px_rgba(198,255,53,0.8)]"
                    style={{ left: `${sliderPosition}%` }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#131315] border-2 border-[#c6ff35] flex items-center justify-center shadow-xl active:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[18px] text-[#c6ff35]">
                        sync_alt
                      </span>
                    </div>
                  </div>
                </div>
              ) : hasTransformed && viewMode === "RESULT" ? (
                // [모드 2: 변환 결과만 단독 보기]
                <div className="relative w-full h-full">
                  <img
                    src={resultImage}
                    alt="AI 헤어스타일 변환 결과"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#131315]/80 backdrop-blur-md border border-[#c6ff35]/40 text-[#c6ff35] text-xs font-bold">
                    AFTER: {selectedStyle.name} ({selectedColor.name})
                  </div>
                </div>
              ) : (
                // [모드 3: 원본 사진 단독 보기]
                <div className="relative w-full h-full">
                  <img
                    src={userPortrait}
                    alt="원본 인물 사진"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none px-4">
                    <div className="px-4 py-1.5 rounded-full bg-[#131315]/85 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#c6ff35]">
                        face
                      </span>
                      <span className="text-xs font-medium text-[#e4e2e4]">
                        우측에서 헤어스타일을 선택 후 적용해 보세요
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* [얼굴 인식 랜드마크 가이드 오버레이] */}
              {showGuideOverlay && (
                <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between transition-opacity duration-300">
                  <div className="flex justify-between items-start">
                    <div className="w-6 h-6 border-t-2 border-l-2 border-[#c6ff35]/80 rounded-tl-md"></div>
                    <div className="w-6 h-6 border-t-2 border-r-2 border-[#c6ff35]/80 rounded-tr-md"></div>
                  </div>
                  <div className="relative w-full flex items-center justify-center">
                    <div className="w-48 h-64 sm:w-56 sm:h-72 rounded-[50%] border border-[#c6ff35]/35 bg-[#c6ff35]/5 shadow-[0_0_20px_rgba(198,255,53,0.1)] flex items-center justify-center">
                      <div className="w-full h-[1px] bg-[#c6ff35]/20 border-dashed"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-6 h-6 border-b-2 border-l-2 border-[#c6ff35]/80 rounded-bl-md"></div>
                    <div className="w-6 h-6 border-b-2 border-r-2 border-[#c6ff35]/80 rounded-br-md"></div>
                  </div>
                </div>
              )}

              {/* [AI 생성 로딩 프로그레스 오버레이] */}
              {isGenerating && (
                <div className="absolute inset-0 z-40 bg-[#131315]/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full border-4 border-[#2a2a2c] border-t-[#c6ff35] animate-spin mb-4"></div>
                  <h3 className="text-lg font-bold text-[#e4e2e4] mb-1">
                    AI가 새로운 헤어스타일을 합성하는 중입니다
                  </h3>
                  <p className="text-xs text-[#a8a7af] mb-4">
                    안면 윤곽과 모발 볼륨을 정밀 계산 중... ({generationProgress}%)
                  </p>
                  <div className="w-full max-w-xs h-2 bg-[#2a2a2c] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#c6ff35] transition-all duration-150"
                      style={{ width: `${generationProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* [하단 가이드 토글 버튼] */}
              <div className="absolute bottom-4 left-4 z-20">
                <button
                  type="button"
                  onClick={() => setShowGuideOverlay((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 shadow ${
                    showGuideOverlay
                      ? "bg-[#c6ff35] text-[#151f00] border-[#c6ff35]"
                      : "bg-[#131315]/80 text-[#e4e2e4] border-white/20 hover:border-[#c6ff35]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showGuideOverlay ? "grid_on" : "grid_off"}
                  </span>
                  <span>얼굴 가이드</span>
                </button>
              </div>

              {/* 변환 완료 시 뷰 모드 전환 버튼들 */}
              {hasTransformed && (
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-[#131315]/85 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-lg">
                  <button
                    type="button"
                    onClick={() => setViewMode("SPLIT")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      viewMode === "SPLIT"
                        ? "bg-[#c6ff35] text-[#151f00] font-bold"
                        : "text-[#a8a7af] hover:text-[#e4e2e4]"
                    }`}
                  >
                    분할비교
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("RESULT")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      viewMode === "RESULT"
                        ? "bg-[#c6ff35] text-[#151f00] font-bold"
                        : "text-[#a8a7af] hover:text-[#e4e2e4]"
                    }`}
                  >
                    결과만
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("ORIGINAL")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      viewMode === "ORIGINAL"
                        ? "bg-[#c6ff35] text-[#151f00] font-bold"
                        : "text-[#a8a7af] hover:text-[#e4e2e4]"
                    }`}
                  >
                    원본만
                  </button>
                </div>
              )}
            </div>

            {/* 캔버스 하단 보조 팁 */}
            <div className="w-full max-w-[520px] mt-3 flex items-center justify-between text-xs text-[#a8a7af] px-2">
              <span>권장: 정면 얼굴이 뚜렷한 사진</span>
              <span className="text-[#c6ff35] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c6ff35]"></span>
                실시간 뷰파인더 준비됨
              </span>
            </div>
          </div>

          {/* ==========================================
              [우측] 헤어스타일 및 컬러 컨트롤러 패널
          ========================================== */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* [1. 헤어스타일 컬렉션 선택] */}
            <div className="bg-[#1b1b1d] border border-[#2a2a2c] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c6ff35] text-[20px]">
                    content_cut
                  </span>
                  <h2 className="text-base font-bold text-[#e4e2e4]">추천 헤어스타일 컬렉션</h2>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#2a2a2c] text-[#a8a7af] border border-[#353437]">
                  5종 큐레이션
                </span>
              </div>

              {/* 헤어스타일 썸네일 그리드 */}
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-3">
                {HAIRSTYLE_PRESETS.map((style) => {
                  const isSelected = selectedStyle.id === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => {
                        setSelectedStyle(style);
                        if (hasTransformed && style.resultImageUrl) {
                          setResultImage(style.resultImageUrl);
                        }
                      }}
                      className={`flex flex-col items-center p-2.5 rounded-xl border transition-all text-center group ${
                        isSelected
                          ? "bg-[#2a2a2c] border-[#c6ff35] shadow-[0_0_15px_rgba(198,255,53,0.2)]"
                          : "bg-[#1f1f21]/60 border-transparent hover:border-[#353437]"
                      }`}
                    >
                      <div
                        className={`relative w-16 h-16 rounded-full p-[2px] transition-all ${
                          isSelected ? "bg-[#c6ff35]" : "bg-[#353437]"
                        }`}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden bg-[#1f1f21]">
                          <img
                            src={style.thumbnailUrl}
                            alt={style.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#c6ff35] flex items-center justify-center shadow">
                            <span className="material-symbols-outlined text-[13px] text-[#151f00] font-bold">
                              check
                            </span>
                          </div>
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs font-semibold tracking-tight ${
                          isSelected ? "text-[#c6ff35]" : "text-[#a8a7af] group-hover:text-[#e4e2e4]"
                        }`}
                      >
                        {style.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* [2. 헤어 컬러 톤 셀렉터] */}
            <div className="bg-[#1b1b1d] border border-[#2a2a2c] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c6ff35] text-[20px]">
                    palette
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#a8a7af] block">
                      컬러 톤 변경
                    </span>
                    <span className="text-sm font-bold text-[#e4e2e4]">
                      {selectedColor.name}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-[#c6ff35] bg-[#2a2a2c] px-2.5 py-1 rounded-full border border-[#c6ff35]/20">
                  {selectedColor.undertone}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-1">
                {HAIR_COLOR_PRESETS.map((color) => {
                  const isColorSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                        isColorSelected
                          ? "bg-[#2a2a2c] border-[#c6ff35]"
                          : "bg-[#1f1f21]/50 border-transparent hover:border-[#353437]"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full shadow-inner transition-transform ${
                          isColorSelected ? "ring-2 ring-[#c6ff35] ring-offset-2 ring-offset-[#131315] scale-110" : ""
                        }`}
                        style={{ backgroundColor: color.hexCode }}
                      ></span>
                      <span
                        className={`text-[11px] truncate ${
                          isColorSelected ? "font-semibold text-[#c6ff35]" : "text-[#a8a7af]"
                        }`}
                      >
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* [3. 메인 변환 실행 및 유틸리티 버튼] */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleApplyHairstyle}
                disabled={isGenerating}
                className="w-full min-h-[56px] rounded-xl bg-[#c6ff35] text-[#151f00] font-bold text-base flex items-center justify-center gap-2.5 shadow-[0_0_24px_rgba(198,255,53,0.35)] hover:bg-[#d4ff59] hover:shadow-[0_0_30px_rgba(198,255,53,0.5)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isGenerating ? "hourglass_empty" : "auto_fix_high"}
                </span>
                <span>
                  {isGenerating ? "AI 가상 합성 중..." : `[${selectedStyle.name}] 적용하기`}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-12 rounded-xl bg-[#1f1f21] hover:bg-[#2a2a2c] text-[#e4e2e4] font-semibold text-sm border border-[#353437] flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-[19px] text-[#a8a7af]">
                    add_a_photo
                  </span>
                  <span>사진 변경</span>
                </button>

                <a
                  href={resultImage}
                  download="hairstyle-tryon-result.png"
                  className={`h-12 rounded-xl bg-[#1f1f21] hover:bg-[#2a2a2c] text-[#e4e2e4] font-semibold text-sm border border-[#353437] flex items-center justify-center gap-2 transition-all ${
                    !hasTransformed ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <span className="material-symbols-outlined text-[19px] text-[#a8a7af]">
                    download
                  </span>
                  <span>결과 저장</span>
                </a>
              </div>
            </div>

            {/* [4. AI 분석 리포트 카드] */}
            <div className="rounded-2xl bg-[#1b1b1d] border border-[#2a2a2c] p-4 flex flex-col gap-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#2a2a2c] pb-2.5">
                <span className="text-xs font-bold text-[#e4e2e4] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#c6ff35] text-[18px]">
                    insights
                  </span>
                  AI 스타일링 조화율 분석
                </span>
                <span className="text-sm font-extrabold text-[#c6ff35]">
                  {selectedStyle.harmonyScore}% 일치
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#1f1f21] border border-[#353437]/50">
                  <span className="text-[#a8a7af] block mb-0.5">스타일 기장</span>
                  <span className="text-[#e4e2e4] font-medium">{selectedStyle.description}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1f1f21] border border-[#353437]/50">
                  <span className="text-[#a8a7af] block mb-0.5">볼륨 연출</span>
                  <span className="text-[#c6ff35] font-medium">{selectedStyle.volumeBoost}</span>
                </div>
              </div>

              <p className="text-xs text-[#a8a7af] leading-relaxed bg-[#131315]/60 p-2.5 rounded-xl border border-white/5">
                💡 <strong className="text-[#e4e2e4]">얼굴형 매칭 팁:</strong> {selectedStyle.faceMatchTip}
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* ==========================================
          [푸터] 정보
      ========================================== */}
      <footer className="w-full border-t border-[#1f1f21] py-4 mt-8 bg-[#131315] text-center text-xs text-[#a8a7af]">
        <p>© 2026 FaceOff AI Studio. Stitch Design System 기반 가상 뷰티 테크 MVP.</p>
      </footer>
    </div>
  );
}
