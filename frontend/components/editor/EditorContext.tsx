import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { FlaggedToken, ProofreaderStats } from '@/types/proofreader';

interface EditorContextType {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  flaggedTokens: FlaggedToken[];
  setFlaggedTokens: React.Dispatch<React.SetStateAction<FlaggedToken[]>>;
  stats: ProofreaderStats;
  setStats: React.Dispatch<React.SetStateAction<ProofreaderStats>>;
  currentToken: FlaggedToken | null;
  setCurrentToken: React.Dispatch<React.SetStateAction<FlaggedToken | null>>;
  showProofreader: boolean;
  setShowProofreader: React.Dispatch<React.SetStateAction<boolean>>;
  applySuggestion: (suggestion: string, token: FlaggedToken) => void;
  maxCharCount: number;
  setMaxCharCount: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({
  lang: initialLang,
  maxCharCount: initialMaxCharCount = 1000,
  showProofreader: showProofreaderDefault = false,
  children,
}: {
  lang: string;
  maxCharCount?: number;
  showProofreader?: boolean;
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<string>(initialLang);
  const [text, _setText] = useState('');
  const [flaggedTokens, setFlaggedTokens] = useState<FlaggedToken[]>([]);
  const [stats, setStats] = useState<ProofreaderStats>({
    token_count: 0,
    flagged_count: 0,
    correctness: 0,
  });
  const [currentToken, setCurrentToken] = useState<FlaggedToken | null>(null);
  const [showProofreader, setShowProofreader] = useState(
    showProofreaderDefault
  );
  const [maxCharCount, setMaxCharCount] = useState(initialMaxCharCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLang(initialLang);
  }, [initialLang]);

  // Add a setter to prevent text from exceeding the max char count
  const setText = useCallback(
    (update: string | ((prev: string) => string)) => {
      _setText((prev) => {
        const newText = typeof update === 'function' ? update(prev) : update;
        return newText.slice(0, maxCharCount);
      });
    },
    [maxCharCount]
  );

  const applySuggestion = useCallback(
    (suggestion: string, token: FlaggedToken) => {
      setText(
        text.slice(0, token.offset) +
          suggestion +
          text.slice(token.offset + token.token.length)
      );

      setFlaggedTokens(
        (prev) => prev?.filter((t) => t.offset !== token.offset) || []
      );
    },
    [text, setText]
  );

  return (
    <EditorContext.Provider
      value={{
        lang,
        setLang,
        text,
        setText,
        flaggedTokens,
        setFlaggedTokens,
        stats,
        setStats,
        currentToken,
        setCurrentToken,
        showProofreader,
        setShowProofreader,
        applySuggestion,
        maxCharCount,
        setMaxCharCount,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};
