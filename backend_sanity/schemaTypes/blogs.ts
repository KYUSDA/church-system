import {defineType, defineField} from 'sanity'

const blogs = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      //   validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),

    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'}, // rich text
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'readingTime',
      type: 'number',
    }),

    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        {name: 'metaTitle', type: 'string'},
        {name: 'metaDescription', type: 'text'},
        {name: 'keywords', type: 'array', of: [{type: 'string'}]},
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
      media: 'thumbnail',
    },
  },
})

const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
  ],
});



 const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})


export {author, category, blogs}