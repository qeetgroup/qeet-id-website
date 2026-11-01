/**
 * Icons for the capability pages' tabs, keyed by tab id. A module of its own so
 * the client Tab can import the icons without the page copy (a server
 * component cannot hand a component function to a client one).
 */
import {
  ArrowLeftRightIcon,
  AtSignIcon,
  BotIcon,
  BuildingComplexIcon,
  ClipboardCheckIcon,
  FingerprintPatternIcon,
  FolderSyncIcon,
  GlobeIcon,
  KeyRoundIcon,
  KeySquareIcon,
  LinkIcon,
  MailIcon,
  NetworkIcon,
  PlugIcon,
  PlugZapIcon,
  RadarIcon,
  RadioTowerIcon,
  ScaleIcon,
  ScanSearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  ShieldUserIcon,
  SlidersHorizontalIcon,
  TextSearchIcon,
  TvIcon,
  UserCheckIcon,
  UsersIcon,
  VaultIcon,
  WaypointsIcon,
} from "@qeetrix/icons";

export const TAB_ICONS = {
  // Authentication
  passkeys: FingerprintPatternIcon,
  passwords: KeyRoundIcon,
  "magic-links": MailIcon,
  social: GlobeIcon,
  company: AtSignIcon,
  // Enterprise SSO
  "saml-sp": PlugIcon,
  "oidc-connections": ShieldCheckIcon,
  "saml-idp": BuildingComplexIcon,
  discovery: ScanSearchIcon,
  // Directory sync
  scim: FolderSyncIcon,
  ldap: ServerIcon,
  groups: UsersIcon,
  // Authorization
  roles: UserCheckIcon,
  attributes: SlidersHorizontalIcon,
  relationships: WaypointsIcon,
  authzen: ScaleIcon,
  "address-rules": NetworkIcon,
  // Audit log
  chain: LinkIcon,
  search: TextSearchIcon,
  siem: RadioTowerIcon,
  anomalies: RadarIcon,
  evidence: ClipboardCheckIcon,
  privacy: ShieldUserIcon,
  // AI agents and machines
  agents: BotIcon,
  "api-keys": KeySquareIcon,
  delegation: ArrowLeftRightIcon,
  devices: TvIcon,
  mcp: PlugZapIcon,
  vault: VaultIcon,
} as const;

export type TabIconId = keyof typeof TAB_ICONS;
