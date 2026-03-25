/**
 * Integration type definitions, interfaces, and constants.
 * All other integration modules depend on these types.
 */

/** Unique slugs identifying each supported integration provider */
export enum IntegrationSlug {
  Slack = "slack",
  GitHub = "github",
  GitLab = "gitlab",
  Figma = "figma",
  Intercom = "intercom",
  Zendesk = "zendesk",
  Agents = "agents",
}

/** Lifecycle status of an integration connection */
export enum IntegrationStatus {
  Connected = "connected",
  Disconnected = "disconnected",
  Error = "error",
}

/**
 * Static metadata describing an integration provider.
 * One record per integration type — not per workspace.
 */
export interface IntegrationProvider {
  /** Unique provider identifier (e.g. UUID or slug-based string) */
  id: string;
  /** Machine-readable slug used as a stable key across the system */
  slug: IntegrationSlug;
  /** Human-readable display name */
  title: string;
  /** Short description shown in the integrations catalogue */
  description: string;
  /** URL to the integration's documentation page */
  docsUrl: string;
  /** Whether this provider supports the OAuth 2.0 flow */
  oauthSupported: boolean;
  /** URL of the provider's icon/logo asset */
  iconUrl: string;
}

/**
 * A workspace-scoped connection to an integration provider.
 * Created when a user successfully authenticates against a provider.
 */
export interface IntegrationConnection {
  /** Unique connection record identifier */
  id: string;
  /** Workspace this connection belongs to */
  workspaceId: string;
  /** Which provider this connection is for */
  slug: IntegrationSlug;
  /** Current lifecycle status of the connection */
  status: IntegrationStatus;
  /** ISO-8601 timestamp of when the connection was established */
  connectedAt: string;
  /** User ID of the workspace member who authorised the connection */
  connectedBy: string;
}

/**
 * Query parameters received on the OAuth callback route
 * (e.g. /integrations/oauth/callback?code=...&state=...).
 */
export interface OAuthCallbackParams {
  /** Short-lived authorisation code returned by the provider */
  code: string;
  /** Opaque value used to prevent CSRF; must match the value sent in the initial request */
  state: string;
  /** Provider-reported error code, present when the user denies access */
  error?: string;
  /** Human-readable description of the provider-reported error */
  error_description?: string;
}

/** Structured error type used across integration operations */
export type IntegrationError = {
  /** Machine-readable error code */
  code:
    | "OAUTH_FAILED"
    | "TOKEN_EXCHANGE_FAILED"
    | "CONNECTION_NOT_FOUND"
    | "PROVIDER_UNAVAILABLE"
    | "INVALID_STATE"
    | "UNKNOWN_ERROR";
  /** Human-readable error message */
  message: string;
  /** Optional upstream error details from the provider */
  details?: unknown;
};
