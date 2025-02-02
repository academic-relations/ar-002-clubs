/**
 * 임시저장한 데이터를 불러오고 싶을 때 호출하는 함수. 로컬 스토리지로부터 저장된 이름을 기반으로 데이터를 불러옴.
 *
 * T: 함수가 최종적으로 반환하는 데이터 구조
 * name: 로컬 스토리지에 데이터를 저장할 때 saveLocalStorage를 쓰며 사용했던 데이터의 이름
 *
 */

const getLocalStorage = <T>(name: string) => {
  const rawData = localStorage.getItem(name);
  if (rawData !== null) {
    const storedData = JSON.parse(rawData) as T;
    return storedData;
  }
  return undefined;
};

export default getLocalStorage;
