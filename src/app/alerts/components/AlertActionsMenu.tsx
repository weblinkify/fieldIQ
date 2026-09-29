import {
  Check,
  Eye,
  MoreHorizontal,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";

interface AlertActionsMenuProps {
  isResolved: boolean;
  onAcknowledge: () => void;
  onUnacknowledge: () => void;
  onViewDetails?: () => void;
}

export function AlertActionsMenu({
  isResolved,
  onAcknowledge,
  onUnacknowledge,
  onViewDetails,
}: AlertActionsMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = () => {
      setOpen(false);
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, [open]);

  const handleToggle = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setOpen((previous) => !previous);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
      onClick={(event) =>
        event.stopPropagation()
      }
    >
      <button
        type="button"
        className="header-btn"
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          cursor: "pointer",
        }}
        aria-label="Alert actions"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <MoreHorizontal size={17} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 38,
            zIndex: 50,
            width: 170,
            padding: 4,
            borderRadius: 10,
            border:
              "1px solid var(--border-primary)",
            background:
              "var(--bg-secondary)",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <button
            type="button"
            onClick={() => {
              onViewDetails?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Eye size={14} />
            View details
          </button>

          {isResolved ? (
            <button
              type="button"
              onClick={() => {
                onUnacknowledge();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <RotateCcw size={14} />
              Mark unresolved
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onAcknowledge();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Check size={14} />
              Acknowledge
            </button>
          )}
        </div>
      )}
    </div>
  );
}