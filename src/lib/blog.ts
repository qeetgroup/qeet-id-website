import { headingId } from "@/lib/inline";

// Engineering posts. They live in code (not a CMS) so the site builds offline.
//
// Each post describes how Qeet ID works, so each is checked against
// qeet-id-server `develop` on the date in `checked`, and annotated with the
// files that bear it out. The posts were first written for the site in July
// 2026 with earlier dates than either repository; they were rewritten against
// the code and are dated from their first real publication, 30 Oct 2026.

export interface BlogPost {
  slug: string;
  title: string;
  /** The standfirst: one sentence under the title, and the page description. */
  description: string;
  /** ISO date the post was published, e.g. "2026-10-30". */
  publishedAt: string;
  /** ISO date the post was last checked against the code. */
  checked: string;
  author: string;
  /** What part of Qeet ID it is about, in a word or two. */
  topic: string;
  tags: string[];
  /** Where the post's subject lives on this site. */
  more: { label: string; href: string };
  /**
   * The body: paragraphs separated by blank lines, `## Heading` lines, `- `
   * list items, and fenced code — the fence's info string is the language,
   * then an optional caption ("```go The lock each write takes"). Inline runs
   * are lib/inline.ts's.
   */
  body: string;
}

export const posts: BlogPost[] = [
  /* develop 65648a7: internal/operations/audit/audit.go (chainSeed, PlatformChainShards = 16,
   * canonicalize → hashHex, lockChain), verifier.go (ChainPrevHashMismatch, checkpoints,
   * chainCheckpointGone); no signature or external anchor anywhere in the package. */
  {
    slug: "audit-log-hash-chain",
    title: "How we made our audit log tamper-evident",
    description:
      "Each entry carries the SHA-256 hash of the one before it, is written in the same transaction as the change it records, and can be checked end to end.",
    publishedAt: "2026-10-30",
    checked: "2026-10-30",
    author: "Sai Mareedu",
    topic: "Audit log",
    tags: ["security", "audit", "postgres"],
    more: { label: "The audit log", href: "/product/audit-log" },
    body: `An audit log is worth what its readers can trust it with. Anyone with write access to the database could change a row, or delete one, and an ordinary table would never say so. So Qeet ID chains its audit log: every entry carries the hash of the entry before it, and changing or removing one breaks every link that follows.

## The chain

Every entry carries two hashes:

- \`prev_hash\` — the \`row_hash\` of the entry before it in the same chain. The first entry's is sixty-four zeros.
- \`row_hash\` — the SHA-256 of the entry's canonical JSON: its ID, organisation, actor, action, resource, IP address, user agent, request ID, metadata, time and its own \`prev_hash\`.

Because \`prev_hash\` is part of what is hashed, each entry commits to everything before it. Each organisation has a chain of its own; events that belong to no organisation go on one of sixteen platform chains.

## Written with the change it records

An entry is written in the same database transaction as the change it records, so the two commit together or not at all. There is no moment when a change exists without its record.

Two writes to one chain must not both claim the same \`prev_hash\`. So each write first takes that chain's advisory lock, which Postgres holds until the transaction ends:

\`\`\`go The lock each write takes
key := "audit:" + tenantID.String()
_, err := tx.Exec(ctx, \`SELECT pg_advisory_xact_lock(hashtextextended($1, 0))\`, key)
\`\`\`

A busy organisation queues only behind itself. Platform events take their chain from their database connection, so concurrent writers spread across the sixteen chains, and a transaction only ever holds one of their locks.

## Checking it

\`/verify\` walks a chain from its first entry, recomputes every hash, and says where the chain breaks and why: a \`prev_hash\` that is not the previous entry's \`row_hash\`, or a \`row_hash\` that no longer matches its entry.

A scheduled check goes further. It records a checkpoint — the last entry it found intact — and the next run starts there, first making sure that entry is unchanged. If the entry a checkpoint names has gone, the chain is reported broken.

## What it does not prove

The chain shows that the log agrees with itself. It is not signed, or anchored anywhere outside the database, so the newest entries — those written since the last scheduled check — could be removed without a trace. That is the gap a signature, or an outside anchor, would close.`,
  },

  /* develop 65648a7: internal/platform/observability/logging/redact.go (sensitiveKeys: 43,
   * sensitiveSuffixes: token/secret/password/passphrase, partialKeys: email/phone, maskEmail,
   * StripURLCredentials, scrubKeyValues, the "code"/"error_code" note, LogValuer), redact_test.go
   * (slog.NewJSONHandler, json.Unmarshal). */
  {
    slug: "log-redaction-without-regret",
    title: "Log redaction without regret",
    description:
      "One slog handler masks passwords, tokens and secrets in every record before it is written — keys, nested groups and messages included.",
    publishedAt: "2026-10-30",
    checked: "2026-10-30",
    author: "Sai Mareedu",
    topic: "Logging",
    tags: ["observability", "security", "go"],
    more: { label: "Data protection", href: "/security#data" },
    body: `If a logger ever writes \`password=hunter2\`, every system that reads the logs now holds a password. Qeet ID's logs pass through one handler that masks secrets before any record is written — wherever the record is going.

## One handler, every call site

\`RedactingHandler\` wraps the \`slog.Handler\` the server logs through. No call site changes: it rewrites each record on the way through and passes the clean copy on.

For each attribute it normalises the key — lower case, with \`_\` and \`-\` dropped, so \`clientSecret\`, \`client-secret\` and \`CLIENT_SECRET\` are one key — and then:

- replaces the value with \`[REDACTED]\` for forty-three known keys: passwords, tokens, client and signing secrets, one-time and authorization codes, cookies and \`Authorization\` headers, private keys, SAML responses and database URLs;
- does the same for any key ending in \`token\`, \`secret\`, \`password\` or \`passphrase\`, so \`reset_token\` and \`dbPassword\` are caught without being listed;
- masks email addresses and phone numbers in part, so a log can still tell one person from another without naming them: \`a***@example.com\`, \`***1234\`.

\`\`\`go An email address keeps its first letter and its domain
func maskEmail(s string) string {
	if s == "" {
		return s
	}
	at := strings.IndexByte(s, '@')
	if at <= 0 {
		return RedactedValue
	}
	local := s[:at]
	if len(local) <= 1 {
		return "*" + s[at:]
	}
	return local[:1] + "***" + s[at:]
}
\`\`\`

Groups are walked as well, so an \`email\` inside \`slog.Group("user", …)\` is masked like one at the top level.

## The message as well

Secrets also turn up in messages and errors: a connection string in a failed dial, a token in a URL. The handler removes the credentials from any URL in the message — \`nats://user:pass@host:4222\` becomes \`nats://host:4222\` — and blanks the value of any secret-named \`key=value\` pair.

## One deliberate cost

\`code\` is always redacted. It is the natural key for a one-time code or an OAuth authorization code, and the one harmless use — a machine-readable error identifier — logs as \`error_code\` instead.

## Tested where it matters

The tests write through the real JSON handler and read the JSON back, so they check what a log sink would receive, not the record in memory. The handler does not look inside other structs: a type that holds a secret implements \`slog.LogValuer\`, and says for itself what may be logged.`,
  },

  /* develop 65648a7: internal/platform/crypto/tokens/jwt.go (package doc: ES256, kid = RFC 7638
   * thumbprint, missing/unknown kid rejected; keyFunc; validMethods = ES256; candidate/active/
   * retired; JWKS lists active, candidates and retired keys in grace), config.go
   * (JWT_SIGNING_KEY_RETIRE_GRACE default 720h; must cover ACCESS_TOKEN_TTL and be ≥ 1h;
   * Validate, outside dev only; JWT_ACTIVATE_SIGNING_KEY two-step rollout). */
  {
    slug: "kid-enforcement",
    title: "Why every JWT we sign carries a kid",
    description:
      "Every token Qeet ID signs names its key, and keys rotate in two steps — so rotating the signing key signs nobody out.",
    publishedAt: "2026-10-30",
    checked: "2026-10-30",
    author: "Sai Mareedu",
    topic: "Tokens",
    tags: ["security", "jwt", "oauth"],
    more: { label: "Tokens and keys", href: "/security#tokens" },
    body: `A JWT carries no record of which key signed it unless the signer writes one: the \`kid\` header. Leave it out, and on the day the signing key rotates, every token still in flight becomes a puzzle — try every key, or reject them all.

## Every token names its key

Qeet ID signs its access and ID tokens with ES256 and nothing else, and every token carries a \`kid\`: the RFC 7638 thumbprint of the key that signed it. Verification looks the key up by that \`kid\`, and refuses a token whose \`kid\` is missing, unknown, or names a retired key past its grace window.

\`\`\`go The key comes from the kid, or the token is refused
func (i *Issuer) keyFunc(t *jwt.Token) (any, error) {
	raw, ok := t.Header["kid"]
	if !ok {
		return nil, errors.New("missing kid header")
	}
	kid, ok := raw.(string)
	if !ok || kid == "" {
		return nil, errors.New("missing kid header")
	}
	i.mu.RLock()
	k, ok := i.verifiers[kid]
	i.mu.RUnlock()
	if !ok {
		return nil, fmt.Errorf("unknown kid: %s", kid)
	}
	if k.status == "retired" && k.retireAt != nil && !time.Now().Before(*k.retireAt) {
		return nil, fmt.Errorf("expired retired kid: %s", kid)
	}
	return k.pub, nil
}
\`\`\`

The parser accepts ES256 alone, so a token that claims another algorithm — \`none\`, or HS256 forged with the public key — fails before any key is looked up.

## Rotation in two steps

Signing keys live in a registry every server shares, each one a \`candidate\`, \`active\` or \`retired\`.

- **Stage.** A new key goes in as a candidate on every server. It signs nothing yet, but it is already in the JWKS, so relying parties can fetch it before they meet a token signed with it.
- **Activate.** A second rollout promotes it. New tokens carry its \`kid\`, and the previous key retires.
- **Retire.** A retired key signs nothing, and still verifies until its grace window ends — thirty days by default, and never shorter than the access-token lifetime or an hour: outside development, the server will not start with less.

So rotating the signing key signs nobody out: every token in flight was signed by a key that still verifies.`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Posts sorted newest-first, suitable for the index page. */
export function listPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt) || posts.indexOf(a) - posts.indexOf(b),
  );
}

