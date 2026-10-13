import React from 'react';
import { 
  Clock, 
  Hourglass, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ShieldCheck, 
  Ban, 
  CheckCheck 
} from 'lucide-react';

const STATUS_CONFIGS = {
  pending_payment: {
    label: "Pending payment",
    icon: Clock,
    color: "#B45309",
    bg: "#FEF3C7",
    border: "#FCD34D"
  },
  awaiting_approval: {
    label: "Awaiting owner approval",
    icon: Hourglass,
    color: "#5630B5",
    bg: "#F1ECFF",
    border: "#D8B4FE"
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    color: "#065F46",
    bg: "#D1FAE5",
    border: "#6EE7B7"
  },
  declined: {
    label: "Declined",
    icon: XCircle,
    color: "#991B1B",
    bg: "#FEE2E2",
    border: "#FCA5A5"
  },
  refund_pending: {
    label: "Refund pending",
    icon: RotateCcw,
    color: "#4338CA",
    bg: "#E0E7FF",
    border: "#A5B4FC"
  },
  refunded: {
    label: "Refunded",
    icon: ShieldCheck,
    color: "#1E40AF",
    bg: "#DBEAFE",
    border: "#93C5FD"
  },
  cancelled: {
    label: "Cancelled",
    icon: Ban,
    color: "#4B5563",
    bg: "#F3F4F6",
    border: "#E5E7EB"
  },
  completed: {
    label: "Completed",
    icon: CheckCheck,
    color: "#065F46",
    bg: "#ECFDF5",
    border: "#A7F3D0"
  },
  expired: {
    label: "Expired",
    icon: Clock,
    color: "#6B7280",
    bg: "#F9FAFB",
    border: "#E5E7EB"
  }
};

export const BOOKING_STATUSES = Object.keys(STATUS_CONFIGS);

export default function StatusBadge({ status, size = 'md', className = '' }) {
  const config = STATUS_CONFIGS[status] || STATUS_CONFIGS.awaiting_approval;
  const Icon = config.icon;
  const isSmall = size === 'sm';

  return (
    <span
      className={`status-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '4px' : '6px',
        padding: isSmall ? '2px 8px' : '4px 10px',
        borderRadius: '9999px',
        fontSize: isSmall ? '0.72rem' : '0.8rem',
        fontWeight: 600,
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        whiteSpace: 'nowrap'
      }}
    >
      <Icon size={isSmall ? 12 : 14} />
      <span>{config.label}</span>
    </span>
  );
}
