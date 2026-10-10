import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import type { CommunityPanel as CommunityPanelContent } from "../../lib/community-panel";
import { Dialog } from "../ui/dialog";
import { CommunityPanel } from "./CommunityPanel";

/*
 * The community panel, mounted on first use. Its triggers are static HTML (see
 * communityTriggerAttributes), so pages that only need the panel on a click
 * never download React up front; src/scripts/community-panel.ts imports this
 * module when a trigger is pressed.
 */

type OpenRequest = { panel: CommunityPanelContent; trigger: HTMLElement; returnFocus: HTMLElement | null };
type OpenHandler = (request: OpenRequest) => void;

let openHandler: OpenHandler | null = null;
let pendingRequest: OpenRequest | null = null;

function CommunityPanelHost() {
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
      <CommunityPanel
        panel={request.panel}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusRef.current?.focus();
        }}
      />
    </Dialog>
  );
}

export function openCommunityPanel(request: OpenRequest) {
  if (openHandler) {
    openHandler(request);
    return;
  }
  pendingRequest = request;
  const container = document.createElement("div");
  container.dataset.communityPanelRoot = "";
  document.body.append(container);
  createRoot(container).render(<CommunityPanelHost />);
}
