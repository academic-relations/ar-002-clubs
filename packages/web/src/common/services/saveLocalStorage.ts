/**
 * 임시저장을 할 때 호출해야 하는 함수. 로컬 스토리지에 임시 데이터를 저장함.
 *
 * name: 로컬 스토리지에 이 이름대로 저장됨
 * tempData: 저장할 데이터 (추후 getLocalStorage를 통해 불러올 최종 데이터 구조와 똑같거나 typecasting 가능할 정도로 구조가 유사해야 함)
 *
 */

const saveLocalStorage = <T>(name: string, tempData: T) => {
  localStorage.setItem(name, JSON.stringify(tempData));
};

export default saveLocalStorage;
