export type CategoryId =
  | 'nature'
  | 'mountains'
  | 'ocean'
  | 'sunset'
  | 'animals'
  | 'anime'
  | 'cars'
  | 'space'
  | 'abstract'
  | 'amoled'
  | 'minimalist'
  | 'architecture'
  | 'flowers'
  | 'gaming';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  coverImage: string;
  iconName: string;
}

export type SortOption = 'trending' | 'latest' | 'popular';

export interface WallpaperAuthor {
  name: string;
  handle?: string;
  profileUrl: string;
}

export interface Wallpaper {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: CategoryId;
  tags: string[];
  width: number;
  height: number;
  author: WallpaperAuthor;
  source: string;
  license: string;
  licenseUrl: string;
  featured: boolean;
  downloadsCount: number;
  viewsCount: number;
  dateAdded: string; // ISO 8601
}

export type NavigationTab = 'home' | 'categories' | 'search' | 'favorites' | 'settings';

export type AdFormat = 'banner' | 'native-card';

export interface AdConfiguration {
  enabled: boolean;
  client?: string;
  slot?: string;
  format: AdFormat;
  testMode: boolean;
}
