import { Calendar, User, Clock } from "lucide-react";
import { ThemeArticle } from "./department";

interface ThemeProps {
  data: ThemeArticle;
}

function Theme({ data }: ThemeProps) {
  return (
    <article className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Article Meta Information */}
        {(data.publishedAt || data.author || data.readTime) && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            {data.publishedAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Written {data.publishedAt}</span>
              </div>
            )}
            {data.author && (
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>By {data.author}</span>
              </div>
            )}
            {data.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{data.readTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Article Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {data.title}
          {data.highlight && (
            <>
              <br />
              <span className="text-blue-500">{data.highlight}</span>
            </>
          )}
        </h1>

        {/* Introduction */}
        {data.intro && (
          <p className="text-lg text-gray-700 leading-relaxed mb-10 border-l-4 border-blue-500 pl-6">
            {data.intro}
          </p>
        )}

        {/* Article Sections */}
        {data.sections && data.sections.length > 0 && (
          <div className="space-y-8">
            {data.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                {/* Section Title */}
                <h2 className="text-xl font-bold text-blue-500">
                  {section.title}
                </h2>

                {/* Section Points */}
                <ul className="space-y-3">
                  {section.points.map((item, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="text-gray-700 leading-relaxed pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-blue-500 before:font-bold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Closing Statement */}
        {data.closing && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed italic">
              {data.closing}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default Theme;