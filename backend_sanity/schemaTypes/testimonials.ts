import { defineField, defineType } from "sanity";

export const testimonials = defineType({
  name: "testimonials",
  title: "Testimonials",
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
      name: "imageUrl",
      title: "ImageUrl",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "feedback",
      title: "Feedback",
      type: "string",
    }),
  ],
});

export default testimonials;