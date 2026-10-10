// ==========================================
// AI 헤어스타일 가상 체험 서비스 데이터 모델 및 프리셋
// ==========================================

// 1. 개별 헤어스타일 정보 인터페이스
export interface HairstyleItem {
  id: string;               // 고유 식별자 (예: 'wavy-bob')
  name: string;             // 한글 스타일명
  englishName: string;      // 영문 스타일명
  thumbnailUrl: string;     // 선택 원형 카드용 썸네일 이미지 URL
  resultImageUrl?: string;  // 해당 스타일에 매칭되는 변환 결과 이미지 (없을 시 기본 결과 이미지 사용)
  description: string;      // 기장 및 스타일 설명
  volumeBoost: string;      // 볼륨 강화 수치 및 특징 설명
  harmonyScore: number;     // 안면 매칭 조화율 (%)
  faceMatchTip: string;     // 얼굴형에 따른 어드바이스 문구
}

// 2. 개별 헤어 컬러 정보 인터페이스
export interface HairColorItem {
  id: string;               // 고유 식별자 (예: 'caramel-glaze')
  name: string;             // 한글 컬러명
  hexCode: string;          // 팔레트 표시용 HEX 색상 코드
  undertone: string;        // 컬러 톤 및 입체 하이라이트 설명
}

// 기본 샘플 모델 원본 인물 사진 (Stitch 에셋)
export const DEFAULT_SAMPLE_PORTRAIT =
  "/stitch_screens/7_image_classic_bob_d01259f4d3374fd2ae41e694e614ca88/screenshot.png";

// 기본 합성 완료 결과 사진 (Wavy Bob 변환 결과)
export const DEFAULT_TRANSFORMED_RESULT =
  "/stitch_screens/8_image_wavy_bob_d2eb217c48904298b4186f27525b6378/screenshot.png";

