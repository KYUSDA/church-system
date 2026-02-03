// hero
export interface HeroButton {
  text: string;
  url: string;
  style?: "primary" | "secondary";
}

export interface HeroSection {
  title: string;
  description: string;
  image: string;
  buttons?: HeroButton[];
}

// about section
export interface AboutSection {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

// activities section
export interface Activity {
  image: string;
  title: string;
  description: string;
  period: string;
}


// leaders
export interface Leaders {
    name: string;
    role: string;
    photo: string;
}