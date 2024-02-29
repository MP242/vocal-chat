export const playAudio = (path: string) => {
  const audio = new Audio(path);
  audio.addEventListener("ended", () => {
    audio.remove();
  });
  audio.play();
};
