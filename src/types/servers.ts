export type ServerResponse = {
  name: string;
  distance: string;
};

export type Server = {
  id: string;
} & ServerResponse;
