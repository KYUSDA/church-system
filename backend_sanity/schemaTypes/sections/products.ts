import {defineType, defineField} from 'sanity'
/*
        title: string
        description: string
        products:{
        image: image
        price: number
        tags: array of strings
        inStock: boolean
        }

*/

export const productsSection = defineType({
  name: 'productsSection',
  title: 'Products Section',
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
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        defineField({
          name: 'product',
          title: 'Product',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
            }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'inStock',
              title: 'In Stock',
              type: 'boolean',
            }),
          ],
        }),
      ],
    }),
  ],
})