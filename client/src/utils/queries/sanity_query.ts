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
      _type == "servicesSection" => {
        title,
        services[]{
          title,
          description,
          icon
        }
      }
    }
  }`;

  return client.fetch(query, { id });
};
