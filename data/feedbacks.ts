export type FeedbackItem = {
  text: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
};

export const feedbackItems: FeedbackItem[] = [
  {
    text: 'The API documentation is simply world-class. It made integration into our existing stack seamless and saved us weeks of development time.',
    name: 'Sarah Jenkins',
    role: 'CTO, Vercel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
  },
  {
    text: 'I was skeptical at first, but the performance gains are undeniable. Our dashboard load times dropped by 40% instantly.',
    name: 'Marcus Chen',
    role: 'Senior Dev, Linear',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    rating: 5,
  },
  {
    text: 'Customer support actually responds with helpful code snippets, not just links to FAQs. A breath of fresh air in this industry.',
    name: 'Elena Rodriguez',
    role: 'Product Manager, Raycast',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    rating: 4,
  },
  {
    text: 'The design consistency across the platform is beautiful. It feels like a tool built by people who truly care about craftsmanship.',
    name: 'David Park',
    role: 'Designer, Figma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    rating: 5,
  },
];
