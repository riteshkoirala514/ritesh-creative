// Re-export everything from db.ts — this is now the single source of truth
// The MDX files are seed data only. All reads come from SQLite.
export {
  getAllPosts,
  getPostsByCategory,
  getPostBySlug,
  getFeaturedPosts,
  getLatestPosts,
  getRelatedPosts,
  getPostsBySeries,
  getPostsByFormat,
  getPostById,
  getAllPostsAdmin,
  createPost,
  updatePost,
  deletePost,
  getAllSeries,
  getSeriesBySlug,
  createSeries,
  updateSeries,
  deleteSeries,
  getDreams,
  createDream,
  toggleDream,
  deleteDream,
  getProfile,
  updateProfile,
  addSubscriber,
  getSubscribers,
  initDatabase,
} from './db';

export type { Dream, Profile, SocialLink } from './db';
