/**
 * 컴포넌트 내보내기
 */

// 기본 로딩 화면 (단일 파일 버전)
export { LoadingScreen } from "./loading-screen"

// 리팩토링된 로딩 화면 (모듈화된 버전)
export { LoadingScreenRefactored } from "./loading-screen-refactored"

// 개별 컴포넌트
export { LoadingAnimation } from "./loading-animation"
export { PetInfoForm } from "./pet-info-form"
export { NotificationAlert } from "./notification-alert"
export { LoadingMessage } from "./loading-message"

// 타입 내보내기
export type { LoadingScreenProps, PetInfo } from "./loading-screen-types"
