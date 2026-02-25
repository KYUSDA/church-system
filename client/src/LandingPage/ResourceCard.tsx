import { urlFor } from "../utils/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Download, ExternalLink } from "lucide-react";
import { Resource } from "./Department/sections/department";

const ResourceCard = ({
  resource,
  index,
}: {
  resource: Resource;
  index: number;
}) => {
  // Determine the action type and URL
  const hasFile = resource.file?.asset?.url;
  const hasLink = resource.link && resource.link.trim() !== "";
  const targetUrl = hasFile ? resource.file?.asset.url : resource.link || "#";
  const isExternalLink = hasLink && resource.link!.startsWith("http");

  // Determine CTA text and icon
  const ctaText = hasFile ? "Get Resource" : "View Resource";
  const CtaIcon = hasFile ? Download : ExternalLink;

  return (
    <a
      href={targetUrl}
      target={isExternalLink || hasFile ? "_blank" : "_self"}
      rel={isExternalLink || hasFile ? "noopener noreferrer" : ""}
      download={hasFile ? true : undefined}
      className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden
                 transition-all duration-300 ease-out
                 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-12px_rgba(37,99,235,0.15)] hover:border-blue-200"
      aria-label={`${ctaText}: ${resource.title}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image - Larger, more prominent */}
      <div className="relative w-full h-64 sm:h-72 lg:h-64 overflow-hidden flex-shrink-0">
        <LazyLoadImage
          src={urlFor(resource.image).url()}
          alt={resource.title}
          effect="blur"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Darker gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />

        {/* Tag overlay on image */}
        {resource.tag && (
          <span
            className="absolute top-4 right-4 z-10
                       text-[10px] font-semibold tracking-widest uppercase
                       bg-white/95 backdrop-blur-sm text-slate-800 px-3 py-1.5 rounded-full
                       shadow-lg"
          >
            {resource.tag}
          </span>
        )}
      </div>

      {/* Body - Compact when no description */}
      <div
        className={`flex flex-col px-6 gap-2.5 ${resource.description ? "pt-5 pb-5" : "pt-4 pb-4"}`}
      >
        <h3 className="font-serif text-xl font-normal text-slate-900 leading-snug tracking-tight">
          {resource.title}
        </h3>

        {/* Description - Only show if exists */}
        {resource.description && (
          <p className="text-sm leading-relaxed text-slate-500 line-clamp-2">
            {resource.description}
          </p>
        )}

        {/* CTA Button - More prominent */}
        <div className="mt-auto pt-3">
          <div
            className="flex items-center justify-center gap-2 w-full
                       px-4 py-2.5 rounded-lg
                       bg-blue-50 text-blue-600 
                       border border-blue-100
                       text-sm font-semibold
                       transition-all duration-200
                       group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
          >
            <CtaIcon className="w-4 h-4" />
            <span>{ctaText}</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]
                   bg-gradient-to-r from-blue-600 to-blue-400
                   scale-x-0 origin-left transition-transform duration-300 ease-out
                   group-hover:scale-x-100"
      />
    </a>
  );
};

export default ResourceCard;
