export interface Track {
  trackNumber: number;
  title: string;
  duration: string;
  featuredArtists?: string[];
}

export interface Disc {
  discNumber: number;
  title?: string;
  tracks: Track[];
}

export interface Album {
  albumId: string;
  title: string;
  price: number;
  artist: string;
  liked: boolean;
  releaseDate: string;
  coverUrl: string;
  discs: Disc[];
}

export const ALBUM: Album = {
  albumId: "kendrick_gnx_2024",
  title: "GNX",
  artist: "Kendrick Lamar",
  price: 39.99,
  liked: false,
  releaseDate: "2024-11-22",
  coverUrl: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
  discs: [
    {
      discNumber: 1,
      title: "GNX",
      tracks: [
        { trackNumber: 1, title: "Wacced Out Murals", duration: "5:17" },
        { trackNumber: 2, title: "Squabble Up", duration: "2:37" },
        {
          trackNumber: 3,
          title: "Luther",
          duration: "2:57",
          featuredArtists: ["SZA"],
        },
        { trackNumber: 4, title: "Man at the Garden", duration: "3:53" },
        {
          trackNumber: 5,
          title: "Hey Now",
          duration: "3:37",
          featuredArtists: ["Dody6"],
        },
        { trackNumber: 6, title: "Reincarnated", duration: "4:12" },
        {
          trackNumber: 7,
          title: "TV Off",
          duration: "3:45",
          featuredArtists: ["Lefty Gunplay"],
        },
        {
          trackNumber: 8,
          title: "Dodger Blue",
          duration: "4:10",
          featuredArtists: ["Wallie the Sensei", "Roddy Ricch", "Siete7x"],
        },
        {
          trackNumber: 9,
          title: "Peekaboo",
          duration: "3:30",
          featuredArtists: ["AZChike"],
        },
        { trackNumber: 10, title: "Heart Pt. 6", duration: "4:05" },
        {
          trackNumber: 11,
          title: "GNX",
          duration: "3:50",
          featuredArtists: ["Hitta J3", "YoungThreat", "Peysoh"],
        },
        {
          trackNumber: 12,
          title: "Gloria",
          duration: "4:20",
          featuredArtists: ["SZA"],
        },
      ],
    },
  ],
};
