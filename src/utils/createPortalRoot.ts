// utils/createPortalRoot.ts
export function createPortalRoot(id: string): HTMLElement {
  let root = document.getElementById(id);

  if (!root) {
    root = document.createElement("div");
    root.setAttribute("id", id);
    root.style.position = "fixed";
    root.style.top = "0";
    root.style.left = "0";
    root.style.width = "100vw";
    root.style.height = "100vh";
    root.style.zIndex = "999999999";
    document.body.appendChild(root);
  }

  return root;
}
