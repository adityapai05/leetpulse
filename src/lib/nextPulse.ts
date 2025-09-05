type args = {
  iteration: number;
  verdict: string;
  accuracy: number;
  level: number;
};

type returnType = {
  phase: "learning" | "stable" | "struggling";
  interval: number;
  isMastered: boolean;
};

export default function NextPulse(Args: args): returnType {
  const { iteration, verdict, accuracy, level } = Args;
  let phase: "learning" | "stable" | "struggling" = "learning";
  let isMastered = false;
  let interval = 1;
  let constant: number;
  let factor: number;

  //Phase logic
  if (iteration > 5) {
    if (accuracy < 50) {
      phase = "struggling";
    } else if (accuracy >= 50 && accuracy < 80) {
      phase = "learning";
    } else {
      phase = "stable";
    }
  }

  //Mastered problem logic
  if (verdict == "Correct") {
    if (accuracy > 90 && iteration > 2) {
      isMastered = true;
    } else if (accuracy > 80 && iteration > 4) {
      isMastered = true;
    } else if (accuracy > 70 && iteration > 6) {
      isMastered = true;
    } else if (accuracy > 60 && iteration > 8) {
      isMastered = true;
    } else if (iteration > 10) {
      isMastered = true;
    }
  }

  if (level == 1) {
    factor = 2;
  } else if (level == 2) {
    factor = 1.5;
  } else if (level == 3) {
    factor = 1;
  }

  if (iteration <= 3) {
    constant = 1;
  } else if (iteration <= 6) {
    constant = 2;
  } else {
    constant = 3;
  }

  if (verdict == "Correct") {
    interval = Math.round(iteration * constant * factor);
  } else if (verdict == "Incorrect") {
    interval = Math.round((iteration / constant) * factor);
  }

  interval = Math.min(interval, 62);

  return { phase, interval, isMastered };
}
