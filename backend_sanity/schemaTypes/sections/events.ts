import { defineField, defineType } from "sanity";
// type TEvent ={
//     _id: string;
//     title: string;
//     description: string;
//     events: {
//         title: string;
//         description: string;
//         imageUrl: string;
//           location: string;
//         start_date: string;
//         end_date: string;
//         links?: string[];
//     }
// }

export const eventsSection = defineType({
  name: 'eventsSection',
  title: 'Events Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'imgUrl',
              title: 'ImageUrl',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
            },
            {
              name: 'start_date',
              title: 'Start Date',
              type: 'datetime',
            },
            {
              name: 'end_date',
              title: 'End Date',
              type: 'datetime',
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
    }),
  ],
})