/**
 * InspectIA — léxico de iconos.
 *
 * **Generado desde icons.json. No editar a mano:** editar el JSON y correr `npm run icons`.
 *
 * ICON mapea CONCEPTO DE NEGOCIO → glifo. Es la capa que hay que usar: si mañana un
 * concepto cambia de glifo, cambia acá y en ningún otro lado.
 */
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bot,
  Boxes,
  Building2,
  CalendarClock,
  Cctv,
  Check,
  CirclePause,
  CirclePlay,
  CircleSlash,
  CircleX,
  ClipboardList,
  Clock,
  Cog,
  Drone,
  Factory,
  Gauge,
  GitCommitHorizontal,
  HardHat,
  LayoutGrid,
  Linkedin,
  Lock,
  Mail,
  MessageCircle,
  Minus,
  Monitor,
  PackageCheck,
  Phone,
  ScanEye,
  Smartphone,
  TriangleAlert,
  Truck,
  Warehouse,
} from "lucide-react";

export const ICON = {
  oee: Gauge, // OEE
  realtime: Activity, // Tiempo real
  running: CirclePlay, // En producción
  stopped: CirclePause, // Detenido
  stopUnplanned: TriangleAlert, // Parada no planificada
  stopPlanned: CalendarClock, // Parada programada
  noData: CircleSlash, // Sin datos
  defect: CircleX, // Defecto / scrap
  company: Building2, // Empresa
  plant: Factory, // Planta
  line: GitCommitHorizontal, // Línea de producción
  machine: Cog, // Máquina
  sku: Boxes, // SKU
  warehouse: Warehouse, // Depósito
  shift: Clock, // Turno
  workOrder: ClipboardList, // Orden de producción
  operator: HardHat, // Operario
  terminal: Monitor, // Terminal de planta
  noPermission: Lock, // Sin permisos
  modules: LayoutGrid, // Módulos
  visionInspection: ScanEye, // Inspección por visión
  inbound: Truck, // Recepción de mercadería
  mobileCount: Smartphone, // Conteo desde el celular
  drone: Drone, // Dron
  camera: Cctv, // Cámara de seguridad
  outbound: PackageCheck, // Control de pedidos
  agent: Bot, // Agente de IA
  phone: Phone, // Teléfono
  email: Mail, // Correo
  linkedin: Linkedin, // LinkedIn
  whatsapp: MessageCircle, // WhatsApp
  included: Check, // Incluido en el plan
  notIncluded: Minus, // No incluido en el plan
} satisfies Record<string, LucideIcon>;

export type IconConcept = keyof typeof ICON;

/** Subconjunto aprobado de Lucide. Cualquier glifo fuera de esta lista se rechaza en review. */
export const ALLOWED_ICONS = [
  "activity",
  "antenna",
  "aperture",
  "arrow-down-to-line",
  "arrow-left",
  "arrow-right",
  "arrow-up-from-line",
  "badge-check",
  "ban",
  "banknote",
  "barcode",
  "bell",
  "bell-ring",
  "binary",
  "book-open",
  "bot",
  "boxes",
  "brain-cog",
  "briefcase",
  "building-2",
  "cable",
  "calculator",
  "calendar-clock",
  "calendar-days",
  "camera",
  "cctv",
  "chart-column",
  "chart-line",
  "chart-pie",
  "check",
  "chevron-down",
  "chevron-right",
  "circle-alert",
  "circle-check",
  "circle-dot",
  "circle-help",
  "circle-pause",
  "circle-play",
  "circle-slash",
  "circle-user",
  "circle-x",
  "circuit-board",
  "clipboard-check",
  "clipboard-list",
  "clock",
  "clock-arrow-up",
  "cloud",
  "cog",
  "columns-3",
  "construction",
  "contact",
  "container",
  "copy",
  "cpu",
  "database",
  "download",
  "drone",
  "droplet",
  "ellipsis-vertical",
  "external-link",
  "eye",
  "factory",
  "file-spreadsheet",
  "file-text",
  "filter",
  "flame",
  "focus",
  "folder",
  "forklift",
  "gauge",
  "git-commit-horizontal",
  "grid-2x2",
  "handshake",
  "hard-drive",
  "hard-hat",
  "headset",
  "history",
  "hourglass",
  "house",
  "info",
  "key",
  "languages",
  "laptop",
  "layers",
  "layout-dashboard",
  "layout-grid",
  "life-buoy",
  "link",
  "linkedin",
  "list",
  "list-checks",
  "loader",
  "lock",
  "log-in",
  "log-out",
  "mail",
  "map-pin",
  "menu",
  "message-circle",
  "minus",
  "monitor",
  "moon",
  "network",
  "package",
  "package-check",
  "package-open",
  "package-search",
  "package-x",
  "panel-left",
  "pencil",
  "percent",
  "phone",
  "plane",
  "plug-zap",
  "plus",
  "power",
  "presentation",
  "printer",
  "qr-code",
  "radar",
  "radio-tower",
  "receipt",
  "recycle",
  "refresh-cw",
  "rotate-ccw",
  "route",
  "ruler",
  "satellite-dish",
  "save",
  "scale",
  "scan-barcode",
  "scan-eye",
  "scan-line",
  "search",
  "server",
  "settings",
  "settings-2",
  "share-2",
  "shield-alert",
  "shield-check",
  "ship",
  "sigma",
  "sliders-horizontal",
  "smartphone",
  "sparkles",
  "sun",
  "table",
  "tablet",
  "target",
  "thermometer",
  "timer",
  "train-front",
  "trash-2",
  "trending-down",
  "trending-up",
  "triangle-alert",
  "trophy",
  "truck",
  "upload",
  "usb",
  "user",
  "user-check",
  "user-cog",
  "user-plus",
  "users",
  "video",
  "warehouse",
  "waypoints",
  "webhook",
  "wifi",
  "wifi-off",
  "workflow",
  "wrench",
  "x",
  "zap",
] as const;

export type AllowedIcon = (typeof ALLOWED_ICONS)[number];

/** Cuatro tamaños y ninguno más. No se acepta un número arbitrario, a propósito. */
export const ICON_SIZE = {
  meta: 14,
  ui: 16,
  empty: 20,
  brand: 24,
} as const;

export const ICON_STROKE = 1.5;
