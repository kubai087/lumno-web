import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Dialog } from "../ui/dialog";
import { CommunityQrDialogPanel, type CommunityQrDialogContent } from "./CommunityQrDialogPanel";

/*
 * The community QR dialog, mounted on first use. Its triggers are static HTML
 * (see communityQrTriggerAttributes), so pages that only need the dialog on a
 * click never download React up front; src/scripts/community-qr.ts imports
 * this module when a trigger is pressed.
 */

type OpenRequest = { content: CommunityQrDialogContent; trigger: HTMLElement; returnFocus: HTMLElement | null };
type OpenHandler = (request: OpenRequest) => void;

let openHandler: OpenHandler | null = null;
let pendingRequest: OpenRequest | null = null;

function CommunityQrDialogHost() {
  const [request, setRequest] = useState<OpenRequest | null>(null);
  const [open, setOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    openHandler = (next) => {
      returnFocusRef.current = next.returnFocus;
      setRequest(next);
      setOpen(true);
    };
    if (pendingRequest) openHandler(pendingRequest);
    pendingRequest = null;
    return () => {
      openHandler = null;
    };
  }, []);

  useEffect(() => {
    // Only the standalone buttons announce the dialog; menu items close with their menu.
    if (request?.trigger.getAttribute("aria-haspopup") === "dialog") {
      request.trigger.setAttribute("aria-expanded", String(open));
    }
  }, [open, request]);

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <CommunityQrDialogPanel
        {...request.content}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusRef.current?.focus();
        }}
      />
    </Dialog>
  );
}

export function openCommunityQrDialog(request: OpenRequest) {
  if (openHandler) {
    openHandler(request);
    return;
  }
  pendingRequest = request;
  const container = document.createElement("div");
  container.dataset.communityQrRoot = "";
  document.body.append(container);
  createRoot(container).render(<CommunityQrDialogHost />);
}
