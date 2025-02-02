import logger from "@sparcs-clubs/web/utils/logger";

type StorageValue<T> = {
  value: T;
  expireTime: number | undefined;
};
class LocalStorageUtil {
  private static PREFIX = "temp_";

  /**
   * 임시저장을 할 때 호출해야 하는 함수. 로컬 스토리지에 임시 데이터를 저장함.
   *
   * name: 로컬 스토리지에 이 이름대로 저장됨
   * tempData: 저장할 데이터 (추후 getLocalStorage를 통해 불러올 최종 데이터 구조와 똑같거나 typecasting 가능할 정도로 구조가 유사해야 함)
   * ttl: 만료 시간(ms). 디폴트로 24시간 뒤에 만료됨
   *
   */
  public static save = <T>(
    name: string,
    tempData: T,
    ttl: number = 24 * 60 * 60 * 1000,
  ): void => {
    const data: StorageValue<T> = {
      value: tempData,
      expireTime: Date.now() + ttl,
    };
    localStorage.setItem(this.PREFIX + name, JSON.stringify(data));
  };

  /**
   * 임시저장을 할 때 호출해야 하는 함수. 로컬 스토리지에 임시 데이터를 저장함.
   *
   * name: 로컬 스토리지에 이 이름대로 저장됨
   * tempData: 저장할 데이터 (추후 getLocalStorage를 통해 불러올 최종 데이터 구조와 똑같거나 typecasting 가능할 정도로 구조가 유사해야 함)
   *
   */
  public static get = <T>(name: string): T | undefined => {
    const rawData = localStorage.getItem(this.PREFIX + name);

    if (!rawData) return undefined;

    try {
      const storedData: StorageValue<T> = JSON.parse(rawData);

      if (storedData.expireTime && Date.now() > storedData.expireTime) {
        this.remove(name);
        return undefined;
      }
      return storedData.value;
    } catch (error) {
      logger.log("Failed to parse localStorage Item: ", error);
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
    localStorage.removeItem(this.PREFIX + name);
  };

  /**
   * 로컬 스토리지에 저장되어 있는 PREFIX(="temp_")로 시작하는 모든 features의 임시 데이터를 삭제함.
   */
  public static removeAll = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  };

  /**
   * 로컬 스토리지에 해당 키에 대한 값이 존재하는지 확인함
   *
   * name: 확인할 데이터의 키
   *
   */
  public static hasValue = (name: string) => this.get(name) != null;
}

export default LocalStorageUtil;
