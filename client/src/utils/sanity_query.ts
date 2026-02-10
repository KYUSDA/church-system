import groq from "groq";
import { client } from "@/utils/client";

export const getDepartmentById = (id: string) => {
  const query = groq`*[_type == "departments" && _id == $id][0]{
    _id,
    title,
    description,
    imgUrl,
    sections[]{
      _type,
      _key,
      _type == "heroSection" => {
        title,
        description,
        "image": image.asset->url,
        buttons[]{
          text,
          url,
          style
        }
      },
      _type == "aboutSection" => {
        title,
        subtitle,
        description,
        "image": image.asset->url
      },
      _type == "activitiesSection" => {
        title,
        description,
        activities[]{
          "image": image.asset->url,
          title,
          description,
          period
        }
      },
      _type == "leadersSection" => {
        title,
        description,
        leaders[]{
          name,
          role,
          "photo": photo.asset->url
        }
      },
      _type == "videosSection" => {
        title,
        videos[]{
          url,
          tag
        }
      },
      _type == "imagesSection" => {
        title,
        description,
        tag,
        images[]{
          "imageurl": imageurl.asset->url,
          altText
        }
      },
      _type == "productsSection" => {
        title,
        description,
        products[]{
        description,
          "image": image.asset->url,
          price,
          tags,
          inStock
        }
      },
      _type == "eventsSection" => {
        title,
        description,
        events[]{
          title,
          description,
          start_date,
          end_date,
          location,
          "imgUrl": imgUrl.asset->url
        }
      },
      _type == "resourcesSection" => {
        title,
        description,
        resources[]{
          title,
          description,
          link,
          image
        }
      },
      _type == "servicesSection" => {
        title,
        services[]{
          title,
          description
        }
      },
      _type == "themesSection" => {
        title,
        highlight,
        publishedAt,
        author,
        readTime,
        intro,
        sections[]{
          _type == "themeArticle" => {
            title,
            points[]
          }
        },
        closing
      }
    }
  }`;

  return client.fetch(query, { id });
};
