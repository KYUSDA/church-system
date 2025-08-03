

export interface Sermon {
  id: number;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  thumbnail: string;
  description: string;
  category: string;
  videoUrl: string;
  views?: number;
  likes?: number;
}


  export const sermons: Sermon[] = [
    {
      id: 1,
      title: "The Power of Faith",
      preacher: "Pastor John Smith",
      date: "2023-10-15",
      duration: "45:22",
      thumbnail:
        "https://www.youtube.com/embed/QwU7ZlrYqP8?si=tcf96bdlScPGjb9X",
      description:
        "Exploring how faith can move mountains and transform lives. This powerful message delves into the biblical foundations of faith and its practical applications in our daily walk with God.",
      category: "Faith",
      videoUrl: "VLkboslZTOy4vYb5",
      views: 1234,
      likes: 98,
    },
    {
      id: 2,
      title: "Walking in Love",
      preacher: "Pastor Sarah Johnson",
      date: "2023-10-08",
      duration: "38:15",
      thumbnail:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      description:
        "Understanding God's love and how to express it to others in practical ways.",
      category: "Love",
      videoUrl: "dQw4w9WgXcQ",
      views: 856,
      likes: 72,
    },
    {
      id: 3,
      title: "Hope in Difficult Times",
      preacher: "Pastor Michael Brown",
      date: "2023-10-01",
      duration: "42:08",
      thumbnail:
        "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=800&q=80",
      description:
        "Finding hope and strength when facing life's challenges through biblical wisdom.",
      category: "Hope",
      videoUrl: "kJQP7kiw5Fk",
      views: 2105,
      likes: 156,
    },
  ];