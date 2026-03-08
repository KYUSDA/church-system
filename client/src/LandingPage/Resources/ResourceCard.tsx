import { getFileAsset } from "@sanity/asset-utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Resource } from "../Department/sections/department";
import { client,urlFor } from "@/utils/client";

const ResourceCard = ({
  resource,
  index,
}: {
  resource: Resource;
  index: number;
}) => {
  const hasFile = resource.file?.asset?._ref;
  const hasLink = resource.link && resource.link.trim() !== "";

  let fileUrl = "";

  if (hasFile) {
    const fileAsset = getFileAsset(resource.file, client.config());
    fileUrl = fileAsset.url;
  }

  const targetUrl = hasFile ? fileUrl : resource.link || "#";
  const isExternalLink = hasLink && resource.link!.startsWith("http");

  return (
    <a
      href={targetUrl}
      target={isExternalLink ? "_blank" : "_self"}
      rel={isExternalLink ? "noopener noreferrer" : ""}
      download={hasFile ? true : undefined}
      className="group flex flex-col overflow-hidden
                 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
      style={{ animationDelay: `${index * 80}ms` }}
      aria-label={resource.title}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <LazyLoadImage
          src={urlFor(resource.image).url()}
          alt={resource.title}
          effect="blur"
          className="w-full h-full object-cover hover:transform duration-700 ease-in-out hover:scale-105"
        />

        <div className="py-4">
          <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
            {resource.title}
          </h3>
        </div>
      </div>
    </a>
  );
};

export default ResourceCard;