// 5대 추천 헤어스타일 프리셋 목록
export const HAIRSTYLE_PRESETS: HairstyleItem[] = [
  {
    id: "wavy-bob",
    name: "웨이비 보브",
    englishName: "Wavy Bob",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDo9emNEGRKwGoCkw46aCcrN8O9lJ7_325GJWI7dIB8ZAOPSWKZcT3Yl8yLiaSS1J2goQp9p1aC9jcxmMLl1eI8zz7tTyNgpFEmax8ZuYIIsxhbVkDm2Yg8fUaQNa8t9fxf-ZOc3KuXAFs7OQqas_UOlJdth4O4qPIZ_h-Sbbuqtsfmp4BPs0B5VDqyh35Nk_IkLRlnf4azBr7iucmrkJKnJMpkk3WxQCWV6rMP5S3DuYTI1V7kCOd9",
    resultImageUrl: DEFAULT_TRANSFORMED_RESULT,
    description: "턱선 라인 미디엄 레이어드 기장",
    volumeBoost: "사이드 볼륨 32% 강화 리프팅",
    harmonyScore: 98,
    faceMatchTip: "광대 곡선과 턱선을 자연스럽게 감싸 얼굴형이 더욱 갸름하고 부드러워 보입니다.",
  },
  {
    id: "classic-bob",
    name: "클래식 보브",
    englishName: "Classic Bob",
    thumbnailUrl:
      "/stitch_screens/7_image_classic_bob_d01259f4d3374fd2ae41e694e614ca88/screenshot.png",
    resultImageUrl: DEFAULT_SAMPLE_PORTRAIT,
    description: "깔끔하고 단정한 스트레이트 단발 라인",
    volumeBoost: "페이스라인 안쪽 밀착 C컬",
    harmonyScore: 94,
    faceMatchTip: "이목구비를 또렷하게 강조하며 도회적이고 세련된 인상을 선사합니다.",
  },
  {
    id: "curly-volume",
    name: "컬리 볼륨",
    englishName: "Curly Volume",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_1zrPXoQh2ciehYfwAxATY3NI3pzYR55Izb_x44iIu9SDZtKqJeuK0nLfAQfYw05NJAhyFLwdBR2e7RWmp8Xj6iKP1VKFssEpwztgfvOX75VZU_32tevTAAfXPEtOec7OCicBdKHFateT4TNPJbA5-S8IijIv7d2AYnZvCMDLIthEopmm39dqaCwXET0wSBeteRuiHNDgzWvZ199gfXXGuxU6qUV6rlKUiEXImFsB4_BIFuTdnt2c",
    resultImageUrl: DEFAULT_TRANSFORMED_RESULT,
    description: "풍성하고 생동감 넘치는 글램 컬링",
    volumeBoost: "전체 볼륨 45% 강화 풍성함",
    harmonyScore: 91,
    faceMatchTip: "각진 턱이나 강한 인상을 부드럽고 사랑스러운 무드로 보완해 줍니다.",
  },
  {
    id: "pixie-cut",
    name: "픽시 컷",
    englishName: "Pixie Cut",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIk5VxVbylEjRAhyoDhoz_SAGZpNEdZtGRcSS7fk997QtCSPjVPfKlqIxWymAkwI66OINHdwu3cX3JfigeiHTB6dhW2q8wX1GnMVCzP3v5bmRIrtEvi21Bpa8BCccTssOJoADSG-sVeC8GgWohh821eGYy1Lu5GWAUi3v_ILm0Yp26ZvMX4qWtvHY89uDStx_ff0-4iLP9Cfl3Av4-7NATY5o1iJJ_iuYkaPSzuGX1MhezgpNEfz-k",
    resultImageUrl: DEFAULT_TRANSFORMED_RESULT,
    description: "세련되고 엣지 있는 텍스처 숏컷",
    volumeBoost: "정수리 리프팅 볼륨 38% 강화",
    harmonyScore: 89,
    faceMatchTip: "목선과 쇄골 라인을 슬림하게 부각시켜 키가 커 보이는 시각적 효과를 줍니다.",
  },
  {
    id: "curtain-bangs",
    name: "커튼 뱅",
    englishName: "Curtain Bangs",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_kFfXdCf2mN21XWXpcvzFtOzy4rR55v1nutn91OfJDyZN8x2Nr93gLfC_IOWP7YHo_yAkwLsRBJVVzfoDv-D6PWMSPJRXJq1-bB7hi2ZjDqvUukVyHfw9cNfdctHwH2gW3fDUMX2ACTDd97W-aSWPZSMb4XElexzF4M6rgzeApNO7IrdREt4GrWcN2qn7IIQgnAfdwqM3WiCs6fxGqQ4EZaAtjOro_0_ZxOFwEroapVPfclyUn44T",
    resultImageUrl: DEFAULT_TRANSFORMED_RESULT,
    description: "광대 라인을 부드럽게 감싸는 사이드 뱅",
    volumeBoost: "앞머리 자연스러운 아치형 곡선",
    harmonyScore: 96,
    faceMatchTip: "이마 비율과 옆광대를 자연스럽게 커버하여 계란형 얼굴을 연출합니다.",
  },
];

// 4대 헤어 컬러 스와치 목록
export const HAIR_COLOR_PRESETS: HairColorItem[] = [
  {
    id: "caramel-glaze",
    name: "카라멜 글레이즈",
    hexCode: "#c99a5b",
    undertone: "웜 허니 베이스 입체 하이라이트",
  },
  {
    id: "natural-black",
    name: "내추럴 블랙",
    hexCode: "#1b1512",
    undertone: "차분하고 깊이감 있는 클래식 블랙",
  },
  {
    id: "mocha-brown",
    name: "모카 브라운",
    hexCode: "#523321",
    undertone: "고급스러운 딥 에스프레소 브라운",
  },
  {
    id: "honey-gold",
    name: "허니 골드",
    hexCode: "#e3b76b",
    undertone: "화사하고 밝은 샴페인 골드 블론드",
  },
];
