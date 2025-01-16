"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ClubDetailPublicFrame from "@sparcs-clubs/web/features/clubs/frames/ClubDetailPublicFrame";
import ClubDetailStudentFrame from "@sparcs-clubs/web/features/clubs/frames/ClubDetailStudentFrame";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubs/services/getClubDetail";
import isStudent from "@sparcs-clubs/web/utils/isStudent";

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

const ClubDetail = () => {
  // 이스터에그_리크루팅
  useEffect(() => {
    console.log(
      easterEgg,
      "color:#eba12a; font-weight: bold; margin: auto", // 로고
      "", // 텍스트
    );
    console.log();
  }, []);

  const { id } = useParams();
  const { data, isLoading, isError } = useGetClubDetail(id as string);
  const { isLoggedIn, profile } = useAuth();

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {isLoggedIn && isStudent(profile)
        ? data && <ClubDetailStudentFrame club={data} />
        : data && <ClubDetailPublicFrame club={data} />}
    </AsyncBoundary>
  );
};
export default ClubDetail;
