export default {
  name: "families",
  title: "Families",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "link",
      title: "Link",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "imgUrl",
      title: "ImageUrl",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          name: "tag",
          title: "Tag",
          type: "string",
        },
      ],
    },
    {
      name: "leaders",
      title: "Leaders",
      type: "array",
      of: [
        {
          name: "leader",
          title: "Leader",
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "leaderUrl",
              title: "LeaderUrl",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "members",
      title: "Members",
      type: "array",
      of: [
        {
          name: "member",
          title: "Member",
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "memberUrl",
              title: "MemberUrl",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
