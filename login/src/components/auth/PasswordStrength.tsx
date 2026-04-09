const getStrength = (pw: string) => {
  if (!pw) return { level: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { level: 1, label: "Weak", color: "#EF4444" };
  if (score === 2) return { level: 2, label: "Fair", color: "#F97316" };
  if (score === 3) return { level: 3, label: "Good", color: "#EAB308" };
  return { level: 4, label: "Strong", color: "#22C55E" };
};

const PasswordStrength = ({ password }: { password: string }) => {
  const { level, label, color } = getStrength(password);
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-colors duration-200"
            style={{ backgroundColor: i <= level ? color : "#E2E8F0" }} />
        ))}
      </div>
      <div className="flex justify-end mt-1">
        <span className="text-xs font-medium" style={{ color }}>{label}</span>
      </div>
      <p className="text-[11px] text-muted-foreground mt-0.5">
        Use uppercase, numbers & symbols for stronger password
      </p>
    </div>
  );
};

export default PasswordStrength;
