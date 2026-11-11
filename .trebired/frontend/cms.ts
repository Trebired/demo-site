const CMS_CONTENT_DIR = "content";

function editorOrigins(): string[] {
  return String(process.env.CMS_EDITOR_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
}

export { CMS_CONTENT_DIR, editorOrigins };
