"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/utils/i18n/language-context"
import { ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export function Footer() {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <footer className="bg-gray-100 py-2 sm:py-3 md:py-4 mt-2 sm:mt-4 md:mt-6">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* 회사 정보 */}
          <div className="flex flex-col md:flex-row justify-between mb-1 sm:mb-2 md:mb-3">
            <div className="mb-1 md:mb-0">
              <h3 className="text-[8px] sm:text-[10px] md:text-xs font-bold text-blue-900 mb-0.5">주) 리콘랩스</h3>
              <p className="text-[6px] sm:text-[8px] md:text-[10px] text-blue-900">대표이사: 반성훈</p>
            </div>
            <div>
              <p className="text-[6px] sm:text-[8px] md:text-[10px] text-blue-900 mb-0.5">
                통신판매업신고번호: 2021-서울강남-04763
              </p>
              <p className="text-[6px] sm:text-[8px] md:text-[10px] text-blue-900">사업자등록번호: 497-86-01565</p>
            </div>
          </div>

          {/* 주소 정보 */}
          <div className="pt-0.5 sm:pt-1 md:pt-1.5 mb-1 sm:mb-1.5 md:mb-2">
            <p className="text-[6px] sm:text-[8px] md:text-[10px] text-blue-900 mb-0.5">서울 강남구 학동로53길 30</p>
            <p className="text-[6px] sm:text-[8px] md:text-[10px] text-blue-900">
              30, Hakdong-ro 53-gil, Gangnam-gu, Seoul
            </p>
          </div>

          {/* 약관 및 정책 링크 */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-2 sm:mb-3">
            <button
              onClick={() => setShowTerms(true)}
              className="text-[8px] sm:text-[10px] md:text-xs text-blue-700 hover:underline"
            >
              서비스 이용약관
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-[8px] sm:text-[10px] md:text-xs text-blue-700 hover:underline"
            >
              개인정보 처리방침
            </button>
          </div>

          {/* 저작권 정보 */}
          <div className="text-center">
            <p className="text-[5px] sm:text-[6px] md:text-[8px] text-blue-900 mb-0.5">
              Copyright ⓒ 2025 리콘랩스(RECON Labs) All rights reserved.
            </p>
            <a
              href="https://www.reconlabs.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[6px] sm:text-[8px] md:text-[10px] text-blue-700 hover:text-blue-900 transition-colors"
            >
              <span>https://www.reconlabs.ai/</span>
              <ExternalLink className="ml-0.5 h-1.5 w-1.5 sm:h-2 sm:w-2" />
            </a>
          </div>
        </div>
      </div>

      {/* 이용약관 모달 */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogTitle className="text-center text-lg font-bold text-purple-800 mb-4">서비스 이용약관</DialogTitle>
          <div className="text-sm space-y-4">
            <h3 className="font-bold text-purple-700">제 1 조 (목적)</h3>
            <p className="text-gray-700">
              이 약관은 주식회사 리콘랩스(이하 "회사")가 제공하는 Petpresso 서비스(이하 "서비스")의 이용과 관련하여
              회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>

            <h3 className="font-bold text-purple-700">제 2 조 (정의)</h3>
            <p className="text-gray-700">
              1. "서비스"란 회사가 제공하는 반려동물 프로필 생성 및 관련 서비스를 의미합니다.
              <br />
              2. "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.
              <br />
              3. "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 서비스를 지속적으로 이용할 수 있는
              자를 말합니다.
            </p>

            <h3 className="font-bold text-purple-700">제 3 조 (약관의 효력 및 변경)</h3>
            <p className="text-gray-700">
              1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.
              <br />
              2. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내에 공지함으로써 효력이 발생합니다.
            </p>

            <h3 className="font-bold text-purple-700">제 4 조 (서비스의 제공 및 변경)</h3>
            <p className="text-gray-700">
              1. 회사는 반려동물 프로필 생성 및 관련 서비스를 제공합니다.
              <br />
              2. 회사는 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수 있습니다.
            </p>

            <h3 className="font-bold text-purple-700">제 5 조 (서비스 이용 제한)</h3>
            <p className="text-gray-700">
              회사는 이용자가 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다.
              <br />
              1. 타인의 정보를 도용하거나 허위 정보를 등록한 경우
              <br />
              2. 서비스의 운영을 고의로 방해한 경우
              <br />
              3. 타인에게 피해를 주거나 미풍양속을 해치는 행위를 한 경우
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* 개인정보 처리방침 모달 */}
      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogTitle className="text-center text-lg font-bold text-purple-800 mb-4">개인정보 처리방침</DialogTitle>
          <div className="text-sm space-y-4">
            <h3 className="font-bold text-purple-700">1. 개인정보의 수집 및 이용 목적</h3>
            <p className="text-gray-700">
              회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
              이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한
              조치를 이행할 예정입니다.
              <br />- 회원 가입 및 관리
              <br />- 서비스 제공 및 운영
              <br />- 마케팅 및 광고에의 활용
            </p>

            <h3 className="font-bold text-purple-700">2. 수집하는 개인정보의 항목</h3>
            <p className="text-gray-700">
              회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
              <br />- 필수항목: 이름, 이메일 주소, 비밀번호
              <br />- 선택항목: 프로필 이미지, 반려동물 정보
              <br />- 자동수집항목: IP 주소, 쿠키, 서비스 이용 기록
            </p>

            <h3 className="font-bold text-purple-700">3. 개인정보의 보유 및 이용기간</h3>
            <p className="text-gray-700">
              회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단,
              관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안
              회원정보를 보관합니다.
              <br />- 계약 또는 청약철회 등에 관한 기록: 5년
              <br />- 대금결제 및 재화 등의 공급에 관한 기록: 5년
              <br />- 소비자의 불만 또는 분쟁처리에 관한 기록: 3년
            </p>

            <h3 className="font-bold text-purple-700">4. 개인정보의 파기절차 및 방법</h3>
            <p className="text-gray-700">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
              개인정보를 파기합니다. 파기절차 및 방법은 다음과 같습니다.
              <br />- 파기절차: 회원님이 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련
              법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.
              <br />- 파기방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여
              삭제합니다.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
