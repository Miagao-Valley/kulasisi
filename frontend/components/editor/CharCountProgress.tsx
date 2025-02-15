import CircularProgress from '../ui/circular-progress';

export default function CharCountProgress({
  charCount,
  maxCharCount,
}: {
  charCount: number;
  maxCharCount: number;
}) {
  const value = Math.floor((charCount / maxCharCount) * 100);
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground me-auto">
      <CircularProgress
        value={value}
        className="size-4"
        classNameProgress={value === 100 ? 'text-destructive' : ''}
      />
      {charCount}/{maxCharCount} characters
    </span>
  );
}
