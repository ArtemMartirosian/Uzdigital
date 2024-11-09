const useTelegram = () => {
  const tg = window?.Telegram?.WebApp;

  const onClose = () => {
    tg.close();
  };

  return { tg, user: tg?.initDataUnsafe?.user, onClose };
};

export default useTelegram;
