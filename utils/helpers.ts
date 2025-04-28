/**
 * 디바이스가 모바일인지 확인하는 함수
 * @returns {boolean} 모바일 여부
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768
}

/**
 * 이미지 URL이 유효한지 확인하는 함수
 * @param {string} url - 확인할 이미지 URL
 * @returns {Promise<boolean>} 유효성 여부
 */
export function isValidImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

/**
 * 날짜를 포맷팅하는 함수
 * @param {Date} date - 포맷팅할 날짜
 * @param {string} format - 포맷 (기본값: YYYY.MM.DD)
 * @returns {string} 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date, format = "YYYY.MM.DD"): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return format.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day)
}

/**
 * 텍스트를 지정된 길이로 자르는 함수
 * @param {string} text - 원본 텍스트
 * @param {number} maxLength - 최대 길이
 * @returns {string} 잘린 텍스트
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * 로컬 스토리지에 데이터를 저장하는 함수
 * @param {string} key - 저장할 키
 * @param {any} value - 저장할 값
 */
export function saveToLocalStorage(key: string, value: any): void {
  if (typeof window === "undefined") return
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error("로컬 스토리지 저장 실패:", error)
  }
}

/**
 * 로컬 스토리지에서 데이터를 가져오는 함수
 * @param {string} key - 가져올 키
 * @param {any} defaultValue - 기본값
 * @returns {any} 저장된 값 또는 기본값
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  try {
    const serializedValue = localStorage.getItem(key)
    if (serializedValue === null) return defaultValue
    return JSON.parse(serializedValue) as T
  } catch (error) {
    console.error("로컬 스토리지 가져오기 실패:", error)
    return defaultValue
  }
}
