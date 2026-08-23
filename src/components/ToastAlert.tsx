"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface Props {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function ToastAlert({ title, message, actionLabel = "View Details", onAction }: Props) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 w-80 rounded-2xl overflow-hidden shadow-2xl rise-in">
      <div className="bg-gradient-to-br from-rose/90 to-rose/70 p-4 relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <AlertTriangle size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white font-medium text-sm">{title}</div>
            <p className="text-white/85 text-xs mt-1 leading-relaxed">{message}</p>
          </div>
        </div>
        {onAction && (
          <button
            onClick={onAction}
            className="mt-3 w-full bg-white/95 text-rose text-sm font-medium rounded-lg py-1.5 hover:bg-white transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
