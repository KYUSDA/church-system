import { defineField, defineType } from "sanity";

export const families = defineType({
  name: "families",
  title: "Families",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "imgUrl",
      title: "ImageUrl",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "locationUrl",
      title: "LocationUrl",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        defineField({
          name: "tag",
          title: "Tag",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "leaders",
      title: "Leaders",
      type: "array",
      of: [
        defineField({
          name: "leader",
          title: "Leader",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "leaderUrl",
              title: "LeaderUrl",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "members",
      title: "Members",
      type: "array",
      of: [
        defineField({
          name: "member",
          title: "Member",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "memberUrl",
              title: "MemberUrl",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});

export default families;