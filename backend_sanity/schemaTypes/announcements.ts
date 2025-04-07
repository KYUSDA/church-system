import { defineField, defineType } from "sanity";

export const announcements=  defineType({
  name: "announcements",
  title: "Announcements",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "organisation",
      title: "Organisation",
      type: "string",
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
    }),
    defineField({
      name: "imageUrl",
      title: "ImageUrl",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "announce",
      title: "Announce",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
    }),
  ],
});