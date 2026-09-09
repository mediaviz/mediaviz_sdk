// Auto-generated — do not edit

export interface TokenPair {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface TokenStore {
  load(): Promise<TokenPair>;
  save(tokens: unknown): Promise<void>;
  clear(): Promise<void>;
}

/** Contract of expo-web-browser's openAuthSessionAsync. */
export type OpenAuthSession = (
  url: string,
  redirectUri: string,
  options?: Record<string, unknown>
) => Promise<{ type: string; url?: string }>;

export interface SignInOverrides {
  openAuthSession?: OpenAuthSession;
  redirectUri?: string;
  state?: string;
  sessionOptions?: Record<string, unknown>;
}

export interface MediaVizProviderProps {
  /** The MediaViz class itself, imported from the package root. */
  MediaViz: new (config?: Record<string, unknown>) => any;
  config?: Record<string, unknown>;
  store?: TokenStore;
  openAuthSession?: OpenAuthSession;
  children?: unknown;
}

export interface MediaVizContextValue {
  client: any;
  /** False until persisted tokens have been read back on mount. */
  ready: boolean;
  signedIn: boolean;
  signIn(overrides?: SignInOverrides): Promise<Record<string, unknown>>;
  signOut(): Promise<void>;
}

export declare function MediaVizProvider(props: MediaVizProviderProps): unknown;
export declare function useMediaViz(): MediaVizContextValue;
export declare const MediaVizContext: unknown;
