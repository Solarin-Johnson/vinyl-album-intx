type Track = {
  trackNumber: number;
  title: string;
  duration: string;
  featuredArtists?: string[];
};

type Disc = {
  discNumber: number;
  title?: string;
  tracks: Track[];
};

type Album = {
  albumId: string;
  title: string;
  artist: string;
  releaseDate: string;
  coverUrl?: string;
  discs: Disc[];
};

export const ALBUM: Album = {
  albumId: "kendrick_mr_morale_2022",
  title: "Mr. Morale & The Big Steppers",
  artist: "Kendrick Lamar",
  releaseDate: "2022-05-13",
  coverUrl: "https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f",
  discs: [
    {
      discNumber: 1,
      title: "Big Steppers",
      tracks: [
        { trackNumber: 1, title: "United In Grief", duration: "4:15" },
        { trackNumber: 2, title: "N95", duration: "3:15" },
        { trackNumber: 3, title: "Worldwide Steppers", duration: "3:23" },
        {
          trackNumber: 4,
          title: "Die Hard",
          duration: "3:59",
          featuredArtists: ["Blxst", "Amanda Reifer"],
        },
        {
          trackNumber: 5,
          title: "Father Time",
          duration: "3:42",
          featuredArtists: ["Sampha"],
        },
        { trackNumber: 6, title: "Rich (Interlude)", duration: "1:43" },
        { trackNumber: 7, title: "Rich Spirit", duration: "3:22" },
        {
          trackNumber: 8,
          title: "We Cry Together",
          duration: "5:41",
          featuredArtists: ["Taylour Paige"],
        },
        {
          trackNumber: 9,
          title: "Purple Hearts",
          duration: "5:29",
          featuredArtists: ["Summer Walker", "Ghostface Killah"],
        },
      ],
    },
    {
      discNumber: 2,
      title: "Mr. Morale",
      tracks: [
        { trackNumber: 1, title: "Count Me Out", duration: "4:43" },
        { trackNumber: 2, title: "Crown", duration: "4:24" },
        {
          trackNumber: 3,
          title: "Silent Hill",
          duration: "3:40",
          featuredArtists: ["Kodak Black"],
        },
        { trackNumber: 4, title: "Savior (Interlude)", duration: "2:32" },
        {
          trackNumber: 5,
          title: "Savior",
          duration: "3:44",
          featuredArtists: ["Baby Keem", "Sam Dew"],
        },
        { trackNumber: 6, title: "Auntie Diaries", duration: "4:41" },
        {
          trackNumber: 7,
          title: "Mr. Morale",
          duration: "3:31",
          featuredArtists: ["Tanna Leone"],
        },
        {
          trackNumber: 8,
          title: "Mother I Sober",
          duration: "6:47",
          featuredArtists: ["Beth Gibbons"],
        },
        { trackNumber: 9, title: "Mirror", duration: "4:16" },
      ],
    },
    {
      discNumber: 3,
      title: "Bonus Disc",
      tracks: [{ trackNumber: 1, title: "The Heart Part 5", duration: "5:32" }],
    },
  ],
};
