export const routeImporters = {
  about: () => import("../pages/about"),
  projects: () => import("../pages/projects"),
  contact: () => import("../pages/contact"),
  isometric2048: () => import("../pages/isometric2048"),
};

export const preloadRoute = (routeKey) => {
  const importer = routeImporters[routeKey];

  if (importer) {
    void importer();
  }
};
