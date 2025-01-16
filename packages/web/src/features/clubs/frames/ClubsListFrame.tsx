"use client";

import React, { useEffect, useMemo, useState } from "react";

import { hangulIncludes } from "es-hangul";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";
import { useGetClubsList } from "@sparcs-clubs/web/features/clubs/services/useGetClubsList";

interface ClubsListProps {
  isRegistrationPeriod: boolean;
}

const easterEgg = `%c
                        -     
                       -=.    
                      -===    
                     =====.   
:                   -=====-   
+-                 -=======   
++=               =========-  
+++=.            -==========  
+++++:          ============- 
++++++-        ============== 
+++++++=      ===============:
++++++++=.  .================:
+++++++++= .===============-  
++++++++=. ===============.   
+++++++=..==============:     
++++++=..==============       
+++++= .=============.        
++++=..============:          
+++=..===========-            
++= .===========-.            
+=.:==========+++++++===--:::.  
= :=======+++++++++++++++===: 
 :====+++++++++++++++=====:   
.---====++++++++=======-.     
             :=======-.       
            :======-.         
           :=====:            
          -====:              
         -===:                
        -=-.                  
       =-                     
     .:.                       
%c찾으셨군요!
SPARCS의 여정에 함께하지 않으시겠어요?
https://sparcs.org/
https://apply.sparcs.org/ (리크루팅 기간에 접속 가능)
     `;

const ClubsListFrame: React.FC<ClubsListProps> = ({ isRegistrationPeriod }) => {
  // 이스터에그_리크루팅
  useEffect(() => {
    console.log(
      easterEgg,
      "color:#eba12a; font-weight: bold; margin: auto", // 로고
      "", // 텍스트
    );
    console.log();
  }, []);

  const { data, isLoading, isError } = useGetClubsList();

  const [searchText, setSearchText] = useState<string>("");

  const filteredDivisions = useMemo(
    () =>
      (data?.divisions ?? [])
        .map(division => {
          const filteredClubs = division.clubs
            .filter(
              item =>
                item.name_kr.toLowerCase().includes(searchText.toLowerCase()) ||
                item.name_en.toLowerCase().includes(searchText.toLowerCase()) ||
                hangulIncludes(item.name_kr, searchText),
            )
            .sort((a, b) => {
              if (a.isPermanent && !b.isPermanent) return -1;
              if (!a.isPermanent && b.isPermanent) return 1;
              return a.type - b.type || a.name_kr.localeCompare(b.name_kr);
            });

          return { ...division, clubs: filteredClubs };
        })
        .filter(division => division.clubs.length > 0),
    [data, searchText],
  );

  return (
    <>
      <SearchInput
        searchText={searchText}
        handleChange={setSearchText}
        placeholder="동아리 이름으로 검색하세요"
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <FlexWrapper direction="column" gap={40}>
          {filteredDivisions.map(division => (
            <ClubsSectionFrame
              title={division.name}
              clubList={division.clubs}
              key={division.name}
              isRegistrationPeriod={isRegistrationPeriod}
            />
          ))}
        </FlexWrapper>
      </AsyncBoundary>
    </>
  );
};

export default ClubsListFrame;
