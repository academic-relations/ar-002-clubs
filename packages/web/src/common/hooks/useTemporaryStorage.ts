import { useEffect, useMemo, useState } from "react";

import { isObjectEmpty } from "@sparcs-clubs/web/utils";

import LocalStorageUtil from "../services/localStorageUtil";

function useTemporaryStorage<T extends object>(storageKey: string) {
  const [savedData, setSavedData] = useState<T | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const savedDataFromStorage = useMemo(
    () => LocalStorageUtil.get<T>(storageKey),
    [storageKey],
  );

  useEffect(() => {
    if (isObjectEmpty(savedDataFromStorage)) return;

    setIsModalOpen(true);
  }, [savedDataFromStorage, storageKey]);

  const handleConfirm = () => {
    setSavedData(savedDataFromStorage);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    LocalStorageUtil.remove(storageKey);
    setIsModalOpen(false);
  };

  return { savedData, isModalOpen, handleConfirm, handleClose };
}

export default useTemporaryStorage;
