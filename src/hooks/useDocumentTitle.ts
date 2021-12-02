export const useDocumentTitle = (title: string) => {
  document.title = title || import.meta.env.VITE_APP_TITLE?.toString();
};
