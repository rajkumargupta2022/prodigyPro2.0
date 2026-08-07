import AiVoice from "./AI Assist.mp3";


export const playAIVoice = () => {
  const audio = new Audio(AiVoice);

  audio.play().catch((err) => {
    console.error("Error playing audio:", err);
  });
};