/** Minutes to read at 220 words a minute, code included, never less than one. */
export function readingMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(post.body.split(/\s+/).filter(Boolean).length / 220));
}

/**
 * Posts related to a given one — ranked by shared tags, newest-first as the
 * tiebreaker. Excludes the post itself; capped at `limit`.
 */
export function relatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  return listPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({ post: p, score: p.tags.filter((t) => current.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

/**
 * The body format, parsed: paragraphs, `## ` headings, `- ` lists and fenced
 * code with an optional caption. Small on purpose — a full markdown parser
 * for three posts would be more surface than the posts.
 */
export type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string; id: string }
  | { kind: "ul"; items: string[] }
  | { kind: "code"; text: string; lang?: string; caption?: string };

export function parseBody(body: string): BlogBlock[] {
  const out: BlogBlock[] = [];
  const lines = body.split("\n");
  const isBreak = (l: string) =>
    l.trim() === "" || l.startsWith("## ") || l.startsWith("```") || l.startsWith("- ");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (line.startsWith("```")) {
      const [lang, ...caption] = line.slice(3).trim().split(" ");
      const buf: string[] = [];
      i++;
      while (i < lines.length && !(lines[i] ?? "").startsWith("```")) buf.push(lines[i++] ?? "");
      out.push({
        kind: "code",
        text: buf.join("\n"),
        lang: lang || undefined,
        caption: caption.join(" ") || undefined,
      });
      i++;
    } else if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      out.push({ kind: "h2", text, id: headingId(text) });
      i++;
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i] ?? "").startsWith("- ")) {
        items.push((lines[i] ?? "").slice(2).trim());
        i++;
      }
      out.push({ kind: "ul", items });
    } else if (line.trim() === "") {
      i++;
    } else {
      const buf: string[] = [];
      while (i < lines.length && !isBreak(lines[i] ?? "")) buf.push(lines[i++] ?? "");
      out.push({ kind: "p", text: buf.join(" ") });
    }
  }
  return out;
}
