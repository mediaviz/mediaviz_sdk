'use strict';

// React bindings, reachable at "<pkg>/react".
//
// Deliberately outside the package barrel: this is the only file that requires
// react, so keeping it on a subpath leaves the core SDK importable from plain
// modules, background tasks, and tests with no React in scope. All the actual
// lifecycle logic lives in session.js; this file only mirrors it into state.

const React = require('react');

const { createSession } = require('./session');

const MediaVizContext = React.createContext(null);

/**
 * Provides an authenticated MediaViz client to the tree.
 *
 * Pass the MediaViz class itself as a prop — see session.js for why it cannot
 * be imported here.
 */
function MediaVizProvider(props) {
  const { MediaViz, config, store, openAuthSession, children } = props;

  const [ready, setReady] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState(null);

  const session = React.useMemo(
    () =>
      createSession({
        MediaViz,
        config,
        store,
        openAuthSession,
        onTokens: (tokens) => setAccessToken(tokens?.accessToken ?? tokens?.access_token ?? null),
      }),
    [MediaViz, config, store, openAuthSession]
  );

  React.useEffect(() => {
    let cancelled = false;
    // `ready` gates the tree on the one-time keychain read, so it must flip even
    // when there is nothing stored or the read fails.
    session.restore().finally(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [session]);

  const signIn = React.useCallback((overrides) => session.signIn(overrides), [session]);
  const signOut = React.useCallback(() => session.signOut(), [session]);

  const value = React.useMemo(
    () => ({ client: session.client, ready, signedIn: Boolean(accessToken), signIn, signOut }),
    [session, ready, accessToken, signIn, signOut]
  );

  return React.createElement(MediaVizContext.Provider, { value }, children);
}

function useMediaViz() {
  const value = React.useContext(MediaVizContext);
  if (!value) throw new Error('useMediaViz must be used inside a <MediaVizProvider>');
  return value;
}

module.exports = { MediaVizProvider, useMediaViz, MediaVizContext };
