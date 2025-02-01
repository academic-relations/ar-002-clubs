class LocalStorageUtil {
  /**
   * 임시저장을 할 때 호출해야 하는 함수. 로컬 스토리지에 임시 데이터를 저장함.
   *
   * name: 로컬 스토리지에 이 이름대로 저장됨
   * tempData: 저장할 데이터 (추후 getLocalStorage를 통해 불러올 최종 데이터 구조와 똑같거나 typecasting 가능할 정도로 구조가 유사해야 함)
   *
   */
  public static save = <T>(name: string, tempData: T) => {
    localStorage.setItem(name, JSON.stringify(tempData));
  };

  /**
   * 임시저장을 할 때 호출해야 하는 함수. 로컬 스토리지에 임시 데이터를 저장함.
   *
   * name: 로컬 스토리지에 이 이름대로 저장됨
   * tempData: 저장할 데이터 (추후 getLocalStorage를 통해 불러올 최종 데이터 구조와 똑같거나 typecasting 가능할 정도로 구조가 유사해야 함)
   *
   */
  public static get = <T>(name: string) => {
    try {
      const rawData = localStorage.getItem(name);
      if (rawData != null) {
        const storedData = JSON.parse(rawData) as T;
        return storedData;
      }
      return undefined;
    } catch {
      return undefined;
    }
  };

  /**
   * 임시저장 기능이 필요 없어졌을 때 호출해야 하는 함수. 로컬 스토리지에 저장되어 있는 임시 데이터를 삭제함.
   *
   * name: 로컬 스토리지에 이 이름대로 저장됨
   * tempData: 저장할 데이터 (추후 getLocalStorage를 통해 불러올 최종 데이터 구조와 똑같거나 typecasting 가능할 정도로 구조가 유사해야 함)
   *
   */
  public static remove = (name: string) => {
    localStorage.removeItem(name);
  };
}

export default LocalStorageUtil;
