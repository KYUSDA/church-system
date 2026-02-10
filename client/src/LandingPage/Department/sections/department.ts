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

// videos
export interface Video {
  url: string;
  tag: string;
}

export interface VideosSection {
  title: string;
  videos: Video[];
}

// images 
export interface Image {
  url: string;
  altText: string;
}

export interface ImagesSection {
  title: string;
  description: string;
  tag: string;
  images: Image[];
}

// products
export interface Product {
  description?: string;
  image: string;
  price: number;
  tags: string[];
  inStock: boolean;
}

export interface ProductsSection {
  title: string;
  description: string;
  products: Product[];
}


// events
export interface Event {
  title: string;
  description: string;
  imgUrl: string;
  location: string;
  start_date: string;
  end_date: string;
  links?: string[];
}

export interface EventsSection {
  title: string;
  description: string;
  events: Event[];
}

// resources
interface Resource {
  image: string;
  title: string;
  description: string;
  link: string;
}

export interface ResourcesSection {
  title: string;
  description: string;
  resources: Resource[];
}


// CTA 
interface CTAButton {
  text: string;
  link: string;
  variant: "primary" | "secondary" | "outline";
}

export interface CTASection {
  title: string;
  content: string;
  image: string;
  buttons: CTAButton[];
}

// services
export interface Service {
  title: string;
  description: string;
}

export interface ServicesSection {
  title: string;
  services: Service[];
}


// theme
export interface ThemeSection {
  title: string;
  points: string[];
}

export interface ThemeArticle {
  title: string;
  highlight?: string;
  publishedAt?: string;
  author?: string;
  readTime?: string;
  intro?: string;
  sections?: ThemeSection[];
  closing?: string;
}