type TCollaboratorWebsites = Record<string, string>;

const CollaboratorWebsites: TCollaboratorWebsites = {
  Someone: "https://www.google.com",
};

export function getCollaboratorWebsite(name: string): string | undefined {
  return CollaboratorWebsites[name];
}

export default CollaboratorWebsites;
