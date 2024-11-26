// lib/utils.ts

export function createSpeechRecognition(
  onResult: (text: string, isFinal: boolean) => void
): SpeechRecognition {
  const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionConstructor) {
    throw new Error("Speech recognition is not supported in this browser.");
  }

  const recognition = new SpeechRecognitionConstructor();
  recognition.continuous = false; // Set to false if you want it to stop automatically after each phrase
  recognition.interimResults = true;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) {
        finalTranscript += result[0].transcript;
        onResult(finalTranscript, true);
      } else {
        interimTranscript += result[0].transcript;
        onResult(interimTranscript, false);
      }
    }
  };

  return recognition;
}
