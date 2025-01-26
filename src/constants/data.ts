export const posts = [
  {
    id: "6787a86f2d150b477483766b",
    title: "My Second Blog Post",
    content:
      "This is the content of my second blog post and it is still about technology. This is the content of my second blog post and it is still about technology This is the content of my second blog post and it is still about technology This is the content of my second blog post and it is still about technology",
    authorId: {
      id: "67879dda2d150b4774837262",
    },
    tags: ["coding", "javascript", "nextjs"],
    categories: ["technology"],
    createdAt: {
      date: "2025-01-15T12:22:07.055Z",
    },
    updatedAt: {
      date: "2025-01-15T12:22:07.055Z",
    },
  },
  {
    id: "6787ac902d150b4774837279",
    title: "A trial Blog Post",
    content:
      "Just trying if I can post. Hope I can make an addition to this?. Admin edit added. Just trying if I can post. Hope I can make an addition to this?. Admin edit added. Just trying if I can post. Hope I can make an addition to this?. Admin edit added",
    authorId: {
      id: "6787ac1b2d150b4774837276",
    },
    tags: ["not_coding", "trial"],
    categories: ["random"],
    createdAt: {
      date: "2025-01-15T12:39:44.804Z",
    },
    updatedAt: {
      date: "2025-01-15T12:46:03.136Z",
    },
  },
  {
    id: "6787b4262d150b4774837299",
    title: "My First Blog Post",
    content:
      "This is the content of my first blog post. This is the content of my first blog post. This is the content of my first blog post. This is the content of my first blog post.",
    authorId: {
      id: "67879dda2d150b4774837262",
    },
    tags: ["coding", "typescript"],
    categories: ["technology"],
    createdAt: {
      date: "2025-01-15T13:12:06.939Z",
    },
    updatedAt: {
      date: "2025-01-15T13:12:06.939Z",
    },
  },
  {
    id: "6787b4262d150b4774837292",
    title: "My First Blog Post",
    content:
      "This is the content of my first blog post. This is the content of my first blog post. This is the content of my first blog post. This is the content of my first blog post.",
    authorId: {
      id: "67879dda2d150b4774837262",
    },
    tags: ["coding", "typescript"],
    categories: ["technology"],
    createdAt: {
      date: "2025-01-15T13:12:06.939Z",
    },
    updatedAt: {
      date: "2025-01-15T13:12:06.939Z",
    },
  },
  {
    id: "6787ac902d150c4774837279",
    title: "A trial Blog Post",
    content:
      "Just trying if I can post. Hope I can make an addition to this?. Admin edit added. Just trying if I can post. Hope I can make an addition to this?. Admin edit added. Just trying if I can post. Hope I can make an addition to this?. Admin edit added ",
    authorId: {
      id: "6787ac1b2d150b4774837276",
    },
    tags: ["not_coding", "trial"],
    categories: ["random"],
    createdAt: {
      date: "2025-01-15T12:39:44.804Z",
    },
    updatedAt: {
      date: "2025-01-15T12:46:03.136Z",
    },
  },
  {
    id: "6787a86f2d150b477483726b",
    title: "My Second Blog Post",
    content:
      "This is the content of my second blog post and it is still about technology. This is the content of my second blog post and it is still about technology This is the content of my second blog post and it is still about technology This is the content of my second blog post and it is still about technology",
    authorId: {
      id: "67879dda2d150b4774837262",
    },
    tags: ["coding", "javascript", "nextjs"],
    categories: ["technology"],
    createdAt: {
      date: "2025-01-15T12:22:07.055Z",
    },
    updatedAt: {
      date: "2025-01-15T12:22:07.055Z",
    },
  },
];

export const comments = [
  {
    id: "6787b5939b3711944e2282eb",
    content: "This is a comment",
    postId: {
      id: "6787b4262d150b4774837299",
    },
    userId: {
      id: "6787a9052d150b477483726d",
    },
    createdAt: {
      date: "2025-01-15T13:18:11.292Z",
    },
    updatedAt: {
      date: "2025-01-15T13:18:11.292Z",
    },
  },
  {
    id: "6787b7129b3711944e2282f4",
    content: "This is a new comment",
    postId: {
      id: "6787b4262d150b4774837299",
    },
    userId: {
      id: "67879dda2d150b4774837262",
    },
    createdAt: {
      date: "2025-01-15T13:24:34.858Z",
    },
    updatedAt: {
      date: "2025-01-15T13:24:34.858Z",
    },
  },
];

export const users = [
  {
    id: "67879dda2d150b4774837262",
    name: "John Doe",
    email: "john@example.com",
    password: "*****",
    role: "Author",
  },
  {
    id: "6787a1d02d150b4774837264",
    name: "Jane Foe",
    email: "jane@example.com",
    password: "*****",
    role: "Admin",
  },
  {
    id: "6787a9052d150b477483726d",
    name: "Sam Read",
    email: "sam@example.com",
    password: "*****",
    role: "Reader",
  },
  {
    id: "6787ac1b2d150b4774837276",
    name: "Author Too",
    email: "author@example.com",
    password: "*****",
    role: "Author",
  },
];
