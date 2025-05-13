// 한국어와 일본어 번역 데이터
export type Language = "ko" | "ja"

export type Translations = {
  [key: string]: {
    [key in Language]: string
  }
}

export const translations: Translations = {
  // 네비게이션
  login: {
    ko: "로그인",
    ja: "ログイン",
  },
  logout: {
    ko: "로그아웃",
    ja: "ログアウト",
  },

  // 헤더 섹션
  specialMoment: {
    ko: "✨ 특별한 순간을 위한 ✨",
    ja: "✨ 特別な瞬間のための ✨",
  },
  mainTitle1: {
    ko: "우리 강아지가",
    ja: "私たちの愛犬が",
  },
  mainTitle2: {
    ko: "아이돌",
    ja: "アイドル",
  },
  mainTitle3: {
    ko: " 샵 다녀왔어요!",
    ja: " ショップに行ってきました！",
  },
  subtitle: {
    ko: "내 반려동물도 꽃단장 하고 스튜디오 사진 찍기",
    ja: "私のペットも花飾りをつけてスタジオ写真を撮ろう",
  },

  // 이미지 설명
  dailyPhoto: {
    ko: "칸쵸의 일상 모습",
    ja: "カンチョの日常の姿",
  },
  profilePhoto: {
    ko: "칸쵸의 꽃단장 프로필",
    ja: "カンチョの花飾りプロフィール",
  },
  beforeAfter: {
    ko: "일상 속 모습과 스튜디오에서의 변신!",
    ja: "日常の姿とスタジオでの変身！",
  },

  // 버튼
  createProfile: {
    ko: "펫 프로필 만들기",
    ja: "ペットプロフィール作成",
  },
  duksunTransformed: {
    ko: "우리 덕선이가 이렇게 변했어요!",
    ja: "私たちのドクソニがこんなに変わりました！",
  },

  // 스타일 섹션
  flowerProfile: {
    ko: "꽃단장 프로필",
    ja: "花飾りプロフィール",
  },
  colorfulFlower: {
    ko: "화려한 색감과 꽃 장식",
    ja: "鮮やかな色と花の装飾",
  },
  animationStyle: {
    ko: "애니메이션 스타일",
    ja: "アニメーションスタイル",
  },
  warmAtmosphere: {
    ko: "동화같은 따뜻한 분위기",
    ja: "童話のような温かい雰囲気",
  },
  baseball: {
    ko: "야구",
    ja: "野球",
  },
  teamInfoNeeded: {
    ko: "응원 팀 정보 필요",
    ja: "応援チーム情報が必要",
  },

  // 갤러리 섹션
  recentProfiles: {
    ko: "최근 생성된 프로필 갤러리",
    ja: "最近作成されたプロフィールギャラリー",
  },

  // 로딩 화면
  shootingPrep: {
    ko: "촬영 준비중...",
    ja: "撮影準備中...",
  },
  petDressing: {
    ko: "고객님의 소중한 반려동물이 꽃단장 중입니다..",
    ja: "お客様の大切なペットが花飾り中です..",
  },
  sequentialDelivery: {
    ko: "완료된 사진은 순차적으로 발송해드릴 예정입니다.",
    ja: "完成した写真は順次お送りいたします。",
  },
  pleaseWait: {
    ko: "조금만 기다려주세요!",
    ja: "少々お待ちください！",
  },
  petInfoInput: {
    ko: "반려동물 정보 입력",
    ja: "ペット情報入力",
  },

  // 폼 필드
  email: {
    ko: "이메일",
    ja: "メール",
  },
  petName: {
    ko: "반려동물 이름",
    ja: "ペットの名前",
  },
  age: {
    ko: "나이",
    ja: "年齢",
  },
  gender: {
    ko: "성별",
    ja: "性別",
  },
  species: {
    ko: "품종",
    ja: "品種",
  },
  features: {
    ko: "특징",
    ja: "特徴",
  },
  completeApplication: {
    ko: "신청 완료하기",
    ja: "申請を完了する",
  },

  // 폼 플레이스홀더
  emailPlaceholder: {
    ko: "example@email.com",
    ja: "example@email.com",
  },
  petNamePlaceholder: {
    ko: "예: 멍이, 냥이",
    ja: "例：ポチ、タマ",
  },
  agePlaceholder: {
    ko: "예: 3살",
    ja: "例：3歳",
  },
  genderPlaceholder: {
    ko: "예: 남아, 여아",
    ja: "例：オス、メス",
  },
  speciesPlaceholder: {
    ko: "예: 말티즈, 코리안숏헤어",
    ja: "例：マルチーズ、日本猫",
  },
  featuresPlaceholder: {
    ko: "반려동물의 특징을 자유롭게 적어주세요. (성격, 외모 등)",
    ja: "ペットの特徴を自由に書いてください。（性格、外見など）",
  },

  // 완료 화면
  applicationComplete: {
    ko: "신청이 완료되었습니다",
    ja: "申請が完了しました",
  },
  successMessage: {
    ko: "입력하신 정보로 신청이 성공적으로 완료되었습니다.",
    ja: "入力された情報で申請が正常に完了しました。",
  },
  autoCloseMessage: {
    ko: "초 후 자동으로 닫힙니다",
    ja: "秒後に自動的に閉じます",
  },
  close: {
    ko: "닫기",
    ja: "閉じる",
  },

  // 스타일 선택 화면
  selectStyle: {
    ko: "스타일 선택",
    ja: "スタイル選択",
  },
  preparing: {
    ko: "준비중",
    ja: "準備中",
  },
  comingSoon: {
    ko: "곧 만나보실 수 있어요!",
    ja: "もうすぐご利用いただけます！",
  },
  confirm: {
    ko: "확인",
    ja: "確認",
  },

  // 언어 선택
  language: {
    ko: "언어",
    ja: "言語",
  },
  korean: {
    ko: "한국어",
    ja: "韓国語",
  },
  japanese: {
    ko: "일본어",
    ja: "日本語",
  },

  // 사진 업로드 가이드
  photoUploadGuide: {
    ko: "사진 업로드 가이드",
    ja: "写真アップロードガイド",
  },
  forBestResults: {
    ko: "멋진 작업물을 위해서 가이드라인을 참고해주세요.",
    ja: "素晴らしい作品のためにガイドラインを参考にしてください。",
  },
  clearSoloPhoto: {
    ko: "선명하고 단독으로 찍힌 전신 사진이 가장 좋은 결과물을 만듭니다.",
    ja: "鮮明で単独で撮影された全身写真が最も良い結果を生み出します。",
  },
  obscuredPhoto: {
    ko: "가려진 사진",
    ja: "隠れた写真",
  },
  withOthersPhoto: {
    ko: "같이 나온 사진",
    ja: "他の人と一緒に写っている写真",
  },
  blurryPhoto: {
    ko: "흐린 사진",
    ja: "ぼやけた写真",
  },
  soloPhoto: {
    ko: "단독사진",
    ja: "単独写真",
  },
  fullBodyPhoto: {
    ko: "전신사진",
    ja: "全身写真",
  },
  clearPhoto: {
    ko: "선명한 사진",
    ja: "鮮明な写真",
  },
  select1to3Photos: {
    ko: "1~3개 사진 선택하기",
    ja: "1〜3枚の写真を選択",
  },
  selectPhotos: {
    ko: "사진 1장을 선택해주세요",
    ja: "写真を1枚選択してください",
  },
  selectOnePhoto: {
    ko: "사진 1장 선택하기",
    ja: "写真を1枚選択",
  },
  myGallery: {
    ko: "내 갤러리 화면",
    ja: "マイギャラリー画面",
  },
  selectedPhotos: {
    ko: "선택한 사진",
    ja: "選択した写真",
  },
  noSelectedPhotos: {
    ko: "선택된 사진이 없습니다",
    ja: "選択された写真がありません",
  },
  morePhotosNeeded: {
    ko: "장 더",
    ja: "枚追加",
  },
  complete: {
    ko: "완료",
    ja: "完了",
  },
  cancel: {
    ko: "취소",
    ja: "キャンセル",
  },
  viewLarger: {
    ko: "크게 보기",
    ja: "拡大表示",
  },

  // 푸터
  officialWebsite: {
    ko: "공식 웹사이트",
    ja: "公式ウェブサイト",
  },

  // 결과 완료 화면
  creatingProfile: {
    ko: "프로필 생성 중...",
    ja: "プロフィール作成中...",
  },
  aiProcessing: {
    ko: "AI가 이미지를 생성하고 있습니다.",
    ja: "AIが画像を生成しています。",
  },
  pleaseWaitMoment: {
    ko: "잠시만 기다려주세요.",
    ja: "少々お待ちください。",
  },
  profileComplete: {
    ko: "프로필 생성 완료!",
    ja: "プロフィール作成完了！",
  },
  profileDescription: {
    ko: "멋진 스튜디오 프로필 사진이 완성되었습니다. 다운로드하거나 공유해보세요!",
    ja: "素敵なスタジオプロフィール写真が完成しました。ダウンロードまたは共有してみてください！",
  },
  download: {
    ko: "다운로드",
    ja: "ダウンロード",
  },
  share: {
    ko: "공유하기",
    ja: "共有する",
  },

  // 사용자 프로필 페이지 관련 번역
  myPage: {
    ko: "마이페이지",
    ja: "マイページ",
  },
  dashboard: {
    ko: "대시보드",
    ja: "ダッシュボード",
  },
  myPets: {
    ko: "내 반려동물",
    ja: "私のペット",
  },
  activityHistory: {
    ko: "활동 내역",
    ja: "活動履歴",
  },
  recentProfiles: {
    ko: "최근 생성한 프로필",
    ja: "最近作成したプロフィール",
  },
}
