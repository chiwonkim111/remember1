"use client";

import { ChevronRight } from "lucide-react";

interface Props {
  navigate: (id: number) => void;
  profileCompletion: number;
  marketValue: number;
  checkinDone: boolean;
}

export default function ProfileScreen({ navigate, profileCompletion, marketValue, checkinDone }: Props) {
  const rangeMin = Math.round(marketValue * 0.85 / 100) * 100;
  const rangeMax = Math.round(marketValue * 1.12 / 100) * 100;

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#F5F5F5]">

      {/* Profile Header */}
      <div className="bg-black px-5 pt-6 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[60px] rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-[24px] font-black text-white shrink-0">
            김
          </div>
          <div className="flex-1">
            <div className="text-[20px] font-black text-white tracking-tight">김치원</div>
            <div className="text-[13px] text-white/60 mt-0.5 font-medium">Product Manager · XOBIS</div>
            <div className="text-[12px] text-white/40 mt-px">경력 8년 · PM/PO</div>
          </div>
          <div className="border border-white/25 text-white/80 text-[12px] font-bold py-1.5 px-3 rounded cursor-pointer">
            편집
          </div>
        </div>
      </div>

      {/* Completeness Card */}
      <div className="-mt-4 mx-4 bg-white rounded-lg p-4 border border-[#E0E0E0] relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-1">프로필 완성도</div>
            <div className="text-[32px] font-black text-black leading-none">
              {profileCompletion}<span className="text-[20px]">%</span>
            </div>
          </div>
          <div className={`text-[11px] font-bold px-2 py-1 rounded ${
            profileCompletion >= 85
              ? 'text-black border border-black'
              : 'text-[#FE5314] border border-[#FE5314]/30 bg-[#FFF1EC]'
          }`}>
            {profileCompletion >= 85 ? '양호' : '미완성'}
          </div>
        </div>
        <div className="h-[3px] bg-[#EBEBEB] rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-black rounded-full transition-all duration-700"
            style={{ width: `${profileCompletion}%` }}
          />
        </div>
        {!checkinDone && (
          <div className="flex gap-2 flex-wrap">
            {['+ 주요 성과 (Q1 체크인)', '+ 동료 인증'].map(label => (
              <button
                key={label}
                className="text-[11px] font-bold py-1.5 px-3 rounded border border-[#E0E0E0] text-black bg-white cursor-pointer hover:border-black transition-colors"
                onClick={() => navigate(label.includes('체크인') ? 2 : 4)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        {checkinDone && (
          <div className="text-[12px] text-[#666666]">
            ✓ Q1 체크인 완료 · 동료 인증을 추가하면 더 올라가요
          </div>
        )}
      </div>

      {/* Market Value */}
      <div className="px-4 mt-3">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[10px] font-black text-black uppercase tracking-widest">시장가치</div>
          <button className="text-[12px] font-bold text-[#FE5314] cursor-pointer" onClick={() => navigate(3)}>
            상세 보기 →
          </button>
        </div>
        <div
          className="bg-white rounded-lg p-4 border border-[#E0E0E0] flex items-center gap-3 cursor-pointer active:bg-[#F5F5F5] transition-colors"
          onClick={() => navigate(3)}
        >
          <div className="flex-1">
            <div className="text-[11px] text-[#AAAAAA] font-medium mb-0.5">현재 추정 연봉 범위</div>
            <div className="text-[20px] font-black text-[#FE5314] leading-tight tracking-tight">
              {rangeMin.toLocaleString()} ~ {rangeMax.toLocaleString()}<span className="text-[13px]">만원</span>
            </div>
            <div className="text-[11px] text-[#AAAAAA] mt-1">
              동일 직무 상위 32%{checkinDone ? ' · Q1 체크인 반영됨 ↑' : ' · Q1 체크인 전'}
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#AAAAAA] shrink-0" />
        </div>
      </div>

      {/* Q1 성과 (체크인 완료 후 표시) */}
      {checkinDone && (
        <div className="px-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[10px] font-black text-black uppercase tracking-widest">Q1 주요 성과</div>
          </div>
          <div className="bg-white rounded-lg border border-[#E0E0E0] p-4">
            <div className="flex flex-wrap gap-1.5">
              {['AI 고도화', '비용 30% 절감', '만족도 4.7', '팀 리딩', '스프린트 운영'].map(tag => (
                <span key={tag} className="text-[12px] font-bold border border-black text-black px-2.5 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-[11px] text-[#AAAAAA] mt-2.5">2026 Q1 · 리멤버 AI 추출</div>
          </div>
        </div>
      )}

      {/* Career */}
      <div className="px-4 mt-4 pb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[10px] font-black text-black uppercase tracking-widest">경력</div>
          <div className="text-[12px] font-bold text-[#FE5314] cursor-pointer">수정 →</div>
        </div>

        {[
          {
            company: 'XOBIS', role: 'Product Manager',
            period: '2020.03 — 현재',
            badge: '✓ 동료 3인 인증', badgeStyle: 'text-black border-black',
          },
          {
            company: '스타트업 A', role: 'PM / 서비스 기획',
            period: '2017.01 — 2020.02',
            badge: '⏳ 인증 대기 1명', badgeStyle: 'text-[#FE5314] border-[#FE5314]',
          },
        ].map(item => (
          <div key={item.company} className="bg-white rounded-lg p-3.5 mb-2 border border-[#E0E0E0]">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[15px] font-black text-black">{item.company}</div>
                <div className="text-[12px] text-[#666666] mt-0.5">{item.role}</div>
              </div>
              <div className="text-[11px] text-[#AAAAAA] font-medium">{item.period}</div>
            </div>
            <div className="mt-2.5">
              <span className={`text-[11px] font-bold px-2 py-1 rounded border ${item.badgeStyle}`}>
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
