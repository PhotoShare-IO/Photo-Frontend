export type Props = {
  imageUrl: string;
  name: string;
  desc: string;
};

export type PostData = {
  id: number;
  file_url?: string;
  name?: string;
  description?: string;
  album: {
    id: number;
    name: string;
  };
};
