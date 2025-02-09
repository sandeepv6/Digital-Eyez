export function speakText(text) {
  if (!text) return;

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  synth.cancel(); // Stop any ongoing speech
  synth.speak(utterance);
}